import { Test, TestingModule } from '@nestjs/testing';
import { VideoOnDemandController } from './video-on-demand.controller';

describe('VideoOnDemandController', () => {
  let controller: VideoOnDemandController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoOnDemandController],
    }).compile();

    controller = module.get<VideoOnDemandController>(VideoOnDemandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
