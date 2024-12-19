import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';  // TypeOrmModule import
import { User } from './user.entity';  
import { AuthModule } from '../auth/auth.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule,RoleModule],  
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
