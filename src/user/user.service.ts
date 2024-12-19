import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/user_create.dto';
import { HttpException, HttpStatus, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CustomError } from '../utils/error-handler.util'; // parameters (message: string, status: HttpStatus)
import { AddUserDto } from './dto/add_user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

 
  async findById(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      CustomError('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) CustomError('Username or email already exists', HttpStatus.CONFLICT);

    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
        roleId: 3,// admin id = 1 ,manager id 2, default user role id = 3
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      // unexpected errors
      CustomError(
        'Failed to create a new user. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addUser(addUserDto: AddUserDto): Promise<User> {

    const { username, email, password, roleId } = addUserDto;

    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) CustomError('Username or email already exists', HttpStatus.CONFLICT);

    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = this.userRepository.create({
        ...addUserDto,
        password: hashedPassword,
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      CustomError(
        'Failed to create a new user. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,

      );
    }
  }

  //get all users with pagination and filtering
  async getAllUsers(
    page: number = 1,
    limit: number = 10,
    filter?: { username?: string; email?: string; roleId?: number },
  ): Promise<{ users: User[]; total: number; page: number; totalPages: number }> {
    const skip = (page - 1) * limit;
    const query = this.userRepository.createQueryBuilder('user');

    if (filter) {
      if (filter.username) {
        query.andWhere('user.username LIKE :username', { username: `%${filter.username}%` });
      }
      if (filter.email) {
        query.andWhere('user.email LIKE :email', { email: `%${filter.email}%` });
      }
      if (filter.roleId) {
        query.andWhere('user.roleId = :roleId', { roleId: filter.roleId });
      }
    }

    const [users, total] = await query
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
  
}
