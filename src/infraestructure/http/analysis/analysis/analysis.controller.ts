import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { createAnalysisDto, updateAnalysisDto } from 'src/application/dto/analysis';
import * as useCase from 'src/application/uses-cases/analysis/index';
import { ParseObjectIdPipe } from 'src/shared/pipes/parse-object-id.pipe';

@Controller('analysis')
export class AnalysisController {

    constructor(
        private createUseCase: useCase.CreateAnalysisUseCase,
        private getAllCase: useCase.GetAllAnalysisUseCase,
        private getOneCase: useCase.GetOneAnalysisUseCase,
        private deleteCase: useCase.DeleteAnalysisUseCase,
        private updateCase: useCase.UpdateAnalysisUseCase,
    ){}

    @Post()
    async create(@Body() dto: createAnalysisDto ){
            const result = await this.createUseCase.execute(dto);
    
            if(result.isFailure){
                if (result.error) {
                    throw new HttpException(result.error.message, HttpStatus.BAD_REQUEST);
                }
                // Es buena práctica tener un fallback por si algo inesperado ocurre
                throw new HttpException('An unknown error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
            }
    
            return {
                data: result.getValue(),
                message: 'Analysis creado.'
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
          message: 'Analysis obtenidos',
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
              message: 'Analysis obtenido',
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
          message: 'Analysis eliminado.',
        };
    }

    @Patch(':id')
    async update(@Param('id', ParseObjectIdPipe) id:string, @Body() updateAnalysisDto: updateAnalysisDto){
            const result = await this.updateCase.execute(
              id,
              updateAnalysisDto,
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
              message: 'Analysis actualizado',
            };
    }


}
