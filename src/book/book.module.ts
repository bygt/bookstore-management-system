import { Book } from './book.entity';
import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookstore } from '../bookstore/bookstore.entity';
import { User } from '../user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bookstore, Book, User]), JwtModule, RoleModule],
  providers: [BookService],
  controllers: [BookController]
})
export class BookModule {}
