import { Injectable, NotFoundException } from '@nestjs/common';
import { TicketRepository } from '../repository/ticket.repository';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UserRepository } from '../../user/repository/user.repository';
import { Ticket } from '../db/ticket.entity';
import { TicketStatus } from '../enum/status.enum';
import { AssignUserToTicketDto } from '../dto/assign-user-to-ticket.dto';

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
      if (dto.assigned_to !== userId) {
        assignedUser = await this.userRepository.findUserByIdWithTickets(
          dto.assigned_to,
        );
        if (assignedUser === null)
          throw new NotFoundException('Assigned User not found');
        if (!assignedUser.assigned_tickets) assignedUser.assigned_tickets = [];
      } else {
        assignedUser = user;
      }

      assignedUser.assigned_tickets.push(ticket);

      ticket.assigned_to = assignedUser;
      ticket.status = TicketStatus.PROGRESS;

      if (dto.assigned_to !== userId)
        await this.userRepository.saveUser(assignedUser);
    }

    user.created_tickets.push(ticket);

    await this.ticketRepository.saveTicket(ticket);
    await this.userRepository.saveUser(user);
  }

  async asignUserToTicket(dto: AssignUserToTicketDto) {
    const user = await this.userRepository.findUserByIdWithTickets(
      dto.userToAssign,
    );

    if (user === null) throw new NotFoundException('Assigned user not found');
    if (!user.assigned_tickets) user.assigned_tickets = [];
    const ticket = await this.ticketRepository.findTicketById(dto.ticketId);

    if (ticket === null) throw new NotFoundException('Ticket not found ');
    if (ticket.assigned_to) {
      const currentAssignedUser =
        await this.userRepository.findUserByIdWithTickets(
          ticket.assigned_to.id,
        );
      currentAssignedUser.assigned_tickets.filter(
        (ticketToRemove) => ticketToRemove.id != ticket.id,
      );
      await this.userRepository.saveUser(currentAssignedUser);
    }
    if (!ticket.assigned_to) ticket.status = TicketStatus.PROGRESS;

    user.assigned_tickets.push(ticket);
    ticket.assigned_to = user;

    await this.userRepository.saveUser(user);
    await this.ticketRepository.saveTicket(ticket);
  }
}
