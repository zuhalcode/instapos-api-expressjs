import {
  ProductCategoryDTO,
  ProductCategoryRow,
} from "./product-category.types";

const productCategoryMapper = {
  toProductCategoryResponseDTO(data: ProductCategoryRow): ProductCategoryDTO {
    return {
      code: data.code,
      name: data.name,
      last_number: data.last_number,
    };
  },
};

export default productCategoryMapper;
