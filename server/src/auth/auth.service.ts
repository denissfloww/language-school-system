import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './interface/JwtPayload';
import { jwtConstants } from './constants';
import { User } from '../models/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginUserDto) {
    const user = await this.validateUser(loginDto);
    const payload = AuthService.getUserPayloadData(user);

    return this.getTokens(payload);
  }

  async isUserExist(userId: number) {
    const user = await this.usersService.getUserById(userId);
    return !!user;
  }

  async getNewAccessAndRefreshToken(refreshToken: string) {
    const decode = this.jwtService.verify(refreshToken, {
      secret: jwtConstants.refreshTokenSecret,
    });
    if (!decode) throw new ForbiddenException('Access Denied');

    const user = await this.usersService.getUserByLogin(decode.login);
    const payload = AuthService.getUserPayloadData(user);

    return this.getTokens(payload);
  }

  async updateJwtTokenPayload(userId: number) {
    const user = await this.usersService.getUserById(userId);

    const payload = AuthService.getUserPayloadData(user);
    const newJwt = this.jwtService.sign(payload, {
      secret: jwtConstants.accessTokenSecret,
      expiresIn: '10h',
    });

    return { access_token: newJwt };
  }

  private static getUserPayloadData(user: User) {
    const roles = user.roles.map((role) => {
      return {
        name: role.name,
        desc: role.description,
      };
    });

    const payload: JwtPayload = {
      id: user.id,
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: roles,
    };

    return payload;
  }

  private getTokens(payload: JwtPayload) {
    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.accessTokenSecret,
        expiresIn: '10h',
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: jwtConstants.refreshTokenSecret,
        expiresIn: '360d',
      }),
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
