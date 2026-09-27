//#region-imports

import saleRepository from "./sale.repository";
import { CreateSaleDTO } from "./sale.schema";
import { CreateSalePayload, SaleInsert, SaleRow } from "./sale.types";
//#endregion

export default {
  async findAll(): Promise<SaleRow[]> {
    return saleRepository.findAll();
  },

  async findOne(id: string): Promise<SaleRow> {
    return saleRepository.findOne(id);
  },

  async create(userId: string, dto: CreateSaleDTO): Promise<SaleRow> {
    const payload: CreateSalePayload = {
      cashier_id: userId,
      ...(dto.customer_id ? { customer_id: dto.customer_id } : {}),
      discount: dto.discount,
      items: dto.items,
      payments: dto.payments,
    };

    return saleRepository.create(payload);
  },
};
