//#region-imports

import { mapSaleWithDetails } from "./sale.mapper";
import saleRepository from "./sale.repository";
import { CreateSaleDTO } from "./sale.schema";
import { CreateSalePayload, SaleRow, SaleWithDetails } from "./sale.types";
//#endregion

export default {
  async findAll(): Promise<SaleWithDetails[]> {
    const sales = await saleRepository.findAll();

    return sales.map((sale) => {
      const { cashier, customer, ...saleData } = sale;

      return {
        ...saleData,

        cashier_name: cashier?.name ?? null,
        customer_name: customer?.name ?? null,

        items: sale.items.map((item) => {
          const { product, ...itemData } = item;

          return {
            ...itemData,
            product_name: product?.name ?? null,
          };
        }),
      };
    });
  },

  async findOne(id: string): Promise<SaleWithDetails> {
    const sale = await saleRepository.findOne(id);

    return mapSaleWithDetails(sale);
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
