//#region-imports

import productRepository from "./supplier.repository";
import { CreateSupplierDTO, UpdateSupplierDTO } from "./supplier.schema";
import { ProductInsert, ProductRow } from "./supplier.types";

//#endregion

export default {
  async findAll(): Promise<ProductRow[]> {
    return productRepository.findAll();
  },

  async findOne(id: string): Promise<ProductRow> {
    return productRepository.findOne(id);
  },

  async create(dto: CreateSupplierDTO): Promise<ProductRow> {
    const payload: ProductInsert = {
      category_id: dto.category_id,
      name: dto.name,
      price: dto.price,
      barcode: dto.barcode,
    };

    return productRepository.create(payload);
  },

  async update(id: string, dto: UpdateSupplierDTO): Promise<ProductRow> {
    return productRepository.update(id, dto);
  },
};
