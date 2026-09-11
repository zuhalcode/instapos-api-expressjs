//#region-imports
import { UserRole } from "../../utils/interfaces";
import productMapper from "./product.mapper";
import productRepository from "./product.repository";
import {
  CreateProductDTO,
  ProductInsert,
  ProductResponseDTO,
  ProductUpdate,
  UpdateProductDTO,
} from "./product.types";
//#endregion

type ProductFindAllResponse = ProductResponseDTO[];

export default {
  async findAll(role: UserRole): Promise<ProductFindAllResponse> {
    const data = await productRepository.findAll();

    if (role === "staff") return data.map(productMapper.toProductResponseDTO);

    return data;
  },

  async create(dto: CreateProductDTO, userId: string): Promise<any> {
    const sequence = await productRepository.getNextSequenceNumber(
      dto.category_code,
    );

    const code = `${dto.category_code}${String(sequence).padStart(4, "0")}`;

    const payload: ProductInsert = {
      ...dto,
      code,
      weight: Number(dto.weight),
      created_by: userId,
    };

    const data = await productRepository.create(payload);

    return data;
  },

  async update(
    id: string,
    dto: UpdateProductDTO,
    userId: string,
  ): Promise<any> {
    const payload: ProductUpdate = {
      ...dto,
      updated_by: userId,
      updated_at: new Date().toISOString(),
    };

    const data = await productRepository.update(id, payload);

    return data;
  },

  async remove(id: string, userId: string): Promise<void> {
    await productRepository.remove(id, userId);
  },

  async restore(id: string): Promise<void> {
    await productRepository.restore(id);
  },

  async destroy(id: string): Promise<void> {
    await productRepository.destroy(id);
  },
};
