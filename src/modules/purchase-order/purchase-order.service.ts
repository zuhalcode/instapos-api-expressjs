//#region-imports

import purchaseOrderRepository from "./purchase-order.repository";
import {
  CreatePurchaseOrderDTO,
  UpdatePurchaseOrderDTO,
} from "./purchase-order.schema";
import { PurchaseOrderInsert, PurchaseOrderRow } from "./purchase-order.types";

//#endregion

export default {
  async findAll(): Promise<PurchaseOrderRow[]> {
    return purchaseOrderRepository.findAll();
  },

  async findOne(id: string): Promise<PurchaseOrderRow> {
    return purchaseOrderRepository.findOne(id);
  },

  async create(dto: CreatePurchaseOrderDTO): Promise<PurchaseOrderRow> {
    const payload: PurchaseOrderInsert = {
      supplier_id: dto.supplier_id,
    };

    return purchaseOrderRepository.create(payload);
  },

  async update(
    id: string,
    dto: UpdatePurchaseOrderDTO,
  ): Promise<PurchaseOrderRow> {
    return purchaseOrderRepository.update(id, dto);
  },
};
