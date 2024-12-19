import { Injectable } from '@nestjs/common';
import { Book } from './book.entity';
import { Like } from 'typeorm';
import { Bookstore } from '../bookstore/bookstore.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomError } from '../utils/error-handler.util';
import { AddBookDto } from './dto/add_book.dto';
import { UpdateBookDto } from './dto/update_book.dto';



@Injectable()
export class BookService {

    constructor(
        @InjectRepository(Book) private BookRepository: Repository<Book>,
        @InjectRepository(User) private UserRepository: Repository<User>,
        @InjectRepository(Bookstore) private BookstoreRepository: Repository<Bookstore>,
    ) {
        
    }

    async findById(id: number) : Promise<Book | undefined> {
        const book = await this.BookRepository.findOne({
            where: { id },
            relations: ['bookstore'],
        });
        if (!Book) CustomError('Books not found', 404);
        return book;
    }

    async list(book_name: string): Promise<Book[]> {// for search       
       
        const books = await this.BookRepository.find({
            where:{ book_name : Like(`%${book_name}%`)} ,
            relations: ['bookstore'],
        });
        return books;
    }

    async info(book_name: string): Promise<object> { // stats for specific book
        const books = await this.BookRepository.find({
            where: { book_name },
            relations: ['bookstore'],
        });
        if (!books) CustomError('Book not found', 404);
        let total = 0;
        books.forEach(b => {
            total += b.price;
        });
        const averagePrice = total / books.length;
        const data = {
            books,
            averagePrice,
        };
        return data;
    }

    async add(book: AddBookDto, id: number): Promise<Book> {
        //check if bookstore exists
       const bookstore = await this.BookstoreRepository.findOne({ where: { id: book.bookstoreId } });
        if (!bookstore) CustomError('Bookstore not found', 404);
        //check if user is manager of bookstore
        //if user id is 1 then he is admin and can add book to any bookstore
        if((bookstore.manager.id !== id) && (bookstore.manager.id != 1)) CustomError('You are not authorized to add book to this bookstore', 401);
        

        return await this.BookRepository.save(book);
    }

    async update(book: UpdateBookDto, roleId: number): Promise<Book> { // for update book quantity and price
        
        const bookToUpdate = await this.BookRepository.findOne({ where: { id: book.id } });
        if (!bookToUpdate) CustomError('Book not found', 404);

        const bookstore = await this.BookstoreRepository.findOne({ where: { id: bookToUpdate.bookstore.id } });
        //check if user is manager of bookstore
        //if user id is 1 then he is admin and can add book to any bookstore
        if((bookstore.manager.id !== roleId) && (bookstore.manager.id != 1)) CustomError('You are not authorized to update book to this bookstore', 401);


        return await this.BookRepository.save(book);
    }

    async delete(id: number): Promise<string> {
        const book = await this.BookRepository.findOne({ where: { id } });
        if (!book) CustomError('Book not found', 404);
        await this.BookRepository.delete(id);
        return `Bookstore ${book.book_name} deleted successfully.`
    }
}

