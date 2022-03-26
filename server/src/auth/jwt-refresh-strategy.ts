import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { JwtPayload } from './interface/JwtPayload';

export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.refreshTokenSecret,
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
