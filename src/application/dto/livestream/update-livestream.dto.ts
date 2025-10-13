import { PartialType } from '@nestjs/mapped-types';
import { createLivestreamDto } from './create-livestream.dto';

export class updateLivestreamDto extends PartialType(createLivestreamDto) {}