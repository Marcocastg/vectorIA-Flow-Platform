import { Test, TestingModule } from '@nestjs/testing';
import { DataSetKickController } from './data-set-kick.controller';

describe('DataSetKickController', () => {
  let controller: DataSetKickController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataSetKickController],
    }).compile();

    controller = module.get<DataSetKickController>(DataSetKickController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
