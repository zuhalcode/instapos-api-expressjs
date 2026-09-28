import { SaleWithDetails, SaleWithRelations } from "./sale.types";

export const mapSaleWithDetails = (
  sale: SaleWithRelations,
): SaleWithDetails => {
  const { cashier, customer, items, ...saleData } = sale;

  return {
    ...saleData,

    cashier_name: cashier?.name ?? null,
    customer_name: customer?.name ?? null,

    items: items.map((item) => {
      const { product, ...itemData } = item;

      return {
        ...itemData,
        product_name: product?.name ?? null,
      };
    }),
  };
};
