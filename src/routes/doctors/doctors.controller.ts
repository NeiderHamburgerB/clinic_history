import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotAcceptableException,
} from '@nestjs/common';
import { ResourcesApp } from 'src/config/roles/roles';
import { Auth } from 'src/config/decorators/auth.decorators';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { IUser, valid } from '../users/interfaces/user.interface';
import { User } from 'src/config/decorators/user.decorators';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';

@ApiTags('Doctor')
@Controller('doctors')
export class DoctorsController {
  constructor(
    private readonly doctorsService: DoctorsService,
    private userService: UsersService,
  ) {}

  valid(user: valid) {
    const { name, address, birthDate } = user;
    if (!name || !address || !birthDate) {
      throw new NotAcceptableException(
        `The fields name, address, birthDate are required`,
      );
    }
    return true;
  }

  @Auth({
    action: 'create',
    possession: 'any',
    resource: ResourcesApp.DOCTOR,
  })
  @Post('create')
  create(@User() user: IUser, @Body() createDoctorDto: CreateUserDto) {
    let { name, address, roles, birthDate } = createDoctorDto;

    roles.splice(0, roles.length);

    roles.push('DOCTOR');

    createDoctorDto.hospital = user.id;

    const valid = this.valid({
      name,
      address,
      roles,
      birthDate,
    });

    if (valid) {
      return this.userService.create(createDoctorDto);
    }
  }

  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(+id);
  }
}
