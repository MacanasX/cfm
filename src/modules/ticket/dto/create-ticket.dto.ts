import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  due_Date?: Date;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  created_by: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  assigned_to: string;
}
