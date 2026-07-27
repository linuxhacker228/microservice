import { Controller, Get, Logger, Param } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller('users')
export class UserController {
    private readonly logger = new Logger(UserController.name);

    constructor(private readonly gatewayService: GatewayService) {}

    @Get('/:userId/seats')
    getSeatsByUser(@Param('userId') userId: string) {
        this.logger.log(`GET /users/${userId}/seats request received`);
        return this.gatewayService.getSeatsByUser(userId);
    }
}
