import { Module } from '@nestjs/common';
import { MedicalObservationsService } from './medical_observations.service';
import { MedicalObservationsController } from './medical_observations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalObservation } from './entities/medical_observation.entity';
import { PatientsModule } from '../patients/patients.module';
import { DoctorsModule } from '../doctors/doctors.module';
import { ExcelModule } from 'src/config/excel/excel.module';


@Module({
  imports:[
    TypeOrmModule.forFeature([MedicalObservation]),
    PatientsModule,
    DoctorsModule,
    ExcelModule,
  ],
  controllers: [MedicalObservationsController],
  providers: [MedicalObservationsService],
  exports:[MedicalObservationsService]
})
export class MedicalObservationsModule {}
