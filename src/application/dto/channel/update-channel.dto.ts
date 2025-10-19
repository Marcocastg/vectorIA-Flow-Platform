import { PartialType } from '@nestjs/mapped-types';
import { createChannelDto } from './create-channel.dto';

export class updateChannelDto extends PartialType(createChannelDto) {}