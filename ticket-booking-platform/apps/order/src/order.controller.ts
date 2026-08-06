import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern('process_checkout')
  processCheckout(dto: {
    userId: string;
    seatId: string;
    amount: number;
    paymentToken: string;
  }) {
    return this.orderService.proccessChecout(dto);
  }
}
