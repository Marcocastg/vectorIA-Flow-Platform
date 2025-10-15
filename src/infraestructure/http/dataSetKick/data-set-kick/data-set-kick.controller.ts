import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { createdataSetKickDto, updatedataSetKickDto } from 'src/application/dto/dataSetKick';
import * as useCase from 'src/application/uses-cases/dataSetKick/index';
import { ParseObjectIdPipe } from 'src/shared/pipes/parse-object-id.pipe';


@Controller('data-set-kick')
export class DataSetKickController {
constructor(
            private createUseCase: useCase.CreateDataSetKickUseCase,
            private getAllCase: useCase.GetAllDataSetKickUseCase,
            private getOneCase: useCase.GetOneDataSetKickUseCase,
            private deleteCase: useCase.DeleteDataSetKickUseCase,
            private updateCase: useCase.UpdateDataSetKickUseCase,
        ){}
    
        @Post()
        async create(@Body() dto: createdataSetKickDto ){
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
                    message: 'DataSetKick creado.'
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
              message: 'DataSetKick obtenidos',
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
                  message: 'DataSetKick obtenido',
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
              message: 'DataSetKick eliminado.',
            };
        }
    
        @Patch(':id')
        async update(@Param('id', ParseObjectIdPipe) id:string, @Body() updateDataSetKickDto: updatedataSetKickDto){
                const result = await this.updateCase.execute(
                  id,
                  updateDataSetKickDto,
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
                  message: 'DataSetKick actualizado',
                };
        }
}
