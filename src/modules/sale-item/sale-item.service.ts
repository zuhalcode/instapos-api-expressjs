//#region-imports

import saleItemRepository from "./sale-item.repository";
import { CreateSaleItemDTO, UpdateSaleItemDTO } from "./sale-item.schema";
import { SaleItemInsert, SaleItemRow } from "./sale-item.types";
//#endregion

export default {
  async findAll(): Promise<SaleItemRow[]> {
    return saleItemRepository.findAll();
  },

  async findOne(id: string): Promise<SaleItemRow> {
    return saleItemRepository.findOne(id);
  },

  async create(dto: CreateSaleItemDTO): Promise<SaleItemRow> {
    const payload: SaleItemInsert = {
      sale_id: dto.sale_id,
      product_id: dto.product_id,
      quantity: dto.quantity,
      unit_price: dto.unit_price,
      subtotal: dto.subtotal,
    };

    return saleItemRepository.create(payload);
  },

  async update(id: string, dto: UpdateSaleItemDTO): Promise<SaleItemRow> {
    return saleItemRepository.update(id, dto);
  },
};
