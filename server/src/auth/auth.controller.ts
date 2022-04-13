import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { LoginUserDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';
import { RefreshTokenDto } from './dto/refresh-token-dto';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/login')
  login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/check')
  async isUserExist(@Headers() headers) {
    const jwtToken = headers['authorization'].split(' ')[1];
    const userJwtInfo = this.jwtService.decode(jwtToken);
    const userId = userJwtInfo['id'];
    return this.authService.isUserExist(userId);
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('/refresh-token')
  async refreshToken(@Body() token: RefreshTokenDto) {
    return this.authService.getNewAccessAndRefreshToken(token.refresh_token);
  }
}
