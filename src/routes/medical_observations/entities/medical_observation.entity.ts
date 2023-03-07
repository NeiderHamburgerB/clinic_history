import { Doctor } from 'src/routes/doctors/entities/doctor.entity';
import { Patient } from 'src/routes/patients/entities/patient.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MedicalObservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  specialty: string;

  @Column()
  diagnosis: string;

  @ManyToOne(() => Doctor, doctor => doctor.id)
  doctor: number;

  @ManyToOne(() => Patient, patient => patient.id)
  patient: number;

}
