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

  async findOne(id: PurchaseOrderRow["id"]): Promise<PurchaseOrderRow> {
    return purchaseOrderRepository.findOne(id);
  },

  async create(dto: CreatePurchaseOrderDTO): Promise<PurchaseOrderRow> {
    const payload: PurchaseOrderInsert = {
      supplier_id: dto.supplier_id,
    };

    return purchaseOrderRepository.create(payload);
  },

  async update(
    id: PurchaseOrderRow["id"],
    dto: UpdatePurchaseOrderDTO,
  ): Promise<PurchaseOrderRow> {
    return purchaseOrderRepository.update(id, dto);
  },

  async complete(id: PurchaseOrderRow["id"]): Promise<PurchaseOrderRow> {
    return purchaseOrderRepository.complete(id);
  },
  async cancel(id: PurchaseOrderRow["id"]): Promise<PurchaseOrderRow> {
    return purchaseOrderRepository.cancel(id);
  },
};
