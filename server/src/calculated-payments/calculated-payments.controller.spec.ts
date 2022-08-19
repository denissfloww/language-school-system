import { Test, TestingModule } from '@nestjs/testing';
import { CalculatedPaymentsController } from './calculated-payments.controller';
import { CalculatedPaymentsService } from './calculated-payments.service';

describe('CalculatedPaymentsController', () => {
  let controller: CalculatedPaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculatedPaymentsController],
      providers: [CalculatedPaymentsService],
    }).compile();

    controller = module.get<CalculatedPaymentsController>(CalculatedPaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
