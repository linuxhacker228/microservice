import { Inject, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from '@prisma/client';
import Redis from "ioredis";

@Injectable()
export class ReservationService {
  private readonly logger = new Logger(ReservationService.name);

  constructor(private prismaService: PrismaService,
              @Inject('REDIS_CLIENT') private redisClient: Redis) {}

  async holdSeat(seatId: string, userId: string) {
    this.logger.log(`holdSeat called with seatId: ${seatId}, userId: ${userId}`);

    try {
      const lockKey = `lock:seat:${seatId}`;
      this.logger.log(`Setting lock key: ${lockKey}`);

      const acquired = await this.redisClient.set(lockKey, userId, 'EX', 600, 'NX');

      this.logger.log(`Lock acquired result: ${acquired}`);

      if (!acquired) {
        this.logger.warn(`Seat ${seatId} already reserved`);
        return {
          success: false,
          message: 'Seat already reserved',
        }
      }

      try {
        await this.prismaService.seat.update({
          where: { id: seatId },
          data: {status: 'HELD', userId}
        });
      } catch (error) {
        await this.redisClient.del(lockKey);

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
          this.logger.warn(`Seat ${seatId} not found`);
          return {
            success: false,
            message: 'Seat not found',
          }
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
          this.logger.warn(`User ${userId} not found`);
          return {
            success: false,
            message: 'User not found',
          }
        }

        throw error;
      }

      this.logger.log(`Seat ${seatId} reserved successfully`);

      return {
        success: true,
        message: 'Seat reserved successfully',
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      this.logger.error(`Error in holdSeat: ${message}`, error instanceof Error ? error.stack : undefined);
      throw new RpcException({
        status: 'error',
        message,
      });
    }
  }
}
