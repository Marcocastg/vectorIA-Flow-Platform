import { Test, TestingModule } from '@nestjs/testing';
import { DataSetKickService } from './data-set-kick.service';

describe('DataSetKickService', () => {
  let service: DataSetKickService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSetKickService],
    }).compile();

    service = module.get<DataSetKickService>(DataSetKickService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
