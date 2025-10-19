import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { createvideoOnDemandDto, updatevideoOnDemandDto } from 'src/application/dto/videoOnDemand';
import * as useCase from 'src/application/uses-cases/videoOnDemand/index';
import { ParseObjectIdPipe } from 'src/shared/pipes/parse-object-id.pipe';


@Controller('video-on-demand')
export class VideoOnDemandController {

    constructor(
                private createUseCase: useCase.CreateVODUseCase,
                private getAllCase: useCase.GetAllVODUseCase,
                private getOneCase: useCase.GetOneVODUseCase,
                private deleteCase: useCase.DeleteVODUseCase,
                private updateCase: useCase.UpdateVODUseCase,
            ){}
        
            @Post()
            async create(@Body() dto: createvideoOnDemandDto ){
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
                        message: 'VOD creado.'
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
                  message: 'VOD obtenidos',
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
                      message: 'VOD obtenido',
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
                  message: 'VOD eliminado.',
                };
            }
        
            @Patch(':id')
            async update(@Param('id', ParseObjectIdPipe) id:string, @Body() updateVODDto: updatevideoOnDemandDto){
                    const result = await this.updateCase.execute(
                      id,
                      updateVODDto,
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
                      message: 'VOD actualizado',
                    };
            }
    
}
