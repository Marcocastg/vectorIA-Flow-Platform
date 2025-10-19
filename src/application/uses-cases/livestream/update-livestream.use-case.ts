import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { updateLivestreamDto } from 'src/application/dto/livestream';
import { Livestream } from 'src/core/entities/livestream/livestream.entity';
import { LivestreamService } from 'src/core/services/livestream/livestream/livestream.service';
import { LivestreamEvent } from 'src/domain/events/livestream/livestream-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class UpdateLivestreamUseCase {
  constructor(
    private readonly livestreamService: LivestreamService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    id: string,
    dto: updateLivestreamDto,
  ): Promise<Result<Livestream>> {
    try {
      const livestream = await this.livestreamService.actualizarLivestream(
        id,
        dto,
      );
      this.eventEmitter.emit('livestream.update', new LivestreamEvent(livestream));
      return Result.ok(livestream);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
