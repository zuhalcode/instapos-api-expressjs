//#region-imports

import productRepository from "./product-stock.repository";
import {
  CreateProductStockDTO,
  UpdateProductStockDTO,
} from "./product-stock.schema";

import { ProductStockRow, ProductStockInsert } from "./product-stock.types";
//#endregion

export default {
  async findAll(): Promise<ProductStockRow[]> {
    return productRepository.findAll();
  },

  async findOne(id: string): Promise<ProductStockRow> {
    return productRepository.findOne(id);
  },

  async create(dto: CreateProductStockDTO): Promise<ProductStockRow> {
    const payload: ProductStockInsert = {
      product_id: dto.productId,
      quantity: dto.quantity,
      location: dto.location,
    };

    return productRepository.create(payload);
  },

  async update(
    id: string,
    dto: UpdateProductStockDTO,
  ): Promise<ProductStockRow> {
    return productRepository.update(id, dto);
  },
};
