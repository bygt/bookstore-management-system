import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from '../role/role.service';


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private roleService: RoleService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
        
    // get the request object
    const request = context.switchToHttp().getRequest();
  
    // get the token from the request headers
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) return false;
   

    try {
      //verify the token and get the roleId
      const decoded = this.jwtService.verify(token , {secret: process.env.JWT_SECRET});
      
      const roleId = decoded.roleId;
      if (!roleId) return false;

      if(roleId === 1) return true; // super admin


      // get the required permission from the metadata
      const requiredPermission = this.reflector.get<string>(
        'permission',
        context.getHandler(),
      );

      const hasPermission = await this.roleService.checkPermission(roleId, requiredPermission);
      return hasPermission;
      
    } catch (error) {
      console.log('error', error);
      return error.message;
    }
  }
}
