import {
  IsString,
  IsUUID,
  IsNumber,
  Min,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateDonationDto {
  @IsUUID() driveId: string;
  @IsNumber() @Min(0.0001) amount: number;
  @IsBoolean() anonymous: boolean;
  @IsOptional() @IsString() nickname?: string;
}
