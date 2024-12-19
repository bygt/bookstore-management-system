import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { PermissionEntity } from './permission.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  role_name: string;

  @OneToMany(() => PermissionEntity, (permission) => permission.role)
  permissions: PermissionEntity[];
}
