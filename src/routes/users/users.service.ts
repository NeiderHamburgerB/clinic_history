import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HospitalsService } from '../hospitals/hospitals.service';
import { PatientsService } from '../patients/patients.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hashSync, genSaltSync } from 'bcryptjs';
import { TemplatesService } from 'src/config/templates/templates.service';
import { MailService } from 'src/config/mail/mail.service';
import { IUserSearch } from './interfaces/user.interface';
import { DoctorsService } from '../doctors/doctors.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private patientService: PatientsService,
    private hospitalService: HospitalsService,
    private doctorService: DoctorsService,
    private TemplatesService: TemplatesService,
    private mailService: MailService,
  ) {}

  hash = (password: string) => {
    return hashSync(password, genSaltSync(8));
  };

  async create(createUserDto: CreateUserDto): Promise<any> {
    let {
      name,
      address,
      birthDate,
      roles,
      medicalServices,
      type_identification,
      nro_identification,
      email,
      password,
      phone,
      hospital,
    } = createUserDto;

    let obj: object;

    let service: any;

    try {
      password = this.hash(password);

      const newUser = this.userRepository.create({
        type_identification,
        nro_identification,
        email,
        password,
        phone,
        roles,
      });

      const user = await this.userRepository.save(newUser)

      if (roles[0] === 'PATIENT') {

        obj = Object.assign(
          {}, 
          { name, address, birthDate, user: user.id });
        service = this.patientService;

      } else if (roles[0] === 'HOSPITAL') {

        obj = Object.assign(
          {},
          { name, address, medicalServices, user: user.id },
        );
        service = this.hospitalService;

      } else if (roles[0] === 'DOCTOR') {
        
        obj = Object.assign(
          {},
          { name, address, birthDate, user: user.id, hospital },
        );
        service = this.doctorService;

      }

      service.create(obj);

      let template = this.TemplatesService.welcome({
        title: 'Bienvenida (o) a Heippi - Historia Clinica',
        welcome: 'Bienvenida (o):',
        text_1: 'Tus credenciales de acceso a la aplicación son:',
        email_label: 'Correo electronico:',
        email,
        text_2:
          'Recuerda administrar responsablemente tus credenciales para evitar actividades indeseadas en tu cuenta.',
        title_help: '¿Necesitas ayuda?',
        text_help: 'Por favor, escribenos a:',
        email_help: 'support@heippi.com',
        href: `http://localhost:3000/users/verification/${user.id}`,
      });
      await this.mailService
        .sendEmail(
          [email],
          'Bienvenida (o) a heippi - Historia Clinica',
          template,
        )
        .catch((e) => console.log('err', e));

      return {
        statusCode: 200,
        message:
          'Se te ha enviado un mensaje al correo proporcionado, revisalo para activar la cuenta, de lo contrario no podras ingresar a la plataforma.',
      };
    } catch (err) {
      return err.detail;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

 


  findOne(data: IUserSearch) {
    try {
      return this.userRepository.findOne({ where: data });
    } catch (err) {
      return err;
    }
  }

  activeUser(id: number) {
    try {
      return this.userRepository.update(id, { active: true });
    } catch (err) {
      return err;
    }
  }

  recoveryPassword(email:string,updateUserDto: UpdateUserDto){
    return this.userRepository.update(email, updateUserDto);
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
