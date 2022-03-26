import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginUserDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';
import { RefreshTokenDto } from './dto/refresh-token-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('/refresh-token')
  async refreshToken(@Body() token: RefreshTokenDto) {
    return this.authService.getNewAccessAndRefreshToken(token.refresh_token);
  }
}
