//#region-imports

import { Response } from "express";
import { IReqUser } from "../../utils/interfaces";
import response from "../../utils/response";
import userService from "./product-stock.service";

import {
  createProductStockSchema,
  productStockIdSchema,
  updateProductStockSchema,
} from "./product-stock.schema";
import productService from "./product-stock.service";
import productStockService from "./product-stock.service";

//#endregion

export default {
  async findAll(_: IReqUser, res: Response): Promise<void> {
    try {
      const message: string = "Data Retrieved Successfully";
      const users = await userService.findAll();

      return response.success(res, users, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async findOne(req: IReqUser, res: Response): Promise<void> {
    try {
      const { productId } = productStockIdSchema.parse(req.params);
      const message: string = "Data Retrieved Successfully";

      const user = await productStockService.findOne(productId);

      return response.success(res, user, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async create(req: IReqUser, res: Response): Promise<void> {
    try {
      const dto = createProductStockSchema.parse(req.body);
      const message: string = "Product created successfully";

      const user = await productService.create(dto);

      return response.success(res, user, message, 201);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async update(req: IReqUser, res: Response): Promise<void> {
    try {
      const { productId } = productStockIdSchema.parse(req.params);
      const dto = updateProductStockSchema.parse(req.body);
      const message: string = "User updated successfully";

      const user = await productService.update(productId, dto);

      return response.success(res, user, message, 201);
    } catch (error) {
      return response.error(res, error);
    }
  },
};
