//#region-imports

import {
  mapProduct,
  mapProductsWithSuppliers,
  mapProductWithSuppliers,
} from "./product.mapper";
import productRepository from "./product.repository";
import { CreateProductDTO, UpdateProductDTO } from "./product.schema";
import {
  ProductInsert,
  ProductResponse,
  ProductRow,
  ProductWithSuppliers,
} from "./product.types";

//#endregion

export default {
  async findAll(): Promise<ProductResponse[]> {
    const products = await productRepository.findAll();
    const result = products.map(mapProduct);

    const debugProduct = result.find(
      (product) => product.id === "d62c01aa-65bc-4307-8cf2-a0c40d9df438",
    );

    console.log("[PRODUCT SERVICE DEBUG]", {
      product_id: debugProduct?.id,
      supplier_id: debugProduct?.supplier?.id ?? null,
      supplier_name: debugProduct?.supplier?.name ?? null,
    });

    return result;
  },

  async findOne(id: ProductRow["id"]): Promise<ProductResponse | null> {
    const product = await productRepository.findOne(id);

    if (!product) {
      return null;
    }

    return mapProduct(product);
  },

  async create(dto: CreateProductDTO): Promise<ProductRow> {
    const payload: ProductInsert = {
      category_id: dto.category_id,
      name: dto.name,
      price: dto.price,
      barcode: dto.barcode,
    };

    return productRepository.create(payload);
  },

  async update(id: string, dto: UpdateProductDTO): Promise<ProductRow> {
    return productRepository.update(id, dto);
  },
};
