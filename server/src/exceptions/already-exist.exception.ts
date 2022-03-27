import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyExistException extends HttpException {
  constructor(description?: string) {
    const desc = 'Запись уже существует';
    super(description ?? desc, HttpStatus.BAD_REQUEST);
  }
}
