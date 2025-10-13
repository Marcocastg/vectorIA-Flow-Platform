import { PartialType } from '@nestjs/mapped-types';
import { createvideoOnDemandDto } from './create-videoOnDemand.dto';

export class updatevideoOnDemandDto extends PartialType(createvideoOnDemandDto) {}