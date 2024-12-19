import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryBookstoreDto {

  @ApiProperty({
    description: 'The name of the bookstore to search for',
    example: 'The Book Haven',
    required: false, 
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'The address of the bookstore to search for',
    example: '123 Book St, Booktown, BK 12345',
    required: false, 
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    description: 'The phone number of the bookstore to search for',
    example: '0123456789',
    required: false,  
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    description: 'The manager ID of the bookstore to search for',
    example: 1,
    required: false, 
  })
  @IsString()
  @IsOptional()
  manager_id: number;
}
