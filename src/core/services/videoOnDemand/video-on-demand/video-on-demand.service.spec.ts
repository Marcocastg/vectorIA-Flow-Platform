import { Test, TestingModule } from '@nestjs/testing';
import { VideoOnDemandService } from './video-on-demand.service';

describe('VideoOnDemandService', () => {
  let service: VideoOnDemandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoOnDemandService],
    }).compile();

    service = module.get<VideoOnDemandService>(VideoOnDemandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
