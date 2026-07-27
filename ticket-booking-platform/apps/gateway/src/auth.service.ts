import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from '../../catalog/src/dto/user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject('CATALOG_SERVICE') private readonly catalogClient: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    this.logger.log(`Sending create_user message for email: ${dto.email}`);
    const user = await firstValueFrom(this.catalogClient.send('create_user', dto));

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return { accessToken, user };
  }
}
