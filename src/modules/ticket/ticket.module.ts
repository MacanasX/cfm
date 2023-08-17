import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './db/ticket.entity';
import { TicketController } from './controller/ticket.controller';
import { TicketService } from './service/ticket.service';
import { TicketRepository } from './repository/ticket.repository';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), UserModule],
  providers: [TicketService, TicketRepository, UserRepository],
  exports: [TicketService],
  controllers: [TicketController],
})
export class TicketModule {}
