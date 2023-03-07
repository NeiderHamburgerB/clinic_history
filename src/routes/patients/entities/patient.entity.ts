import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/routes/users/entities/user.entity';

@Entity()
export class Patient {
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
  
  @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP'})
  created_at:Date

}
