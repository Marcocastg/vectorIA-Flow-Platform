import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { createReportDto, UpdateReportDto } from "src/application/dto/report";
import * as useCase from 'src/application/uses-cases/report/index'
import { AuthenticatedGuard } from "src/infraestructure/guards/auth/authenticated.guard";
import { ParseObjectIdPipe } from "src/shared/pipes/parse-object-id.pipe";

@Controller('report')
@UseGuards(AuthenticatedGuard)
export class ReportController {

    constructor(
                private createUseCase: useCase.CreateReportUseCase,
                private getAllCase: useCase.GetAllReportUseCase,
                private getOneCase: useCase.GetOneReportUseCase,
                private deleteCase: useCase.DeleteReportUseCase,
                private updateCase: useCase.UpdateReportUseCase,
            ){}
        
            @Post()
            async create(@Body() dto: createReportDto, @Req() req: any){
                    const result = await this.createUseCase.execute(dto, req.user.uuid);
            
                    if(result.isFailure){
                        if (result.error) {
                            throw new HttpException(result.error.message, HttpStatus.BAD_REQUEST);
                        }
                        // Es buena práctica tener un fallback por si algo inesperado ocurre
                        throw new HttpException('An unknown error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
                    }
            
                    return {
                        data: result.getValue(),
                        message: 'Report creado.'
                    }
            
            }
        
            @Get()
            async getAll() {
                const result = await this.getAllCase.execute();
            
                if(result.isFailure){
                    if (result.error) {
                        throw new HttpException(result.error.message, HttpStatus.BAD_REQUEST);
                    }
                        // Es buena práctica tener un fallback por si algo inesperado ocurre
                    throw new HttpException('An unknown error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
                }
            
                return {
                  data: result,
                  message: 'Report obtenidos',
                };
            }
        
        
            @Get(':id')
            async findOne(@Param('id', ParseObjectIdPipe) id: string) {
                    const result = await this.getOneCase.execute(id);
                
                    if(result.isFailure){
                        if (result.error) {
                            throw new HttpException(result.error.message, HttpStatus.BAD_REQUEST);
                        }
                            // Es buena práctica tener un fallback por si algo inesperado ocurre
                        throw new HttpException('An unknown error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                
                    return {
                      data: result,
                      message: 'Report obtenido',
                    };
            }
        
        
            @Delete(':id')
            async remove(@Param('id', ParseObjectIdPipe) id: string) {
                const result = await this.deleteCase.execute(id);
              
                if(result.isFailure){
                    if (result.error) {
                        throw new HttpException(result.error.message, HttpStatus.BAD_REQUEST);
                    }
                        // Es buena práctica tener un fallback por si algo inesperado ocurre
                    throw new HttpException('An unknown error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
                }
              
                return {
                  data: result,
                  message: 'Report eliminado.',
                };
            }
        
            @Patch(':id')
            async update(@Param('id', ParseObjectIdPipe) id:string, @Body() updateReportDto: UpdateReportDto){
                    const result = await this.updateCase.execute(
                      id,
                      updateReportDto,
                    );
                
                    if(result.isFailure){
                        if (result.error) {
                            throw new HttpException(result.error.message, HttpStatus.BAD_REQUEST);
                        }
                            // Es buena práctica tener un fallback por si algo inesperado ocurre
                        throw new HttpException('An unknown error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                
                    return {
                      data: result,
                      message: 'Report actualizado',
                    };
            }
    
}