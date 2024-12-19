import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Book } from '../book/book.entity';
import { User } from '../user/user.entity';
import { Matches } from 'class-validator';

@Entity('bookstores')
export class Bookstore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'manager_id' })
  manager: User;

  @OneToMany(() => Book, (book) => book.bookstore)
  books: Book[];
}
