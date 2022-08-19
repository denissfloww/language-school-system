import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from '../models/language.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class LanguagesService extends TypeOrmCrudService<Language> {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {
    super(languageRepository);
  }
}
