import { IsString, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddPermissionDto {
  @IsNumber()
  @ApiProperty({
    description: 'The ID of the role',
    example: 1,
  })
  roleId: number;

  @IsString()
  @ApiProperty({
    description: 'The permission to be assigned to the role',
    example: 'read',
  })
  permission: string;

  @IsBoolean()
  @ApiProperty({
    description: 'The status of the permission (active or not)',
    example: true,
  })
  status: boolean;
}
