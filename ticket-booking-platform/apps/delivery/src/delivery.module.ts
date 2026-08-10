import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { DeliveryProcess } from './delivery.processor';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      }
    }),
    BullModule.registerQueue({
      name: 'ticket-delivery'
    })
  ],
  providers: [DeliveryProcess],
})
export class DeliveryModule {}
