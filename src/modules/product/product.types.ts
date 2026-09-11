import { Database } from "../../types/database";
import * as Yup from "yup";
import { createProductSchema, updateProductSchema } from "./product.schema";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];
type ProductStatus = Database["public"]["Enums"]["product_status"];

type CreateProductDTO = Yup.InferType<typeof createProductSchema>;
type UpdateProductDTO = Yup.InferType<typeof updateProductSchema>;

interface ProductResponseDTO {
  id: string;
  code: string;
  karat: number;
  name: string | null;
  description: string | null;
  weight: number;
  status: ProductStatus;
  created_at: string;
}

export { ProductRow, ProductInsert, ProductUpdate, ProductStatus };
export type { ProductResponseDTO, CreateProductDTO, UpdateProductDTO };
