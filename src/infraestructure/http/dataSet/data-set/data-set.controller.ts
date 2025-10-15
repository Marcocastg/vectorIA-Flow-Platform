import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { createdataSetDto } from 'src/application/dto/dataSet/create-dataSet.dto';
import { updatedataSetDto } from 'src/application/dto/dataSet/update-dataSet.dto';
import * as useCase from 'src/application/uses-cases/dataSet/index';
import { ParseObjectIdPipe } from 'src/shared/pipes/parse-object-id.pipe';


@Controller('data-set')
export class DataSetController {
constructor(
            private createUseCase: useCase.CreateDataSetUseCase,
            private getAllCase: useCase.GetAllDataSetUseCase,
            private getOneCase: useCase.GetOneDataSetUseCase,
            private deleteCase: useCase.DeleteDataSetUseCase,
            private updateCase: useCase.UpdateDataSetUseCase,
        ){}
    
        @Post()
        async create(@Body() dto: createdataSetDto ){
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
                    message: 'DataSet creado.'
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
              message: 'DataSet obtenidos',
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
                  message: 'DataSet obtenido',
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
              message: 'DataSet eliminado.',
            };
        }
    
        @Patch(':id')
        async update(@Param('id', ParseObjectIdPipe) id:string, @Body() updateDataSetDto: updatedataSetDto){
                const result = await this.updateCase.execute(
                  id,
                  updateDataSetDto,
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
                  message: 'DataSet actualizado',
                };
        }
}
