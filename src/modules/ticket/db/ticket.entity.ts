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

  @Column({ type: Date, nullable: true, default: null })
  due_Date: Date | null;

  @ManyToOne(() => User, (user) => user.created_tickets, { nullable: false })
  created_by: User;

  @ManyToOne(() => User, (user) => user.assigned_tickets, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  assigned_to: User;

  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.TODO,
  })
  status: TicketStatus;
}
