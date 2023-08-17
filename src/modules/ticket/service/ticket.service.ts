import { Injectable } from '@nestjs/common';
import { TicketRepository } from '../repository/ticket.repository';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { Ticket } from '../db/ticket.entity';
import { UserRepository } from '../../user/repository/user.repository';

@Injectable()
export class TicketService {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createTicket(dto: CreateTicketDto, userId: string) {
    const ticket: Ticket = this.ticketRepository.create();
  }
}
