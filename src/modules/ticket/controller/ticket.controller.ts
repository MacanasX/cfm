import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TicketService } from '../service/ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create() {}
}
