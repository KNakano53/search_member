import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Sequence {
  constructor(id: number) {
    this.id = id;
  }
  @PrimaryColumn({ nullable: false })
  id: number;
}
