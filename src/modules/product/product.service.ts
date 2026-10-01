//#region-imports

import productRepository from "./product.repository";
import { CreateProductDTO, UpdateProductDTO } from "./product.schema";
import { ProductInsert, ProductResponse, ProductRow } from "./product.types";

//#endregion

export default {
  async findAll() {
    const products = await productRepository.findAll();

    return products;
  },

  async findOne(id: ProductRow["id"]) {},

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
