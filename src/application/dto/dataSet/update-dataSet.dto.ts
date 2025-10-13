import { PartialType } from '@nestjs/mapped-types';
import { createdataSetDto } from './create-dataSet.dto';

export class updatedataSetDto extends PartialType(createdataSetDto) {}