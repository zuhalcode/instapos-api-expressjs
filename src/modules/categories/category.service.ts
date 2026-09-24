//#region-imports

import categoryRepository from "./category.repository";
import productRepository from "./category.repository";
import { CreateProductDTO, UpdateProductDTO } from "./category.schema";
import { CategoryInsert, CategoryRow } from "./category.types";
//#endregion

export default {
  async findAll(): Promise<CategoryRow[]> {
    return categoryRepository.findAll();
  },

  async findOne(id: string): Promise<CategoryRow> {
    return categoryRepository.findOne(id);
  },

  async create(dto: CreateProductDTO): Promise<CategoryRow> {
    const payload: CategoryInsert = {
      name: dto.name,
    };

    return categoryRepository.create(payload);
  },

  async update(id: string, dto: UpdateProductDTO): Promise<CategoryRow> {
    return categoryRepository.update(id, dto);
  },
};
