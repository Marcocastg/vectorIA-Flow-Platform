import { PartialType } from '@nestjs/mapped-types';
import { createdataSetKickDto } from './create-dataSetKick.dto';

export class updatedataSetKickDto extends PartialType(createdataSetKickDto) {}