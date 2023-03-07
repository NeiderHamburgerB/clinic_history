import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
  })
  type_identification: string;

  @ApiProperty({
    type: String,
  })
  nro_identification: string;

  @IsString()
  @ApiProperty({
    type: String,
  })
  email: string;

  @IsString()
  @ApiProperty({
    type: String,
  })
  password: string;

  @IsString()
  @ApiProperty({
    type: String,
  })
  phone: string;

  @IsArray()
  @ApiProperty({
    type:Array
  })
  roles:string[]

  name?: string;

  address?: string;

  birthDate?: Date;

  medicalServices?: string[];

  hospital?:number;

  active?: boolean;

  logged?: boolean;
}
