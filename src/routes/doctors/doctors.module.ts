import { forwardRef, Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Doctor]),
    forwardRef(() => UsersModule)
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports:[DoctorsService]
})
export class DoctorsModule {}
