import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Channel } from 'src/core/entities/channel/channel.entity';
import { ChannelService } from 'src/core/services/channel/channel/channel.service';
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
