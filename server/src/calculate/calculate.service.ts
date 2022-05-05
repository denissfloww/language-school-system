import { Injectable } from '@nestjs/common';
import { CreateCalculateDto } from './dto/create-calculate.dto';
import { UpdateCalculateDto } from './dto/update-calculate.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';

@Injectable()
export class CalculateService {
  constructor(private readonly mailerService: MailerService) {}
  create(createCalculateDto: CreateCalculateDto) {
    return 'This action adds a new calculate';
  }

  findAll() {
    this.mailerService
      .sendMail({
        to: 'denbugackoff21@gmail.com',
        from: 'denisbugackoff@yandex.ru',
        subject: 'Тест',
        template: 'index',
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  findOne(id: number) {
    return `This action updates a #${id} calculate`;
  }

  update(id: number, updateCalculateDto: UpdateCalculateDto) {
    return `This action updates a #${id} calculate`;
  }

  remove(id: number) {
    return `This action removes a #${id} calculate`;
  }
}
