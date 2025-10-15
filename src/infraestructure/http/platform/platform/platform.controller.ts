import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { createPlatformDto, updatePlatformDto } from 'src/application/dto/platform';
import * as useCase from 'src/application/uses-cases/platform/index';
import { ParseObjectIdPipe } from 'src/shared/pipes/parse-object-id.pipe';


@Controller('platform')
export class PlatformController {
constructor(
            private createUseCase: useCase.CreatePlatformUseCase,
            private getAllCase: useCase.GetAllPlatformUseCase,
            private getOneCase: useCase.GetOnePlatformUseCase,
            private deleteCase: useCase.DeletePlatformUseCase,
            private updateCase: useCase.UpdatePlatformUseCase,
        ){}
    
        @Post()
        async create(@Body() dto: createPlatformDto ){
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
                    message: 'Platform creado.'
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
              message: 'Platform obtenidos',
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
                  message: 'Platform obtenido',
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
              message: 'Platform eliminado.',
            };
        }
    
        @Patch(':id')
        async update(@Param('id', ParseObjectIdPipe) id:string, @Body() updatePlatformDto: updatePlatformDto){
                const result = await this.updateCase.execute(
                  id,
                  updatePlatformDto,
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
                  message: 'Platform actualizado',
                };
        }
}
