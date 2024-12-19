import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { ApiOperation, ApiResponse, ApiBody,  } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'User logged in  successfully' })
  @ApiResponse({ status: 400, description: 'Unexpected error' })
  @ApiBody({ type: String , schema: {properties: {username: {type: 'string'}, password: {type: 'string'}}}})
  @Post('login')
  async login(@Body() user: { username: string; password: string }) {
    const validateUser = await this.authService.login(
      user.username,
      user.password,
    );
    if (!validateUser) throw new Error('Login failed');

    // generate token by calling the generateToken method of the AuthService class
    const token = await this.authService.generateToken({
      id: validateUser.id,
      username: validateUser.username,
      roleId: validateUser.roleId, // add roleId to the payload for authorization processes
    });

    return { access_token: token };
  }
}
