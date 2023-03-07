import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from './config/env/env.module';
import { UsersModule } from './routes/users/users.module';
import { HospitalsModule } from './routes/hospitals/hospitals.module';
import { PatientsModule } from './routes/patients/patients.module';
import { DoctorsModule } from './routes/doctors/doctors.module';
import { MedicalObservationsModule } from './routes/medical_observations/medical_observations.module';
import { DatabaseModule } from './config/database/database.module';
import { MailModule } from './config/mail/mail.module';
import { TemplatesModule } from './config/templates/templates.module';
import { AuthModule } from './routes/auth/auth.module';
import { RolesModule } from './config/roles/roles.module';
import { PinModule } from './routes/pin/pin.module';

@Module({
  imports: [
    EnvModule,
    TemplatesModule,
    DatabaseModule,
    MailModule,
    RolesModule,
    AuthModule,
    UsersModule,
    HospitalsModule,
    PatientsModule,
    DoctorsModule,
    MedicalObservationsModule,
    PinModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
