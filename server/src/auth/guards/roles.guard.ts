import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../roles-auth.decorator';
import { UsersService } from '../../users/users.service';
import { jwtConstants } from '../constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }

      const userJwtInfo = this.jwtService.verify(token, {
        secret: jwtConstants.refreshTokenSecret,
      });
      req.user = userJwtInfo;

      const user = this.userService.getUserById(userJwtInfo.id);

      return user.then((value) => {
        const userHasRole = value.roles.some((role) =>
          requiredRoles.includes(role.name),
        );
        if (!userHasRole) {
          throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
        }

        return userHasRole;
      });
    } catch (e) {
      console.log(e);
      throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
    }
  }
}
