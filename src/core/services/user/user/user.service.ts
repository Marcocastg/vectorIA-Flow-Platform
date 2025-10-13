import { HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { createUserDto, updateUserDto } from 'src/application/dto/user';
import { USER_REPOSITORY } from 'src/core/constants/constants';
import { User } from 'src/core/entities/user/user.entity';
import type { UserRepository } from 'src/core/repositories/user/user.repository';
import { ValidatorService } from 'src/shared/application/validation/validator.service';
import { BussinesRuleException } from 'src/shared/domain/exceptions/business-rule.exception';


@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY)
        private repository: UserRepository,
        private readonly validator: ValidatorService,
      ) {}

      async crearUser(dto: createUserDto): Promise<User> {
          await this.validator.validate(dto, createUserDto);
      
          const existe = await this.repository.findByEmail(dto.email);
          if (existe) {
            throw new BussinesRuleException(
              'The user already exists.',
              HttpStatus.BAD_REQUEST,
              {
                firstName: dto.firstName,
                lastName: dto.lastName,
                codigoError: 'USER_ALREADY_EXISTS',
              },
            );
          }
      
          const user = new User(
            null,
            dto.firstName,
            dto.lastName,
            dto.password,
            dto.email,
            dto.companyName,
          );
      
          return this.repository.save(user);
        }
      
        async listarUser(): Promise<User[]> {
          return this.repository.findAllActive();
        }
      
        async obtenerUnUser(id: string): Promise<User> {
          const existe = await this.repository.findById(id);
      
          if (!existe) {
            throw new BussinesRuleException(
              'The user does not exist.',
              HttpStatus.NOT_FOUND,
              {
                id: id,
                codigoError: 'USER_NOT_FOUND',
              },
            );
          }
      
          return existe;
        }
      
        async actualizarUser(
          id: string,
          dto: updateUserDto,
        ): Promise<User> {
            const UserExists = await this.repository.findById(id);
            if (!UserExists) {
                throw new NotFoundException(`User with ID "${id}" not found`);
            }
          return this.repository.update(id, dto);
        }
      
        async eliminarUser(id: string): Promise<User> {
          const user = await this.obtenerUnUser(id);
            
          return this.repository.delete(id);
        }
}
