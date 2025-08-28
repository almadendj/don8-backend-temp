import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDriveDto {
  @IsString() @IsNotEmpty() title: string;
  @IsString() @IsOptional() description?: string;
  @IsNumber() targetAmount: string;
  @IsDateString() startDate: string;
  @IsDateString() endDate: string;
}
