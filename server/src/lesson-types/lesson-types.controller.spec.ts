import { Test, TestingModule } from '@nestjs/testing';
import { LessonTypesController } from './lesson-types.controller';
import { LessonTypesService } from './lesson-types.service';

describe('LessonTypesController', () => {
  let controller: LessonTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonTypesController],
      providers: [LessonTypesService],
    }).compile();

    controller = module.get<LessonTypesController>(LessonTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
