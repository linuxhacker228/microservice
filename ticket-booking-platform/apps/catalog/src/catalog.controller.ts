import { Controller, Logger } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {EventDto} from "./dto/event.dto";
import {CreateSeatDto} from "./dto/seat.dto";
import {CreateUserDto} from "./dto/user.dto";

@Controller()
export class CatalogController {
  private readonly logger = new Logger(CatalogController.name);

  constructor(private readonly catalogService: CatalogService) {}

  @MessagePattern('get_events')
  getEvents() {
    this.logger.log('Received get_events message');
    return this.catalogService.getAllEvents();
  }


  @MessagePattern('create_event')
  createEvent(@Payload() dto: EventDto) {
    this.logger.log(`Received create_event message: ${JSON.stringify(dto)}`);
    return this.catalogService.createEvent(dto);
  }

  @MessagePattern('create_seat')
  createSeat(@Payload() dto: CreateSeatDto) {
    this.logger.log(`Received create_seat message: ${JSON.stringify(dto)}`);
    return this.catalogService.createSeat(dto);
  }

  @MessagePattern('get_seats')
  getSeats(@Payload() eventId: string) {
    this.logger.log(`Received get_seats message for eventId: ${eventId}`);
    return this.catalogService.getSeatsByEvent(eventId);
  }

  @MessagePattern('create_user')
  createUser(@Payload() dto: CreateUserDto) {
    this.logger.log(`Received create_user message for email: ${dto.email}`);
    return this.catalogService.createUser(dto);
  }

  @MessagePattern('get_seats_by_user')
  getSeatsByUser(@Payload() userId: string) {
    this.logger.log(`Received get_seats_by_user message for userId: ${userId}`);
    return this.catalogService.getSeatsByUser(userId);
  }
}
