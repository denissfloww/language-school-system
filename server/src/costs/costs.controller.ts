import { Controller } from '@nestjs/common';
import { CostsService } from './costs.service';
import { Crud, CrudController, CrudService } from '@nestjsx/crud';
import { Cost } from '../models/cost.entity';

@Crud({
  model: {
    type: Cost,
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
@Controller('costs')
export class CostsController implements CrudController<Cost> {
  constructor(public service: CostsService) {}
}
