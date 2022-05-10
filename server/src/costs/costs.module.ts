import { forwardRef, Module } from '@nestjs/common';
import { CostsService } from './costs.service';
import { CostsController } from './costs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cost } from '../models/cost.entity';
import { GroupModule } from '../group/group.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  exports: [CostsService],
  imports: [
    TypeOrmModule.forFeature([Cost]),
    forwardRef(() => GroupModule),
    ConfigModule,
  ],
  controllers: [CostsController],
  providers: [CostsService],
})
export class CostsModule {}
