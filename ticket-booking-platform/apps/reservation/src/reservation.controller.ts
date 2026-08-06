import { Controller, Logger } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { MessagePattern, RpcException } from "@nestjs/microservices";

@Controller()
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @MessagePattern('hold_seat')
  async holdSeat(data: { seatId: string; userId: string }) {
      try {
        return this.reservationService.holdSeat(data.seatId, data.userId);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal server error';
        if (error instanceof RpcException) {
          throw error;
        }

        throw new RpcException({
          status: 'error',
          message,
        });
      }
    }
  @MessagePattern('validate_hold')
  async validateHold(data: {seatId: string; userId: string}) {
    try {
      return this.reservationService.validateHold(data.userId, data.seatId)
    } catch (error) {
      throw new RpcException({
        status: 'error',
        message: error,
      })
    }
  }

  @MessagePattern('release_hold')
  async releaseHold(seatId: string) {
    try {
      return this.reservationService.releaseHold(seatId);
    } catch (error) {
      throw new RpcException({
        status: 'error',
        message: error,
      })
    }
  }

}
