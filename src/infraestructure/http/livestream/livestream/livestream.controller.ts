import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { updateLivestreamDto } from 'src/application/dto/livestream';
import { createLivestreamDto } from 'src/application/dto/livestream/create-livestream.dto';
import * as useCase from 'src/application/uses-cases/livestream/index';
import { ParseObjectIdPipe } from 'src/shared/pipes/parse-object-id.pipe';


@Controller('livestream')
export class LivestreamController {

constructor(
            private createUseCase: useCase.CreateLivestreamUseCase,
            private getAllCase: useCase.GetAllLivestreamUseCase,
            private getOneCase: useCase.GetOneLivestreamUseCase,
            private deleteCase: useCase.DeleteLivestreamUseCase,
            private updateCase: useCase.UpdateLivestreamUseCase,
        ){}
    
        @Post()
        async create(@Body() dto: createLivestreamDto ){
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
                    message: 'Livestream creado.'
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
              message: 'Livestream obtenidos',
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
                  message: 'Livestream obtenido',
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
              message: 'Livestream eliminado.',
            };
        }
    
        @Patch(':id')
        async update(@Param('id', ParseObjectIdPipe) id:string, @Body() updateLivestreamDto: updateLivestreamDto){
                const result = await this.updateCase.execute(
                  id,
                  updateLivestreamDto,
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
                  message: 'Livestream actualizado',
                };
        }
}
