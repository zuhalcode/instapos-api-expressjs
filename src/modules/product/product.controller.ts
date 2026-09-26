//#region-imports

import { Response } from "express";
import { IReqUser } from "../../utils/interfaces";
import response from "../../utils/response";
import userService from "./product.service";
import { createProductSchema, updateProductSchema } from "./product.schema";
import productService from "./product.service";
import { idSchema } from "../../shared";

//#endregion

export default {
  async findAll(_: IReqUser, res: Response): Promise<void> {
    try {
      const message: string = "Data Retrieved Successfully";
      const products = await productService.findAll();

      return response.success(res, products, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async findOne(req: IReqUser, res: Response): Promise<void> {
    try {
      const { id } = idSchema.parse(req.params);
      const message: string = "Data Retrieved Successfully";

      const product = await productService.findOne(id);

      return response.success(res, product, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async create(req: IReqUser, res: Response): Promise<void> {
    try {
      const dto = createProductSchema.parse(req.body);
      const message: string = "Product created successfully";

      const product = await productService.create(dto);

      return response.success(res, product, message, 201);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async update(req: IReqUser, res: Response): Promise<void> {
    try {
      const { id } = idSchema.parse(req.params);
      const dto = updateProductSchema.parse(req.body);
      const message: string = "Product updated successfully";

      const product = await productService.update(id, dto);

      return response.success(res, product, message, 201);
    } catch (error) {
      return response.error(res, error);
    }
  },
};
