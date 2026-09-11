//#region-imports

import productCategoryMapper from "./product-category.mapper";
import productCategoryRepository from "./product-category.repository";
import { ProductCategoryDTO } from "./product-category.types";

//#endregion

export default {
  async findAll(): Promise<ProductCategoryDTO[]> {
    const data = await productCategoryRepository.findAll();
    return data.map(productCategoryMapper.toProductCategoryResponseDTO);
  },
};
