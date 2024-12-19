import { IsOptional, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddBookstoreDto {
  @ApiProperty({
    description: 'The name of the bookstore',
    example: 'The Book Haven',
    pattern: '^[a-zA-Z]+$', // Matches letters only
  })
  @IsString()
  @Matches(/^[a-zA-Z]+$/, {
    message: 'Name must contain only letters',
  })
  name: string;

  @ApiProperty({
    description: 'The address of the bookstore',
    example: '123 Book St, Booktown, BK 12345',
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: 'The phone number of the bookstore (10 or 11 digits)',
    example: '0123456789',
    pattern: '^[0-9]{10,11}$', // Matches phone numbers with 10 or 11 digits
  })
  @IsString()
  @Matches(/^[0-9]{10,11}$/, {
    message: 'Invalid phone number',
  })
  phone: string;

  @ApiProperty({
    description: 'The ID of the manager in charge of the bookstore',
    example: 1,
  })
  @IsString()
  manager_id: number;
}
