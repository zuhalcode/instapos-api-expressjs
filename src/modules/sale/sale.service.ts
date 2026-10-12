//#region-imports

import { mapSaleWithDetails } from "./sale.mapper";
import saleRepository from "./sale.repository";
import { CreateSaleDTO, UpdateSaleDTO } from "./sale.schema";
import {
  CreateSalePayload,
  SaleRow,
  SaleWithDetails,
  UpdateSalePayload,
} from "./sale.types";
//#endregion

export default {
  async findAll(): Promise<SaleWithDetails[]> {
    const sales = await saleRepository.findAll();

    return sales.map(mapSaleWithDetails);
  },

  async findOne(id: string): Promise<SaleWithDetails> {
    const sale = await saleRepository.findOne(id);

    return mapSaleWithDetails(sale);
  },

  async create(userId: string, dto: CreateSaleDTO): Promise<SaleRow> {
    const payload: CreateSalePayload = {
      cashier_id: userId,
      ...(dto.customer_id ? { customer_id: dto.customer_id } : {}),
      items: dto.items,
      payments: dto.payments,
    };

    return saleRepository.create(payload);
  },

  async update(id: string, dto: UpdateSaleDTO): Promise<SaleWithDetails> {
    const payload: UpdateSalePayload = {
      updated_at: new Date().toISOString(),
    };

    if (dto.customer_id !== undefined) {
      payload.customer_id = dto.customer_id;
    }

    const sale = await saleRepository.update(id, payload);

    return mapSaleWithDetails(sale);
  },
};
