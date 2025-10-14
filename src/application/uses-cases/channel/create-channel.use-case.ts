import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { createAnalysisDto } from 'src/application/dto/analysis';
import { createCategoryDto } from 'src/application/dto/category';
import { createChannelDto } from 'src/application/dto/channel';
import { Analysis } from 'src/core/entities/analysis/analysis.entity';
import { Category } from 'src/core/entities/category/category.entity';
import { Channel } from 'src/core/entities/channel/channel.entity';
import { AnalysisService } from 'src/core/services/analysis/analysis/analysis.service';
import { CategoryService } from 'src/core/services/category/category/category.service';
import { ChannelService } from 'src/core/services/channel/channel/channel.service';
import { AnalysisEvent } from 'src/domain/events/analysis/analysis-creado.event';
import { CategoryEvent } from 'src/domain/events/category/category-creada.event';
import { ChannelEvent } from 'src/domain/events/channel/channel-creada.event';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class CreateChannelUseCase {
  constructor(
    private readonly channelService: ChannelService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    dto: createChannelDto,
  ): Promise<Result<Channel>> {
    
    const createDto = {...dto};

    try {
      const channel = await this.channelService.crearChannel(createDto);
      this.eventEmitter.emit('channel.creado', new ChannelEvent(channel));
      return Result.ok(channel);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
