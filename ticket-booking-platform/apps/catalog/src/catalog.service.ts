import {Inject, Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from "../prisma/prisma.service";
import { EventDto } from "./dto/event.dto";
import { CreateSeatDto } from "./dto/seat.dto";
import { CreateUserDto } from "./dto/user.dto";
import { RpcException } from '@nestjs/microservices';
import Redis from "ioredis";

@Injectable()
export class CatalogService {
  constructor(private readonly prismaService: PrismaService,
              @Inject('REDIS_CLIENT') private redisClient: Redis) {}
  getAllEvents() {
    return this.prismaService.event.findMany();
  }

  async createEvent(dto: EventDto) {
    if (!dto.date) {
      throw new RpcException('date is required');
    }

    let dateValue: Date;
    if (dto.date instanceof Date) {
      dateValue = dto.date;
    } else {
      dateValue = new Date(dto.date as string);
      if (isNaN(dateValue.getTime())) {
        throw new RpcException('Invalid date format: expected ISO-8601 DateTime');
      }
    }

    return this.prismaService.event.create({
      data: {
        name: dto.title,
        description: dto.description,
        date: dateValue,
        venueName: dto.venueName,
      }
    });
  }

  async createSeat(dto: CreateSeatDto) {
    if (!dto.eventId) {
      throw new RpcException('eventId is required');
    }
    if (!dto.seatNumber) {
      throw new RpcException('seatNumber is required');
    }

    const event = await this.prismaService.event.findUnique({ where: { id: dto.eventId } });
    if (!event) {
      throw new RpcException(`Event with id ${dto.eventId} not found`);
    }
    await this.redisClient.del(`event:${dto.eventId}:seats`);
    return this.prismaService.seat.create({
      data: {
        eventId: dto.eventId,
        seatNumber: dto.seatNumber,
        price: dto.price,
      }
    });
  }

  async getSeatsByEvent(eventId: string) {
    const cacheKey = `event:${eventId}:seats`;
    const cachedSeats = await this.redisClient.get(cacheKey);
    if (cachedSeats) {
      return JSON.parse(cachedSeats);
    }

    const seats = await this.prismaService.seat.findMany({
      where: { eventId },
    });
    await this.redisClient.setex(cacheKey, 60, JSON.stringify(seats));
    return seats;
  }

  getSeatsByUser(userId: string) {
    return this.prismaService.seat.findMany({
      where: { userId },
      include: { event: { select: { id: true, name: true, date: true, venueName: true } } },
    });
  }

  async createUser(dto: CreateUserDto) {
    if (!dto.name) {
      throw new RpcException('name is required');
    }
    if (!dto.email) {
      throw new RpcException('email is required');
    }
    if (!dto.password) {
      throw new RpcException('password is required');
    }

    const existing = await this.prismaService.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new RpcException(`User with email ${dto.email} already exists`);
    }

    const user = await this.prismaService.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: await bcrypt.hash(dto.password, 10),
      }
    });

    const { password, ...safeUser } = user;
    return safeUser;
  }
}
