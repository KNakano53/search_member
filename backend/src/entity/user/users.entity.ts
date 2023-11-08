import { Entity, Column, PrimaryColumn } from 'typeorm';
import { IUsers } from './user.interface';

@Entity()
export class Users implements IUsers {
  @PrimaryColumn({ length: 6 })
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  tel: string;
}
