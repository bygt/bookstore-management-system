import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Permission } from '../guards/permission.decorator';
import { PermissionEntity } from './permission.entity';
import { ApiOperation, ApiResponse, ApiTags ,ApiBearerAuth } from '@nestjs/swagger';
import { AddPermissionDto } from './dto/add_permission.dto';


@ApiTags('role')
@Controller('role')
@UseGuards(JwtAuthGuard)
@UseGuards(RoleGuard)
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get('/:id')
  @Permission('role')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get role by ID' })
  @ApiResponse({ status: 200, description: 'Role found' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  async getRole(@Param('id') id: number): Promise<Role> {
    return this.roleService.findById(id);
  }

  @Post('/add')
  @Permission('role')
  @ApiOperation({ summary: 'Add a new role' })
  @ApiResponse({ status: 201, description: 'Role added successfully' })
  @ApiResponse({ status: 409, description: 'Role already exists' })
  @ApiBearerAuth()
  async addRole(@Body('role_name') role_name: string): Promise<Role> {
    return this.roleService.add(role_name);
  }

  @Post('/addPermission')
  @Permission('role')
  @ApiOperation({ summary: 'Add a permission to a role' })
  @ApiResponse({ status: 201, description: 'Permission added successfully' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  @ApiResponse({ status: 400, description: 'Permission already exists' })
  @ApiBearerAuth()
  async addPermission(
    @Body() addPermissionDto :AddPermissionDto
  ): Promise<PermissionEntity> {
    const { roleId, permission, status } = addPermissionDto;
    return this.roleService.addPermission({ roleId, permission, status });
  }
}
