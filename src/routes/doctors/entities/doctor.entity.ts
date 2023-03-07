import { Hospital } from 'src/routes/hospitals/entities/hospital.entity';
import { User } from 'src/routes/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Doctor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    birthDate: string;

    @ManyToOne(() => User, (user) => user.id)
    user: number;
    
    @Column()
    hospital: number;

    @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP'})
    created_at:Date

}
