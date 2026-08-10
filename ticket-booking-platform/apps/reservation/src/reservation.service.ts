import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from "../prisma/prisma.service";
import Redis from "ioredis";

@Injectable()
export class ReservationService {
  constructor(private prismaService: PrismaService,
              @Inject('REDIS_CLIENT') private redisClient: Redis) {}

  async holdSeat(seatId: string, userId: string) {

    try {
      const lockKey = `lock:seat:${seatId}`;
      const acquired = await this.redisClient.set(lockKey, userId, 'EX', 600, 'NX');

      if (!acquired) {
        return {
          success: false,
          message: 'Seat already reserved',
        }
      }

      const updatedSeat = await this.prismaService.seat.update({
        where: { id: seatId },
        data: {status: 'HELD', userId}
      });
      await this.redisClient.del(`event:${updatedSeat.eventId}:seats`);
      return {
        success: true,
        message: 'Seat reserved successfully',
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      throw new RpcException({
        status: 'error',
        message,
      });
    }
  }

  async validateHold(userId: string, seatId: string) {
    const lockKey = `lock:seat:${seatId}`;
    const seat = await this.redisClient.get(lockKey);
    if(!seat) {
      throw new RpcException({
        status: 'error',
        message: 'Seat is not held (hold missing or expired) — call /reservations/hold before checkout',
      })
    }

    if(!(seat === userId)) {
      throw new RpcException({
        status: 'error',
        message: 'Место занято'
      })
    }
    return true;
  }

  async releaseHold(seatId: string) {
    const seat = await this.prismaService.seat.findUnique({
      where: {
        id: seatId
      }
    });
    if(!seat) {
      throw new RpcException({
        status: 'error',
        message: 'Места нету'
      })
    }
    const lockKey = `lock:seat:${seatId}`;
    await this.redisClient.del(lockKey);
    await this.redisClient.del(`event:${seat.eventId}:seats`);
    return this.prismaService.seat.update({
      where: {
        id: seatId
      },
      data: {
        status: "FREE",
        userId: null,
      }
    })
  }
}
