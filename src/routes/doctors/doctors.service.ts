import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorsService {
  
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}
  
  async create(createDoctorDto: CreateDoctorDto) {
    const newDoctor = this.doctorRepository.create(createDoctorDto);

    return await this.doctorRepository.save(newDoctor);
  }

  findByUserId(id:number){
    return this.doctorRepository.findOne({where:{user:id}})
  }

  findAll() {
    return `This action returns all doctors`;
  }

  findOne(id: number) {
    return this.doctorRepository.findOne({where:{id}})
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
