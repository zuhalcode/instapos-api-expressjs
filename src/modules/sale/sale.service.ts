//#region-imports

import saleRepository from "./sale.repository";
import { CreateSaleDTO, UpdateSaleDTO } from "./sale.schema";
import { SaleInsert, SaleRow } from "./sale.types";
//#endregion

export default {
  async findAll(): Promise<SaleRow[]> {
    return saleRepository.findAll();
  },

  async findOne(id: string): Promise<SaleRow> {
    return saleRepository.findOne(id);
  },

  async create(userId: string, dto: CreateSaleDTO): Promise<SaleRow> {
    const payload: SaleInsert = {
      cashier_id: userId,
      invoice_number: dto.invoice_number,
      total: dto.total,
    };

    return saleRepository.create(payload);
  },

  async update(id: string, dto: UpdateSaleDTO): Promise<SaleRow> {
    return saleRepository.update(id, dto);
  },
};
