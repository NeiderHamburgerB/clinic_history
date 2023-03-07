import { PartialType } from '@nestjs/swagger';
import { CreateMedicalObservationDto } from './create-medical_observation.dto';

export class UpdateMedicalObservationDto extends PartialType(CreateMedicalObservationDto) {}
