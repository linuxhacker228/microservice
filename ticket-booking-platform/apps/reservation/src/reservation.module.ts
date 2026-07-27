// reservation.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Redis from 'ioredis';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import {PrismaModule} from "../prisma/prisma.module";


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule],
  controllers: [ReservationController],
  providers: [
    ReservationService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: 'localhost',
          port: 6379,
        });
      },
    },
  ],
  exports: [ReservationService],
})
export class ReservationModule {}