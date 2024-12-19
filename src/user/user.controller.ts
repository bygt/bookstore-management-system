import { UserService } from './user.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {  Body,  Controller, Get,  Post, UseGuards,  } from '@nestjs/common';
import { CreateUserDto } from './dto/user_create.dto';
import { AddUserDto } from './dto/add_user.dto';
import { RoleGuard } from '../guards/role.guard';
import { Permission } from '../guards/permission.decorator';
import { ApiTags , ApiOperation, ApiResponse, ApiBearerAuth, ApiBody} from '@nestjs/swagger';

@ApiTags('user') 
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/sign-up')
  @ApiOperation({ summary: 'Create a new user' })  
  @ApiResponse({ status: 201, description: 'User successfully created' })  
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: CreateUserDto })     
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }

  //this route is protected by the JwtAuthGuard
  
  @Post('/add')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Permission('add')  
  @ApiOperation({ summary: 'Add a user' })
  @ApiBearerAuth() 
  @ApiResponse({ status: 201, description: 'User successfully added' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBody({ type: AddUserDto })              
  async addUser(@Body() addUserDto: AddUserDto) {   
    return this.userService.addUser(addUserDto);
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Permission('role')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users' })
  @ApiBearerAuth()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
  
}
