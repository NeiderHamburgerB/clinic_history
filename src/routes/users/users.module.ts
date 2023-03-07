import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PatientsModule } from '../patients/patients.module';
import { HospitalsModule } from '../hospitals/hospitals.module';
import { TemplatesModule } from 'src/config/templates/templates.module';
import { MailModule } from 'src/config/mail/mail.module';
import { DoctorsModule } from '../doctors/doctors.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    PatientsModule,
    HospitalsModule,
    MailModule,
    TemplatesModule,
    forwardRef(() => DoctorsModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
