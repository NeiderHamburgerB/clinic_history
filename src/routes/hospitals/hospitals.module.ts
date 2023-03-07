import { Module } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { HospitalsController } from './hospitals.controller';
import { Hospital } from './entities/hospital.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([Hospital])
  ],
  controllers: [HospitalsController],
  providers: [HospitalsService],
  exports:[HospitalsService]
})
export class HospitalsModule {}
