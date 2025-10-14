import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Analysis } from 'src/core/entities/analysis/analysis.entity';
import { Categoria } from 'src/core/entities/categoria/categoria.entity';
import { Category } from 'src/core/entities/category/category.entity';
import { Channel } from 'src/core/entities/channel/channel.entity';
import { AnalysisService } from 'src/core/services/analysis/analysis/analysis.service';
import { CategoriaService } from 'src/core/services/categoria/categoria.service';
import { CategoryService } from 'src/core/services/category/category/category.service';
import { ChannelService } from 'src/core/services/channel/channel/channel.service';
import { AnalysisEvent } from 'src/domain/events/analysis/analysis-creado.event';
import { CategoriaEvent } from 'src/domain/events/categoria/categoria-creada.event';
import { CategoryEvent } from 'src/domain/events/category/category-creada.event';
import { ChannelEvent } from 'src/domain/events/channel/channel-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class DeleteChannelUseCase {
  constructor(
    private readonly channelService: ChannelService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(id: string): Promise<Result<Channel>> {
    try {
      const channel = await this.channelService.eliminarChannel(id);
      this.eventEmitter.emit(
        'channel.eliminada',
        new ChannelEvent(channel),
      );
      return Result.ok(channel);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
