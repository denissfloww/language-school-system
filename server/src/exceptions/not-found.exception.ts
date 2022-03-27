import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(description?: string) {
    const desc = 'Не найдено';
    super(description ?? desc, HttpStatus.NOT_FOUND);
  }
}
