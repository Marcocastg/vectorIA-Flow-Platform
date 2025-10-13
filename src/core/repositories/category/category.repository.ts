import { Category } from "src/core/entities/category/category.entity";

export interface CategoryRepository {
  findById(id: string): Promise<Category | null>;
  findByName(nombre: string): Promise<Category | null>;
  findAllActive(): Promise<Category[]>;
  save(category: Category): Promise<Category>;
  update(id: string, category: Partial<Category>): Promise<Category>;
  delete(id: string): Promise<Category>;
}