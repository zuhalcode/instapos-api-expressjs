//#region-imports

import productRepository from "./supplier.repository";
import { CreateSupplierDTO, UpdateSupplierDTO } from "./supplier.schema";
import { SupplierInsert, SupplierRow } from "./supplier.types";

//#endregion

export default {
  async findAll(): Promise<SupplierRow[]> {
    return productRepository.findAll();
  },

  async findOne(id: string): Promise<SupplierRow> {
    return productRepository.findOne(id);
  },

  async create(dto: CreateSupplierDTO): Promise<SupplierRow> {
    const payload: SupplierInsert = {
      name: dto.name,
      address: dto.address,
      phone_number: dto.phone_number,
    };

    return productRepository.create(payload);
  },

  async update(id: string, dto: UpdateSupplierDTO): Promise<SupplierRow> {
    return productRepository.update(id, dto);
  },
};
