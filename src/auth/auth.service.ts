import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async generateToken(user: { id: number; username: string; roleId: number }) {
    const payload = {
      sub: user.id,
      username: user.username,
      roleId: user.roleId,
    };
    return this.jwtService.sign(payload);
  }
  async login(username: string, password: string): Promise<User | undefined> {
   try{ const user = await this.userRepository.findOne({ where: { username } });

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!user || passwordCheck === false)
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    return user;
  } catch (error) {
    throw new HttpException(
      'Login failed. Please check your credentials and try again.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
  }
}
