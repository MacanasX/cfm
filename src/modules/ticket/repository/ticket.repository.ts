import { DataSource, Repository } from 'typeorm';
import { Ticket } from '../db/ticket.entity';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TicketRepository extends Repository<Ticket> {
  private readonly logger = new Logger(TicketRepository.name);

  constructor(dataSource: DataSource) {
    super(Ticket, dataSource.createEntityManager());
  }
}
