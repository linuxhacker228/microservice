import { NestFactory } from '@nestjs/core';
import { ReservationModule } from './reservation.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ReservationModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3002,
    }
  })
  await app.listen();
}
bootstrap();
