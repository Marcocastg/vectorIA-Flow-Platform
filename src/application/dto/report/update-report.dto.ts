import { PartialType } from "@nestjs/mapped-types";
import { createReportDto } from "./create-report.dto";

export class UpdateReportDto extends PartialType(createReportDto){}