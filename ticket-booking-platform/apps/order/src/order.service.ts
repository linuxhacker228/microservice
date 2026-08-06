import { InjectQueue } from '@nestjs/bullmq';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PrismaService } from 'apps/catalog/prisma/prisma.service';
import { Queue } from 'bullmq';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(private prismaService: PrismaService,
    @Inject('RESERVATION_SERVICE') private readonly reservationClient: ClientProxy,
    @Inject('CATALOG_SERVICE') private readonly catalogClient: ClientProxy,
    @InjectQueue('ticket-delivery') private deliveryQueue: Queue) {}

    async proccessChecout(dto: {
      userId: string,
      seatId: string,
      amount: number,
      paymentToken: string,
    }) {
      const order = await this.prismaService.order.create({
        data: {
          userId: dto.userId,
          seatId: dto.seatId,
          amount: dto.amount,
        }
      });
      try {
        await firstValueFrom(this.reservationClient.send('validate_hold', {
          userId: dto.userId,
          seatId: dto.seatId
        }));

        if(dto.paymentToken === 'INVALID_CARD') {
          throw new Error('Недостаточно средств');
        }

        await this.prismaService.order.update({
          where: {
            id: order.id,
          },
          data: {
            status: "PAID"
          }
        });

        await this.deliveryQueue.add('generate-ticket', {
          orderId: order.id,
          userId: dto.userId,
          seatId: dto.seatId,
          userEmail: "linuxhacker@gmail.com"
        })

        return {
          success: true,
          orderId: order.id,
          message: 'Оплата пройшла билет отправлен на генерацию',
        }
      } catch (error) {
        this.logger.error(
          `Checkout failed for order ${order.id} (seat ${dto.seatId}, user ${dto.userId}): ${error instanceof Error ? error.message : JSON.stringify(error)}`,
          error instanceof Error ? error.stack : undefined,
        );

        await this.prismaService.order.update({
           where: {
            id: order.id,
          },
          data: {
            status: "CANCELLED"
          }
        });

        await firstValueFrom(this.reservationClient.send('release_hold', dto.seatId))

        throw new RpcException({
          status: 'error',
          message: 'Order error',
        });
      }
    }

}
