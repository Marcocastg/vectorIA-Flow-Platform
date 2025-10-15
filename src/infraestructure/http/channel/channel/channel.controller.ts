import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { updateChannelDto } from 'src/application/dto/channel';
import { createChannelDto } from 'src/application/dto/channel/create-channel.dto';
import * as useCase from 'src/application/uses-cases/channel/index';
import { ParseObjectIdPipe } from 'src/shared/pipes/parse-object-id.pipe';


@Controller('channel')
export class ChannelController {

    constructor(
                private createUseCase: useCase.CreateChannelUseCase,
                private getAllCase: useCase.GetAllChannelUseCase,
                private getOneCase: useCase.GetOneChannelUseCase,
                private deleteCase: useCase.DeleteChannelUseCase,
                private updateCase: useCase.UpdateChannelUseCase,
            ){}
        
            @Post()
            async create(@Body() dto: createChannelDto ){
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
                        message: 'Channel creado.'
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
                  message: 'Channel obtenidos',
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
                      message: 'Channel obtenido',
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
                  message: 'Channel eliminado.',
                };
            }
        
            @Patch(':id')
            async update(@Param('id', ParseObjectIdPipe) id:string, @Body() updateChannelDto: updateChannelDto){
                    const result = await this.updateCase.execute(
                      id,
                      updateChannelDto,
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
                      message: 'Channel actualizado',
                    };
            }
    
}
