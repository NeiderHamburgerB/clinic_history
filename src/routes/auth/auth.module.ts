import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalService } from 'src/config/passport/services/local.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from 'src/config/passport/passport.module';
import { JwtService } from 'src/config/passport/services/jwt.service';
import { SnsModule } from 'src/config/aws/sns/sns.module';
import { PinModule } from '../pin/pin.module';

@Module({
  imports: [UsersModule, PassportModule, SnsModule, PinModule],
  controllers: [AuthController],
  providers: [AuthService, LocalService, JwtService],
})
export class AuthModule {}
