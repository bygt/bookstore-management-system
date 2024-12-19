import { Matches } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Bookstore } from '../bookstore/bookstore.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  roleId: number;

  @OneToOne(() => Bookstore, (bookstore) => bookstore.manager) // Bookstore'daki manager'a bağlanıyor
  bookstore: Bookstore;
}
