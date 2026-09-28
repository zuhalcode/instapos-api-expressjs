import {
  ProductRow,
  ProductSupplierItem,
  ProductWithSuppliers,
} from "./product.types";

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function mapProductsWithSuppliers(
  products: ProductRow[],
  items: ProductSupplierItem[],
): ProductWithSuppliers[] {
  return products
    .map((product) => ({
      ...product,
      suppliers: items
        .filter((item) => item.product_id === product.id)
        .map((item) => item.purchase_orders?.suppliers)
        .filter(isDefined),
    }))
    .filter((product) => product.suppliers.length > 0);
}

export function mapProductWithSuppliers(
  product: ProductRow,
  items: ProductSupplierItem[],
): ProductWithSuppliers {
  return {
    ...product,
    suppliers: items
      .map((item) => item.purchase_orders?.suppliers)
      .filter(isDefined),
  };
}
