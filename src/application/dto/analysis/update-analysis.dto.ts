import { PartialType } from '@nestjs/mapped-types';
import { createAnalysisDto } from './create-analysis.dto';

export class updateAnalysisDto extends PartialType(createAnalysisDto) {}