import { Test, TestingModule } from '@nestjs/testing';
import { CalculatedPaymentsService } from './calculated-payments.service';

describe('CalculatedPaymentsService', () => {
  let service: CalculatedPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatedPaymentsService],
    }).compile();

    service = module.get<CalculatedPaymentsService>(CalculatedPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
