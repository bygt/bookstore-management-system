import { Module } from '@nestjs/common';
import { BookstoreController } from './bookstore.controller';
import { BookstoreService } from './bookstore.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookstore } from './bookstore.entity';
import { User } from '../user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { RoleModule } from '../role/role.module';

@Module({
  imports:[TypeOrmModule.forFeature([Bookstore, User]), JwtModule, RoleModule],
  controllers: [BookstoreController],
  providers: [BookstoreService]
})
export class BookstoreModule {}
