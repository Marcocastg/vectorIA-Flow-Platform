import { Test, TestingModule } from '@nestjs/testing';
import { DataSetController } from './data-set.controller';

describe('DataSetController', () => {
  let controller: DataSetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataSetController],
    }).compile();

    controller = module.get<DataSetController>(DataSetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
