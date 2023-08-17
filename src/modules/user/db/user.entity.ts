import { BaseEntity } from '../../../db/baseentity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Ticket } from '../../ticket/db/ticket.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ nullable: false, length: 128 })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @OneToMany(() => Ticket, (ticket) => ticket.created_by)
  created_tickets: Ticket[];

  @OneToMany(() => Ticket, (ticket) => ticket.assigned_to)
  assigned_tickets: Ticket[];
}
