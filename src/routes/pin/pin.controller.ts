import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PinService } from './pin.service';
import { CreatePinDto } from './dto/create-pin.dto';
import { UpdatePinDto } from './dto/update-pin.dto';

@Controller('pin')
export class PinController {
  constructor(private readonly pinService: PinService) {}

  @Post()
  create(@Body() createPinDto: CreatePinDto) {
    return this.pinService.create(createPinDto);
  }

  @Get()
  findAll() {
    return this.pinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pinService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePinDto: UpdatePinDto) {
    return this.pinService.update(+id, updatePinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pinService.remove(+id);
  }
}
