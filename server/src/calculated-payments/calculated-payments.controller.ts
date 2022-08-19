import { Controller } from '@nestjs/common';
import { CalculatedPaymentsService } from './calculated-payments.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { CalculatedPayment } from '../models/calculated.payment.entity';

@Crud({
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
  model: {
    type: CalculatedPayment,
  },
  query: {
    alwaysPaginate: true,
    join: {
      student: {
        eager: true,
      },
      group: {
        eager: true,
      },
      'student.user': {
        eager: true,
        exclude: ['password'],
      },
    },
  },
})
@Controller('calculated-payments')
export class CalculatedPaymentsController
  implements CrudController<CalculatedPayment>
{
  constructor(public service: CalculatedPaymentsService) {}
}
