// Dummy Database

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Representation of Database
@Entity({ name: 'book' })
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  price: number;
}
