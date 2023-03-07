import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { IUser } from '../users/interfaces/user.interface';
import { compareSync } from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { GeneratePinDTO, RecoveryPassword } from './dto/password.dto';
import * as moment from 'moment';
import { generate } from 'randomstring';
import { PinService } from '../pin/pin.service';
import { hashSync, genSaltSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private pinService: PinService,
  ) {}

  async validate(email: string, pass: string) {
    const user = await this.userService.findOne({ email });
    if (!user) throw new NotFoundException('User not found');

    if (!compareSync(pass, user.password))
      throw new NotAcceptableException('User or password incorrect');

    let { password, ...rest } = user;

    return rest;
  }

  generateSecurePin = async (
    recovery: GeneratePinDTO,
  ): Promise<{ pin: string; expireAt: Date }> => {
    let user = await this.userService.findOne({ ...recovery });

    if (user) {
      let expireAt: Date = moment().add(1, 'hour').toDate();
      let pin: string = generate({ length: 12, charset: 'numeric' });
      await this.pinService.create({
        email: user.email,
        phone: recovery.phone,
        code: pin,
      });
      return { pin, expireAt };
    }
  };

  recoveryPassword = async (recovery: RecoveryPassword) => {
    const pin = await this.pinService.findOne(recovery.pin);

    if (pin) {
      const user = await this.userService.findOne({ email: pin.email });

      this.userService.recoveryPassword(user.id, {
        password: hashSync(recovery.password, genSaltSync(8)),
      });

      this.pinService.update(pin.id, { active: false });

      return {
        message: 'contraseña cambiada',
      };
    } else {
      return {
        message: 'pin no valido',
      };
    }
  };

  async login(user: IUser) {
    const { id, active, roles, logged } = user;

    if (active) {
      const payload = { sub: id };

      if (roles === 'DOCTOR' && logged === false) {
        this.userService.update(id, { password: '___' });
      }

      this.userService.update(id, { logged: true });

      return {
        message:
          logged === false && roles === 'DOCTOR'
            ? 'Debes cambiar la contraseña de lo contrario no podras volver a ingresar'
            : 'success',
        user,
        accessToken: this.jwtService.sign(payload),
      };
    } else {
      return 'user not active';
    }
  }
}
