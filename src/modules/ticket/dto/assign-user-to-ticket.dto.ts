import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AssignUserToTicketDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userToAssign: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  ticketId: string;
}
