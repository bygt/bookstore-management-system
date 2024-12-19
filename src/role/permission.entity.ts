import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role } from './role.entity';

@Entity('permissions')
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  permission: string;

  @Column({ default: 0 })
  status: boolean;

  @ManyToOne(() => Role, (role) => role.permissions)
  role: Role;
}
