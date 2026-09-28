import { SaleWithDetails, SaleWithRelations } from "./sale.types";

export const mapSaleWithDetails = (
  sale: SaleWithRelations,
): SaleWithDetails => {
  const { cashier, customer, items, payments, ...saleData } = sale;

  return {
    ...saleData,

    cashier_name: cashier?.name ?? null,
    customer_name: customer?.name ?? null,

    items: items.map((item) => {
      return {
        product_name: item.product?.name ?? null,
        unit_price: item.unit_price,
        quantity: item.quantity,
        subtotal: item.subtotal,
      };
    }),
    payment: payments[0]
      ? {
          amount: payments[0].amount,
          method: payments[0].method,
        }
      : null,
  };
};
