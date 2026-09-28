//#region-imports

import {
  mapProductsWithSuppliers,
  mapProductWithSuppliers,
} from "./product.mapper";
import productRepository from "./product.repository";
import { CreateProductDTO, UpdateProductDTO } from "./product.schema";
import {
  ProductInsert,
  ProductRow,
  ProductWithSuppliers,
} from "./product.types";

//#endregion

export default {
  async findAll(): Promise<ProductWithSuppliers[]> {
    const { products, items } = await productRepository.findAll();
    return mapProductsWithSuppliers(products, items);
  },

  async findOne(id: string): Promise<ProductWithSuppliers> {
    const { product, items } = await productRepository.findOne(id);

    return mapProductWithSuppliers(product, items);
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
