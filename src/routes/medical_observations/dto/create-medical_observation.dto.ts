import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
export class CreateMedicalObservationDto {
    @IsString()
    @ApiProperty({
      type: String,
    })
    name: string;
    @IsString()
    @ApiProperty({
        type: String,
    })
    specialty: string;
    
    @IsString()
    @ApiProperty({
        type: String,
    })
    diagnosis: string;
    
    doctor?: number;

    @IsNumber()
    @ApiProperty({
        type: Number,
    })
    patient: number;
}
