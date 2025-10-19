import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { updateUserDto } from 'src/application/dto/user';
import { createUserDto } from 'src/application/dto/user/create-user.dto';
import * as useCase from 'src/application/uses-cases/user/index';
import { ParseObjectIdPipe } from 'src/shared/pipes/parse-object-id.pipe';


@Controller('user')
export class UserController {
    constructor(
            private createUseCase: useCase.CreateUserUseCase,
            private getAllCase: useCase.GetAllUserUseCase,
            private getOneCase: useCase.GetOneUserUseCase,
            private deleteCase: useCase.DeleteUserUseCase,
            private updateCase: useCase.UpdateUserUseCase,
        ){}
    
        @Post()
        async create(@Body() dto: createUserDto ){
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
                    message: 'User creado.'
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
              message: 'User obtenidos',
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
                  message: 'User obtenido',
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
              message: 'User eliminado.',
            };
        }
    
        @Patch(':id')
        async update(@Param('id', ParseObjectIdPipe) id:string, @Body() updateUserDto: updateUserDto){
                const result = await this.updateCase.execute(
                  id,
                  updateUserDto,
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
                  message: 'User actualizado',
                };
        }
}
