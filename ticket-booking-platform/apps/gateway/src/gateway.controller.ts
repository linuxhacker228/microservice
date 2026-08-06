import {Body, Controller, Get, Inject, Logger, Param, Post} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import {EventDto} from "../../catalog/src/dto/event.dto";
import {CreateSeatDto} from "../../catalog/src/dto/seat.dto";
import { ClientProxy } from '@nestjs/microservices';


@Controller('events')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService,
    @Inject('ORDER_SERVICE') private orderClient: ClientProxy
  ) {}

    @Get()
    getAllEvents() {
        return this.gatewayService.getAllEvents();
    }

    @Post()
    createEvent(@Body() dto: EventDto) {
        return this.gatewayService.createEvent(dto);
    }

    @Post('/reservations/hold/:seatId/:userId')
    holdSeat(
        @Param('seatId') seatId: string,
        @Param('userId') userId: string,
    ) {
        return this.gatewayService.holdSeat(seatId, userId);
    }

    @Post('/:eventId/seats')
    createSeat(
        @Param('eventId') eventId: string,
        @Body() dto: Omit<CreateSeatDto, 'eventId'>,
    ) {
        return this.gatewayService.createSeat({ ...dto, eventId });
    }

    @Get('/:eventId/seats')
    getSeatsByEvent(@Param('eventId') eventId: string) {
        return this.gatewayService.getSeatsByEvent(eventId);
    }

    @Post('/orders/checkout')
    createOrder(@Body() body: {
        userId: string,
        amount: number,
        paymentToken: string,
        seatId: string
    }) {
        return this.orderClient.send('process_checkout', body)
    }
}
