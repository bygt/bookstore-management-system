import { IsEmail, IsNumber, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddUserDto {
  @ApiProperty({
    description: 'Username of the user to be added',
    minLength: 3,
    maxLength: 20,
  })
  @IsString()
  @Length(3, 20)
  username: string;

  @ApiProperty({
    description: 'Email of the user to be added',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user to be added (must contain at least one uppercase letter and one lowercase letter)',
    pattern: '^(?=.*[a-z])(?=.*[A-Z]).{8,20}$',
  })
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z]).{8,20}$/, {
    message: 'password must contain at least one uppercase letter and one lowercase letter',
  })
  password: string;

  @ApiProperty({
    description: 'Role ID for the user (Admin=1, Manager=2, User=3(default roles))',
  })
  @IsNumber()
  roleId: number;
}
