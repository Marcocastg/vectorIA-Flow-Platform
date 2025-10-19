import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { SharedModule } from 'src/shared/shared.module';
import { PrismaModule } from 'src/core/services/prisma/prisma.module';
import { CATEGORY_REPOSITORY } from 'src/core/constants/constants';
import { CategoryPrismaRepository } from 'src/infraestructure/persistence/category/category.prisma.repository';
import { CategoryService } from 'src/core/services/category/category/category.service';
import { CreateCategoryUseCase, DeleteCategoryUseCase, GetAllCategoryUseCase, GetOneCategoryUseCase, UpdateCategoryUseCase } from 'src/application/uses-cases/category';

@Module({
  imports:[SharedModule, PrismaModule],
      controllers: [CategoryController],
      providers:[{
          provide: CATEGORY_REPOSITORY,
          useClass: CategoryPrismaRepository,
      },
      CategoryService,
      CreateCategoryUseCase,
      GetAllCategoryUseCase,
      GetOneCategoryUseCase,
      DeleteCategoryUseCase,
      UpdateCategoryUseCase,
      ],
      exports:[CategoryService, CATEGORY_REPOSITORY],
})
export class CategoryModule {}
