import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Doctor } from "src/routes/doctors/entities/doctor.entity";
import { Hospital } from "src/routes/hospitals/entities/hospital.entity";
import { MedicalObservation } from "src/routes/medical_observations/entities/medical_observation.entity";
import { Patient } from "src/routes/patients/entities/patient.entity";
import { Pin } from "src/routes/pin/entities/pin.entity";
import { User } from "src/routes/users/entities/user.entity";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const DatabaseProvider = [
    TypeOrmModule.forRootAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory: async (config:ConfigService) => ({
            type: 'postgres',
            host: config.get('DB_HOST_DEV'),
            port: parseInt(config.get('DB_PORT_DEV')),
            database: config.get('DB_DEV'),
            username: config.get('DB_USERNAME_DEV'),
            password: config.get('DB_PASSWORD_DEV'),
            entities:[User,Patient,Hospital, Doctor, Pin, MedicalObservation],
            synchronize:true,
            namingStrategy: new SnakeNamingStrategy()
        })
    })
    
]