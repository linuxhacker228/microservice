import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { GatewayController } from './gateway.controller';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { GatewayService } from './gateway.service';
import { AuthService } from './auth.service';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    ClientsModule.register([
    {
      name: 'CATALOG_SERVICE',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      }
    },
    {
      name: 'RESERVATION_SERVICE',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3002,
      }
    },
    {
      name: 'ORDER_SERVICE',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3003,
      }
    }
  ])],
  controllers: [GatewayController, AuthController, UserController],
  providers: [GatewayService, AuthService],
})
export class GatewayModule {}
