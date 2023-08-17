import { BaseEntity } from '../../../db/baseentity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ nullable: false, length: 128 })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;
}
