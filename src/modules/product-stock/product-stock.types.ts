import { Database } from "../../types/database.types";
import { ProductRow } from "../product/product.types";

type ProductStockRow = Database["public"]["Tables"]["product_stocks"]["Row"];
type ProductStockInsert =
  Database["public"]["Tables"]["product_stocks"]["Insert"];
type ProductStockUpdate =
  Database["public"]["Tables"]["product_stocks"]["Update"];

type ProductStockResponse = ProductStockRow & {
  product: ProductRow;
};

export type {
  ProductStockRow,
  ProductStockInsert,
  ProductStockUpdate,
  ProductStockResponse,
};
