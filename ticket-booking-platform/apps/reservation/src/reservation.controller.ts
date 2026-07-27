import { Controller, Logger } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { MessagePattern, RpcException } from "@nestjs/microservices";

@Controller()
export class ReservationController {
  private readonly logger = new Logger(ReservationController.name);

  constructor(private readonly reservationService: ReservationService) {}

  @MessagePattern('hold_seat')
  async holdSeat(data: { seatId: string; userId: string }) {
      this.logger.log(`Received hold_seat message: ${JSON.stringify(data)}`);
      try {
        return await this.reservationService.holdSeat(data.seatId, data.userId);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal server error';
        this.logger.error(`Error in holdSeat: ${message}`, error instanceof Error ? error.stack : undefined);
        if (error instanceof RpcException) {
          throw error;
        }

        throw new RpcException({
          status: 'error',
          message,
        });
      }
    }
}
