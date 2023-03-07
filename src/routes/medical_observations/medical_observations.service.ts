import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorsService } from '../doctors/doctors.service';
import { PatientsService } from '../patients/patients.service';
import { CreateMedicalObservationDto } from './dto/create-medical_observation.dto';
import { UpdateMedicalObservationDto } from './dto/update-medical_observation.dto';
import { MedicalObservation } from './entities/medical_observation.entity';
import { InjectS3, S3 } from 'nestjs-s3';

@Injectable()
export class MedicalObservationsService {

  private readonly s3: S3;
  constructor(
    @InjectRepository(MedicalObservation)
    private medicalRepository: Repository<MedicalObservation>,
    private patientService: PatientsService,
    private doctorService: DoctorsService,
  ) {
  }

  async create(createMedicalObservationDto: CreateMedicalObservationDto) {
    const newMedicalObservation = this.medicalRepository.create(
      createMedicalObservationDto,
    );

    return await this.medicalRepository.save(newMedicalObservation);
  }

  async findRegisterByPatient(id: number) {
    const patientInfo = await this.patientService.findByUserId(id);

    const observations = await this.medicalRepository
    .createQueryBuilder('medical_observation')
    .leftJoinAndSelect('medical_observation.doctor', 'doctor')
    .leftJoinAndSelect('medical_observation.patient', 'patient')
    .select([
      'medical_observation.id',
      'medical_observation.name',
      'medical_observation.specialty',
      'medical_observation.diagnosis',
      'doctor.name',
      'patient.name',
    ])
    .where('medical_observation.patient = :id', { id: patientInfo.id })
    .getMany();

    return observations;
  }

  async findRegisterByDoctor(id: number) {
    const doctorInfo = await this.doctorService.findByUserId(id);

    const observations = await this.medicalRepository
    .createQueryBuilder('medical_observation')
    .leftJoinAndSelect('medical_observation.doctor', 'doctor')
    .leftJoinAndSelect('medical_observation.patient', 'patient')
    .select([
      'medical_observation.id',
      'medical_observation.name',
      'medical_observation.specialty',
      'medical_observation.diagnosis',
      'doctor.name',
      'patient.name',
    ])
    .where('medical_observation.doctor = :id', { id: doctorInfo.id })
    .getMany();

    return observations;
  }

  async findRegisters(id:number){
    const observations = await this.medicalRepository
    .createQueryBuilder('medical_observation')
    .leftJoinAndSelect('medical_observation.doctor', 'doctor')
    .leftJoinAndSelect('medical_observation.patient', 'patient')
    .select([
      'medical_observation.id',
      'medical_observation.name',
      'medical_observation.specialty',
      'medical_observation.diagnosis',
      'doctor.name',
      'patient.name',
    ])
    .where('medical_observation.patient = :id', { id })
    .getMany();

    return observations;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicalObservation`;
  }

  update(id: number, updateMedicalObservationDto: UpdateMedicalObservationDto) {
    return `This action updates a #${id} medicalObservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicalObservation`;
  }
}
