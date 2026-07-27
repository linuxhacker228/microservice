import {Body, Controller, Get, Logger, Param, Post} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import {EventDto} from "../../catalog/src/dto/event.dto";
import {CreateSeatDto} from "../../catalog/src/dto/seat.dto";


@Controller('events')
export class GatewayController {
  private readonly logger = new Logger(GatewayController.name);

  constructor(private readonly gatewayService: GatewayService) {}

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
}
