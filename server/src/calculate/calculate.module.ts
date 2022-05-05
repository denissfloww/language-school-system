import { Module } from '@nestjs/common';
import { CalculateService } from './calculate.service';
import { CalculateController } from './calculate.controller';

@Module({
  controllers: [CalculateController],
  providers: [CalculateService]
})
export class CalculateModule {}
