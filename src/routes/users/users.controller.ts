import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NotAcceptableException } from '@nestjs/common';
import { valid } from './interfaces/user.interface';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  valid(user: valid) {
    const { name, address, roles, birthDate, medicalServices } = user;

    if (roles[0] === 'DOCTOR') {
      throw new UnauthorizedException('No puedes realizar esto 🖕');
    }

    if (
      !name ||
      !address ||
      (roles[0] === 'PATIENT' ? !birthDate : !medicalServices)
    ) {
      throw new NotAcceptableException(
        `The fields name, address, ${
          roles[0] === 'PATIENT' ? 'birthDate' : 'medicalServices'
        } are required`,
      );
    }
    return true;
  }

  @ApiOperation({
    summary: 'EP to create',
  })
  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    const { name, address, roles, birthDate, medicalServices } = createUserDto;

    const valid = this.valid({
      name,
      address,
      roles,
      birthDate,
      medicalServices,
    });

    if (valid) {
      return this.usersService.create(createUserDto);
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Render('blocks/successRegister.pug')
  @Get('verification/:id')
  activeUser(@Param('id') id: string) {
    return this.usersService.activeUser(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
