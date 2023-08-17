import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { TicketService } from '../service/ticket.service';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { MiddlewareResponse } from '../../auth/middleware/auth.interface';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateTicketDto,
    @Res({ passthrough: true }) res: MiddlewareResponse,
  ) {
    return await this.ticketService.createTicket(
      dto,
      res.locals.payload.userId,
    );
  }
}
