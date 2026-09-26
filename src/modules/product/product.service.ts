//#region-imports

import productRepository from "./product.repository";
import { CreateProductDTO, UpdateProductDTO } from "./product.schema";
import { ProductInsert, ProductRow } from "./product.types";

//#endregion

export default {
  async findAll(): Promise<ProductRow[]> {
    return productRepository.findAll();
  },

  async findOne(id: string): Promise<ProductRow> {
    return productRepository.findOne(id);
  },

  async create(dto: CreateProductDTO): Promise<ProductRow> {
    const payload: ProductInsert = {
      category_id: dto.category_id,
      name: dto.name,
      price: dto.price,
      barcode: dto.barcode,
    };

    return productRepository.create(payload);
  },

  async update(id: string, dto: UpdateProductDTO): Promise<ProductRow> {
    return productRepository.update(id, dto);
  },
};
