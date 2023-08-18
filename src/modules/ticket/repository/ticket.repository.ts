import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { Ticket } from '../db/ticket.entity';
import {
  ConflictException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { User } from '../../user/db/user.entity';

@Injectable()
export class TicketRepository extends Repository<Ticket> {
  private readonly logger = new Logger(TicketRepository.name);

  constructor(dataSource: DataSource) {
    super(Ticket, dataSource.createEntityManager());
  }

  async saveTicket(ticket: Ticket): Promise<Ticket> {
    try {
      return await this.save(ticket);
    } catch (err) {
      this.logger.error(`Error saving ticket: ${err}`);
      throw new ServiceUnavailableException();
    }
  }

  async findTicketById(id: string): Promise<Ticket> {
    try {
      return await this.findOne({
        where: { id },
        relations: ['assigned_to', 'created_by'],
      });
    } catch (err) {
      this.logger.error(`Error finding Ticket by Id: ${err}`);
      throw new ServiceUnavailableException();
    }
  }
}
