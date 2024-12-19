import { Injectable } from '@nestjs/common';
import { QueryBookstoreDto } from './dto/query_bookstore.dto';
import { Book } from '../book/book.entity';
import { Bookstore } from './bookstore.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import { CustomError } from '../utils/error-handler.util';
import { AddBookstoreDto } from './dto/add_bookstore.dto';
import { User } from '../user/user.entity';
import { UpdateBookstoreDto } from './dto/update_bookstore.dto';

@Injectable()
export class BookstoreService {
  constructor(
    @InjectRepository(Bookstore)
    private bookstoreRepo: Repository<Bookstore>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async list(query: QueryBookstoreDto): Promise<Bookstore[]> {
    const where: any = {};

    //if bookstore manager want to see his/her bookstores
    if(query.manager_id){
        const bookstores = await this.bookstoreRepo.find({
            where: { manager: { id: 1 } }, 
            relations: ['manager'], 
          });
        return bookstores;
    }
    if (query.name) where.name = Like(`%${query.name}%`);
    if (query.phone) where.phone = Like(`%${query.phone}%`);
    if (query.address) where.address = Like(`%${query.address}%`);

    const stores = await this.bookstoreRepo.find({
      where,
      relations: ['books'],
    });

    return stores;
  }

  async findById(id: number): Promise<Bookstore | undefined> {
    
    const store = await this.bookstoreRepo.findOne({
      where: { id },
      relations: ['books', 'manager'],
    });

    if (!store) CustomError('Bookstore not found', 404);

    return store;
  }

  async add(bookstoreDto: AddBookstoreDto): Promise<Bookstore> {
    //check if manager exists
    const manager = await this.userRepository.findOne({ where: { id: bookstoreDto.manager_id } });

    if (!manager) CustomError('Manager not found', 404);
    if(manager.roleId !== 2) CustomError('User is not a manager', 400);

    const store = this.bookstoreRepo.create(bookstoreDto);

    return this.bookstoreRepo.save(store);
  }

  async update(updateBookstoreDto: UpdateBookstoreDto): Promise<Bookstore> {
    
    const id  = updateBookstoreDto.id;

    const store = await this.bookstoreRepo.findOne({ where: { id } });
    if (!store) CustomError('Bookstore not found', 404);

    return this.bookstoreRepo.save({ ...store, ...updateBookstoreDto });
    
  }

  async delete(id: number): Promise<string> {

   try {const store = await this.bookstoreRepo.findOne({ where: { id } });
    if (!store) CustomError('Bookstore not found', 404);
    //delete stores books first
    await this.bookstoreRepo.createQueryBuilder()
    .relation(Bookstore, 'books')
    .of(store)
    .remove(store.books);

    await this.bookstoreRepo.delete({ id });

    return `Bookstore ${store.name} deleted successfully.`;}
    catch (error) {
      CustomError('Bookstore delete failed', 400);
    }
  }
}
