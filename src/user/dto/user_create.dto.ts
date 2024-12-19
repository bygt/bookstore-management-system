import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username for user registration',
    minLength: 3,
    maxLength: 20,
  })
  @IsString()
  @Length(3, 20)
  username: string;

  @ApiProperty({
    description: 'Email of the user for registration',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for user registration (must contain at least one uppercase letter and one lowercase letter)',
    pattern: '^(?=.*[a-z])(?=.*[A-Z]).{8,20}$',
  })
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z]).{8,20}$/, {
    message: 'password must contain at least one uppercase letter and one lowercase letter',
  })
  password: string;
}
