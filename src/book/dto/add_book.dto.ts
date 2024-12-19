// add_book dto
import {  IsString,  IsNumber,  IsDecimal,  Matches,  Length,} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AddBookDto {

  @ApiProperty({
    description: 'The author of the book',
    type: String,
    maxLength: 100,
  })
  @IsString()
  @Length(1, 100)
  author: string;

  @ApiProperty({
    description: 'The publisher of the book',
    type: String,
    maxLength: 100,
  })
  @IsString()
  @Length(1, 100)
  publisher: string;

  @ApiProperty({
    description: 'The quantity of the book in stock',
    type: Number,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'The number of pages in the book',
    type: Number,
  })
  @IsNumber()
  pages: number;

  @ApiProperty({
    description: 'The ID of the bookstore where the book is listed',
    type: Number,
  })
  @IsNumber()
  bookstoreId: number;

  @ApiProperty({
    description: 'The name of the book',
    type: String,
    maxLength: 100,
  })
  @IsString()
  @Length(1, 100)
  book_name: string;

  @ApiProperty({
    description: 'The price of the book, must be greater than 0',
    type: Number,
  })
  @IsDecimal()
  @Matches(/^[1-9]\d*(\.\d+)?$/, { message: 'Price must be greater than 0' })
  price: number;
}