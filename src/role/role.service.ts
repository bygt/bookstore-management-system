import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { Role } from './role.entity';
import { CustomError } from '../utils/error-handler.util';
import { AddPermissionDto } from './dto/add_permission.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepo: Repository<PermissionEntity>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async checkPermission(
    roleId: number,
    requiredPermission: string,
  ): Promise<boolean> {
    const permission = await this.permissionRepo.findOne({
      where: {
        role: { id: roleId }, //roleId chech on relation
        permission: requiredPermission,
        status: true, //is permission active
      },
      relations: ['role'], // uplaod role data
    });

    return !!permission; // if permission is found return true else false
  }

  async add(role_name: string): Promise<Role> {
    const foundRole = await this.roleRepository.findOne({
      where: { role_name },
    });
    if (foundRole)
      CustomError(`${role_name} role already exists, try another role name`);

    const role = this.roleRepository.create({
      role_name,
    });
    return await this.roleRepository.save(role);
  }

  async findById(roleId: number): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });
    if (!role) CustomError('Role not found');
    return role;
  }

  async addPermission(addPermissionDto : AddPermissionDto): Promise<PermissionEntity> {

    const { roleId, permission, status } = addPermissionDto;

    const role = await this.roleRepository.findOne({ where: { id: roleId } });

    if (!role) CustomError('Role not found');

    const permissionExist = await this.permissionRepo.findOne({
      where: { role, permission },
    });

    if (permissionExist)
      CustomError(
        `${role.role_name} already has ${permission} permission. You can update the permission status`,
      );

    const newPermission = this.permissionRepo.create({
      role,
      permission,
      status,
    });

    return await this.permissionRepo.save(newPermission);
  }

  async updatePermission(permissionId: number, status: boolean): Promise<PermissionEntity> {
    const permission = await this.permissionRepo.findOne({
      where: { id: permissionId },
    });

    if (!permission) CustomError('Permission not found');

    permission.status = status;

    return await this.permissionRepo.save(permission);
  }
}
