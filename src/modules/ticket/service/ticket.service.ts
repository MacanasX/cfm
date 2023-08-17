import { Injectable } from '@nestjs/common';
import { TicketRepository } from '../repository/ticket.repository';

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepository: TicketRepository) {}
}
