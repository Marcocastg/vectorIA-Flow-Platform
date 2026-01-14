import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ValidationError } from 'src/shared/domain/errors/validation.error';

@Injectable()
export class ValidatorService {
  async validate<T extends object>(
    dto: T,
    DtoClass: new () => T,
  ): Promise<void> {
    const instance = plainToInstance(DtoClass, dto);
    const errors = await validate(instance, {
      whitelist: true,
      forbidNonWhitelisted: false,
    });

    if (errors.length > 0) {
      console.log('🔍 DETALLE DE ERROR DE VALIDACIÓN:', JSON.stringify(errors, null, 2));
      const message = this.formatErrors(errors);
      throw new ValidationError(message);
    }
  }

  private formatErrors(errors: any[]): string {
    return errors
      .map((error) => {
        const constraints = Object.values(error.constraints || {});
        // Errores en niveles inferiores (anidados)
        if (error.children && error.children.length > 0) {
            const childErrors = this.formatErrors(error.children);
            return `${error.property} -> { ${childErrors} }`;
        }

        // Retornar mensaje
        if (constraints.length > 0) {
            return `${error.property}: ${constraints.join(', ')}`;
        }
        
        return `${error.property}: Error de estructura inválida`;
      })
      .join(' | ');
  }
}
