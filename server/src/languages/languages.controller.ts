import { Controller } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { Crud } from '@nestjsx/crud';
import { Language } from '../models/language.entity';

@Crud({
  model: {
    type: Language,
  },
  query: {
    alwaysPaginate: true,
    sort: [
      {
        field: 'id',
        order: 'ASC',
      },
    ],
  },
})
@Controller('languages')
export class LanguagesController {
  constructor(public service: LanguagesService) {}
}
