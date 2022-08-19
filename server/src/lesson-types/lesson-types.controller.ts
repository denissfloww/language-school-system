import { Controller } from '@nestjs/common';
import { LessonTypesService } from './lesson-types.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { LessonType } from '../models/lesson-types.entity';

@Crud({
  model: {
    type: LessonType,
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
@Controller('lesson-types')
export class LessonTypesController implements CrudController<LessonType> {
  constructor(public service: LessonTypesService) {}
}
