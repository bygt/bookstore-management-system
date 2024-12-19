import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Bookstore } from '../bookstore/bookstore.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  publisher: string;

  @Column()
  quantity: number;

  @Column()
  pages: number;

  @ManyToOne(() => Bookstore, (bookstore) => bookstore.books)
  bookstore: Bookstore;

  @Column({ type: 'varchar' })
  book_name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2})
  price: number;
}
