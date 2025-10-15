import { Category } from "src/core/entities/category/category.entity";

export interface CategoryRepository {
  findById(uuid: string): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  findAllActive(): Promise<Category[]>;
  save(category: Category): Promise<Category>;
  update(uuid: string, category: Partial<Category>): Promise<Category>;
  delete(uuid: string): Promise<Category>;
}