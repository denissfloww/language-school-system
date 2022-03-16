import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginUserDto) {
    const user = await this.validateUser(loginDto);
    const roles = user.roles.map((role) => {
      return {
        name: role.name,
        desc: role.description,
      };
    });
    const payload = {
      id: user.id,
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(loginDto: LoginUserDto) {
    const user = await this.usersService.getUserByLogin(loginDto.login);
    const passwordEquals = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный логин или пароль',
    });
  }
}
