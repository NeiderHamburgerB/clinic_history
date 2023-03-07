import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class GeneratePinDTO{
    @IsString()
    @ApiProperty({
      type: String,
    })
    email:string

    @IsString()
    @ApiProperty({
      type: String,
    })
    phone:string
}

export class RecoveryPassword{

    @IsString()
    @ApiProperty({
      type: String,
    })
    pin:string

    @IsString()
    @ApiProperty({
      type: String,
    })
    password:string

}