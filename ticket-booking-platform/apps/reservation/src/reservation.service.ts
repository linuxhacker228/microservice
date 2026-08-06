import { Inject, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from '@prisma/client';
import Redis from "ioredis";
import { error } from 'console';

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

      await this.prismaService.seat.update({
        where: { id: seatId },
        data: {status: 'HELD', userId}
      });

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
        error: 'error',
        message: 'Места нету'
      })
    }
    const lockKey = `lock:seat:${seatId}`;
    await this.redisClient.del(lockKey);
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
