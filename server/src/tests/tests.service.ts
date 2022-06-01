import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Test } from 'src/models/test.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TestsService extends TypeOrmCrudService<Test> {
  constructor(
    @InjectRepository(Test) private testsRepository: Repository<Test>,
  ) {
    super(testsRepository);
  }
}
