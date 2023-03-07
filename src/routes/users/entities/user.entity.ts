import { RolesApp } from 'src/config/roles/roles';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type_identification:string;

  @Column({ unique: true })
  nro_identification:string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  phone: string;

  @Column({type:'enum',enum:RolesApp})
  roles: string[];

  @Column({default:false})
  active: boolean;

  @Column({default:false})
  logged:boolean;

  @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP'})
  created_at:Date

}
