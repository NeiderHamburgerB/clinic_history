import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePinDto } from './dto/create-pin.dto';
import { UpdatePinDto } from './dto/update-pin.dto';
import { Pin } from './entities/pin.entity';

@Injectable()
export class PinService {

  constructor(
    @InjectRepository(Pin)
    private pinRepository: Repository<Pin>,
  ) {}


  async create(createPinDto: CreatePinDto) {
    
    const newPin = this.pinRepository.create(createPinDto);

    return await this.pinRepository.save(newPin)
  }

  findAll() {
    return `This action returns all pin`;
  }

  findOne(code:string) {
    return this.pinRepository.findOne({where:{ code, active:true }})
  }

  update(id: number, updatePinDto: UpdatePinDto) {
    return this.pinRepository.update(id, updatePinDto);
  }

  remove(id: number) {
    return `This action removes a #${id} pin`;
  }
}
