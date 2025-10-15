import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Channel } from 'src/core/entities/channel/channel.entity';
import { ChannelService } from 'src/core/services/channel/channel/channel.service';
import { Result } from 'src/shared/domain/result/result';

@Injectable()
export class GetAllChannelUseCase {
  constructor(
    private readonly channelService: ChannelService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(): Promise<Result<Channel[]>> {
    try {
      const allchannel= await this.channelService.listarChannel();

      return Result.okList(allchannel);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
