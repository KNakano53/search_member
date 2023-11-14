import { Column, Entity } from 'typeorm';

@Entity()
export class Sequence {
  constructor(id: number) {
    this.id = id;
  }
  @Column({ nullable: false })
  id: number;
}
