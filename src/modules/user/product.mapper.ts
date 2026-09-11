import { ProductResponseDTO, ProductRow } from "./user.types";

const productMapper = {
  toProductResponseDTO(product: ProductRow): ProductResponseDTO {
    return {
      id: product.id,
      code: product.code,
      karat: product.karat,
      name: product.name,
      description: product.description,
      weight: product.weight,
      status: product.status,
      created_at: product.created_at,
    };
  },
};

export default productMapper;
