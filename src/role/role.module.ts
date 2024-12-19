import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { PermissionEntity } from './permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([PermissionEntity, Role], ), AuthModule
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
