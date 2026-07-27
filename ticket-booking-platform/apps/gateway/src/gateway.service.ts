import {Inject, Injectable, Logger} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {EventDto} from "../../catalog/src/dto/event.dto";
import {CreateSeatDto} from "../../catalog/src/dto/seat.dto";

@Injectable()
export class GatewayService {
  private readonly logger = new Logger(GatewayService.name);

  constructor(
    @Inject('CATALOG_SERVICE') private readonly catalogClient: ClientProxy,
    @Inject('RESERVATION_SERVICE') private readonly reservationClient: ClientProxy
  ) {}

  getAllEvents() {
    this.logger.log('Sending get_events message to catalog service');
    return this.catalogClient.send('get_events', {});
  }

  createEvent(dto: EventDto) {
    this.logger.log(`Sending create_event message: ${JSON.stringify(dto)}`);
    return this.catalogClient.send('create_event', dto);
  }

  holdSeat(seatId: string, userId: string) {
    const payload = { seatId, userId };
    this.logger.log(`Sending hold_seat message to reservation service: ${JSON.stringify(payload)}`);
    return this.reservationClient.send('hold_seat', payload);
  }

  createSeat(dto: CreateSeatDto) {
    this.logger.log(`Sending create_seat message: ${JSON.stringify(dto)}`);
    return this.catalogClient.send('create_seat', dto);
  }

  getSeatsByEvent(eventId: string) {
    this.logger.log(`Sending get_seats message for eventId: ${eventId}`);
    return this.catalogClient.send('get_seats', eventId);
  }

  getSeatsByUser(userId: string) {
    this.logger.log(`Sending get_seats_by_user message for userId: ${userId}`);
    return this.catalogClient.send('get_seats_by_user', userId);
  }
}
