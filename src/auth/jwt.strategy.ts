import { Injectable } from '@nestjs/common';
import { Strategy as PassportJwtStrategy, ExtractJwt } from 'passport-jwt'; // PassportJwtStrategy is renamed to Strategy
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(PassportJwtStrategy) {  
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,  
    });
  }

  async validate(payload: any) {
    const user = await this.userRepository.findOne({ where: { id: payload.sub } });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  }
}
