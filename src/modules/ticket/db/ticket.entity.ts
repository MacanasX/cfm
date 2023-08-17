import { BaseEntity } from '../../../db/baseentity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../user/db/user.entity';
import { TicketStatus } from '../enum/status.enum';

@Entity('ticket')
export class Ticket extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: Date })
  due_Date: Date;

  @ManyToOne(() => User, (user) => user.created_tickets)
  created_by: User;

  @ManyToOne(() => User, (user) => user.assigned_tickets)
  assigned_to: User;

  @Column({
    type: 'enum',
    nullable: false,
    default: TicketStatus.TODO,
    enum: TicketStatus,
  })
  status = TicketStatus;
}
