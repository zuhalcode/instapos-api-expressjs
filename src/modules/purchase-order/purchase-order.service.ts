//#region-imports

import purchaseOrderItemRepository from "./purchase-order-item.repository";
import purchaseOrderRepository from "./purchase-order.repository";
import {
  CreatePurchaseOrderDTO,
  CreatePurchaseOrderItemDTO,
  UpdatePurchaseOrderDTO,
  UpdatePurchaseOrderItemDTO,
} from "./purchase-order.schema";
import {
  PurchaseOrderInsert,
  PurchaseOrderItemInsert,
  PurchaseOrderItemRow,
  PurchaseOrderItemUpdate,
  PurchaseOrderRow,
} from "./purchase-order.types";

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

  async createItem(
    purchaseOrderId: PurchaseOrderRow["id"],
    dto: CreatePurchaseOrderItemDTO,
  ): Promise<PurchaseOrderItemRow> {
    const payload: PurchaseOrderItemInsert = {
      product_id: dto.product_id,
      purchase_order_id: purchaseOrderId,
      quantity: dto.quantity,
      unit_price: dto.unit_price,
    };

    return purchaseOrderItemRepository.create(purchaseOrderId, payload);
  },

  async updateItem(
    purchaseOrderId: PurchaseOrderRow["id"],
    itemId: PurchaseOrderItemRow["id"],
    dto: UpdatePurchaseOrderItemDTO,
  ): Promise<PurchaseOrderItemRow> {
    const payload: PurchaseOrderItemUpdate = {};

    if (dto.quantity !== undefined) payload.quantity = dto.quantity;

    if (dto.unit_price !== undefined) payload.unit_price = dto.unit_price;

    return purchaseOrderItemRepository.update(purchaseOrderId, itemId, payload);
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
