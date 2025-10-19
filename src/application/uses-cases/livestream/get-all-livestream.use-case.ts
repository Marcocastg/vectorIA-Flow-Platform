import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Livestream } from 'src/core/entities/livestream/livestream.entity';
import { LivestreamService } from 'src/core/services/livestream/livestream/livestream.service';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class GetAllLivestreamUseCase {
  constructor(
    private readonly livestreamService: LivestreamService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(): Promise<Result<Livestream[]>> {
    try {
      const livestream = await this.livestreamService.listarLivestream();

      return Result.okList(livestream);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
