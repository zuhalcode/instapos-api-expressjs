import { Database } from "../../types/database";

type ProductCategoryRow =
  Database["public"]["Tables"]["product_categories"]["Row"];

interface ProductCategoryDTO {
  code: string;
  last_number: number;
  name: string | null;
}

export { ProductCategoryRow };
export type { ProductCategoryDTO };
