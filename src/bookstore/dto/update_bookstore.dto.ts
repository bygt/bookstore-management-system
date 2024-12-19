import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookstoreDto {

  @ApiProperty({
    description: 'The ID of the bookstore to update',
    example: 1,
    required: true,  
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'The name of the bookstore to update',
    example: 'The Book Haven',
    required: false, 
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'The address of the bookstore to update',
    example: '123 Book St, Booktown, BK 12345',
    required: false,  
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    description: 'The phone number of the bookstore to update',
    example: '0123456789',
    required: false, 
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    description: 'The manager ID of the bookstore to update',
    example: 2,
    required: false,  
  })
  @IsString()
  @IsOptional()
  manager_id: number;
}
