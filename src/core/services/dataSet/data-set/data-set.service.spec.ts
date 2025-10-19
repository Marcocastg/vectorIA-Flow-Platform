import { Test, TestingModule } from '@nestjs/testing';
import { DataSetService } from './data-set.service';

describe('DataSetService', () => {
  let service: DataSetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSetService],
    }).compile();

    service = module.get<DataSetService>(DataSetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
