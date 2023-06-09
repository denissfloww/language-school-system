import { HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      if (
        statusCode == HttpStatus.NOT_FOUND ||
        statusCode == HttpStatus.BAD_REQUEST ||
        statusCode == HttpStatus.UNAUTHORIZED
      ) {
        this.logger.error(
          `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
        );
      } else {
        this.logger.log(
          `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
        );
      }
    });

    next();
  }
}
