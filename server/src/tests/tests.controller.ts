import { Controller } from '@nestjs/common';
import { TestsService } from './tests.service';
import { Test } from '../models/test.entity';
import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
  model: {
    type: Test,
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
@Controller('tests')
export class TestsController implements CrudController<Test> {
  constructor(public service: TestsService) {}
}
