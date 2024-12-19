import { IsString, IsNumber, IsOptional, IsDecimal, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {

  @ApiProperty({
    description: 'The ID of the book to update',
    type: Number,
  })
  @IsNumber()
  id: number;
  
  @ApiProperty({
    description: 'The quantity of the book, optional',
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  quantity: number;

  @ApiProperty({
    description: 'The price of the book, optional, must be greater than 0',
    type: Number,
    required: false,
  })
  @IsDecimal()
  @IsOptional()
  @Matches(/^[1-9]\d*(\.\d+)?$/, { message: 'Price must be greater than 0' })
  price: number;
}
