import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { LocalGuard } from 'src/config/passport/guards/local.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/config/decorators/user.decorators';
import { IUser } from '../users/interfaces/user.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import moment from 'moment';
import { GeneratePinDTO, RecoveryPassword } from './dto/password.dto';
import { SnsService } from 'src/config/aws/sns/sns.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private snsService: SnsService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('login')
  @ApiOperation({
    summary: 'EP to login',
  })
  login(@User() user: IUser, @Body() data: LoginDto) {
    try {
      return this.authService.login(user);
    } catch (err) {
      return {
        statusCode: 500,
        message: err,
      };
    }
  }

  @Post('/password/generate/secure/pin')
  @ApiOperation({ summary: 'Recover password' })
  async generateSecurePin(
    @Body() recovery: GeneratePinDTO,
  ): Promise<{ expireAt: Date }> {
    let { pin, expireAt } = await this.authService.generateSecurePin(recovery);

    await this.snsService.send(
      `Su pin de recuperación para su cuenta de heippi - historia clinica es: ${pin}`,
      recovery.phone,
    );
    return { expireAt };
  }

  @Post('/recovery/password')
  @ApiOperation({ summary: 'Recover password' })
  async recoveryPassword(
    @Body() recovery: RecoveryPassword,
  ): Promise<any> {
    
    return await this.authService.recoveryPassword(recovery)

  }

}
