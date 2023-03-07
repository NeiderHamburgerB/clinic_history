
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pin {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email:string;

  @Column()
  phone:string;

  @Column()
  code:string;

  @Column({default:true})
  active: boolean;

  @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP'})
  created_at:Date

}
