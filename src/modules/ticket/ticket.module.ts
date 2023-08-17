import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './db/ticket.entity';
import { TicketController } from './controller/ticket.controller';
import { TicketService } from './service/ticket.service';
import { TicketRepository } from './repository/ticket.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  providers: [TicketService, TicketRepository],
  exports: [TicketService],
  controllers: [TicketController],
})
export class TicketModule {}
