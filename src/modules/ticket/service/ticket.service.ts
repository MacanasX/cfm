import { Injectable, NotFoundException } from '@nestjs/common';
import { TicketRepository } from '../repository/ticket.repository';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UserRepository } from '../../user/repository/user.repository';
import { Ticket } from '../db/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createTicket(dto: CreateTicketDto, userId: string) {
    let assignedUser;
    const user = await this.userRepository.findUserByIdWithTickets(userId);
    if (!user.created_tickets) user.created_tickets = [];
    const ticket: Ticket = this.ticketRepository.create();
    ticket.title = dto.title;
    ticket.created_by = user;
    if (dto.due_Date) ticket.due_Date = dto.due_Date;
    if (dto.description) ticket.description = dto.description;
    if (dto.assigned_to) {
      assignedUser = await this.userRepository.findUserByIdWithTickets(
        dto.assigned_to,
      );

      if (assignedUser === null)
        throw new NotFoundException('Assigned User not found');
      if (!assignedUser.assigned_tickets) assignedUser.assigned_tickets = [];
      assignedUser.assigned_tickets.push(ticket);
      ticket.assigned_to = assignedUser;
    }

    user.created_tickets.push(ticket);
    await this.ticketRepository.saveTicket(ticket);
    await this.userRepository.saveUser(user);
    await this.userRepository.saveUser(assignedUser);
  }
}
