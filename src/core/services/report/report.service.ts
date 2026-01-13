import { HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { createReportDto, UpdateReportDto } from "src/application/dto/report";
import { REPORT_REPOSITORY } from "src/core/constants/constants";
import { Report } from "src/core/entities/report/report.entity";
import type { ReportRepository } from "src/core/repositories/report/report.repository";
import { ValidatorService } from "src/shared/application/validation/validator.service";
import { BussinesRuleException } from "src/shared/domain/exceptions/business-rule.exception";

@Injectable()
export class ReportService {
    constructor(
        @Inject(REPORT_REPOSITORY)
        private repository: ReportRepository,
        private readonly validator: ValidatorService,
    ) {}

    async crearReport(dto: createReportDto): Promise<Report>{
        await this.validator.validate(dto, createReportDto);
              
                  const existe = await this.repository.findByAIText(dto.aiAnalysis);
                  if (existe) {
                    throw new BussinesRuleException(
                      'The report already exists.',
                      HttpStatus.BAD_REQUEST,
                      {
                        aiAnalysis: dto.aiAnalysis,
                        codigoError: 'REPORT_ALREADY_EXISTS',
                      },
                    );
                  }
              
                  const report = new Report(
                    null,
                    dto.createdAt || new Date(),
                    dto.userId || '',
                    dto.inputData,
                    dto.predictionData,
                    dto.channelName,
                    dto.platformName,
                    dto.aiAnalysis,
                  );
              
                  return this.repository.save(report);
    }

    async listarReport(): Promise<Report[]> {
              return this.repository.findAllActive();
            }

            async obtenerUnReport(id: string): Promise<Report> {
              const existe = await this.repository.findById(id);
          
              if (!existe) {
                throw new BussinesRuleException(
                  'The report does not exist.',
                  HttpStatus.NOT_FOUND,
                  {
                    id: id,
                    codigoError: 'REPORT_NOT_FOUND',
                  },
                );
              }
          
              return existe;
            }
          
            async actualizarReport(
              id: string,
              dto: UpdateReportDto,
            ): Promise<Report> {
                const reportExists = await this.repository.findById(id);
                if (!reportExists) {
                    throw new NotFoundException(`Report with ID "${id}" not found`);
                }
              return this.repository.update(id, dto);
            }
          
            async eliminarReport(id: string): Promise<Report> {
              const report = await this.obtenerUnReport(id);
                
              return this.repository.delete(id);
    }
}