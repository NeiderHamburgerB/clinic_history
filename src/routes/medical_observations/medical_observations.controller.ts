import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicalObservationsService } from './medical_observations.service';
import { CreateMedicalObservationDto } from './dto/create-medical_observation.dto';
import { UpdateMedicalObservationDto } from './dto/update-medical_observation.dto';
import { IUser } from '../users/interfaces/user.interface';
import { User } from 'src/config/decorators/user.decorators';
import { ResourcesApp } from 'src/config/roles/roles';
import { Auth } from 'src/config/decorators/auth.decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExcelService } from 'src/config/excel/excel.service';
import { readFile, unlink } from 'fs';
import * as moment from 'moment';
import * as AWS from "aws-sdk";
import { DoctorsService } from '../doctors/doctors.service';

@ApiTags('medical-observations')
@Controller('medical-observations')
export class MedicalObservationsController {
  constructor(
    private readonly medicalObservationsService: MedicalObservationsService,
    private excelService:ExcelService,
    private doctorService:DoctorsService
  ) {}

  @Auth({
    action: 'create',
    possession: 'any',
    resource: ResourcesApp.MEDICAL_OBSERVACIONES,
  })
  @Post('create')
  async create(
    @User() user: IUser,
    @Body() createMedicalObservationDto: CreateMedicalObservationDto,
  ) {

    const info = await this.doctorService.findByUserId(user.id)

    createMedicalObservationDto.doctor = info.id;

    return this.medicalObservationsService.create(createMedicalObservationDto);
  }

  @Auth({
    action: 'read',
    possession: 'own',
    resource: ResourcesApp.MEDICAL_OBSERVACIONES,
  })
  @Get('myObservations')
  findRegisterByPatient(@User() user: IUser) {
    if (
      user.roles === 'PATIENT' // 👀 valid with rolebuilder, por ser ejemplo corto lo valido con if
    ) {
      return this.medicalObservationsService.findRegisterByPatient(user.id);
    }
    return {};
  }

  @Auth({
    action: 'read',
    possession: 'own',
    resource: ResourcesApp.MEDICAL_OBSERVACIONES,
  })
  @Get('myObservations/doctor')
  findRegisterByDoctor(@User() user: IUser) {
    if (
      user.roles === 'DOCTOR' ||
      user.roles === 'HOSPITAL' // 👀 valid with rolebuilder, por ser ejemplo corto lo valido con if
    ) {
      return this.medicalObservationsService.findRegisterByDoctor(user.id);
    }
    return {};
  }

  @Get()
  findAll() {
    //return this.medicalObservationsService.findAll();
  }

  @ApiOperation({
    summary: 'EP to get excel history pacient',
  })
  @Get('get/excel/:id')
  async getExcel(@Param('id') id: string) {

    const data = await this.medicalObservationsService.findRegisters(+id)

    const uri = await this.excelService.createDoc(data)

    var CurrentDate = moment().unix();

    const params = {
      Bucket: `${process.env.BUCKET_NAME}`,
      Key: `reportes/${CurrentDate}.xlsx`,
      ACL: "public-read",
      Body: null,
    };
    readFile(uri, async (err, data) => {
      if (err) throw err;
      params.Body = data;
      await new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS,
        secretAccessKey: process.env.AWS_SECRET,
        region: 'us-east-1'
      }).upload(params).promise();
      unlink(uri, (err) => {
        if (err) throw err;
      });
    });

    return {
      message:'archivo generado',
      uri: `${process.env.BUCKET_URI}/${params.Key}`
    }

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalObservationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicalObservationDto: UpdateMedicalObservationDto,
  ) {
    return this.medicalObservationsService.update(
      +id,
      updateMedicalObservationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalObservationsService.remove(+id);
  }
}
