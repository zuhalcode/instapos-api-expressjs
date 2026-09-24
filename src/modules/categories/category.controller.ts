//#region-imports

import { Response } from "express";
import { IReqUser } from "../../utils/interfaces";
import response from "../../utils/response";
import categoryService from "./category.service";

import {
  createProductSchema,
  productIdSchema,
  updateProductSchema,
} from "./category.schema";

//#endregion

export default {
  async findAll(_: IReqUser, res: Response): Promise<void> {
    try {
      const message: string = "Data Retrieved Successfully";
      const users = await categoryService.findAll();

      return response.success(res, users, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async findOne(req: IReqUser, res: Response): Promise<void> {
    try {
      const { id } = productIdSchema.parse(req.params);
      const message: string = "Data Retrieved Successfully";

      const user = await categoryService.findOne(id);

      return response.success(res, user, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async create(req: IReqUser, res: Response): Promise<void> {
    try {
      const dto = createProductSchema.parse(req.body);
      const message: string = "Category created successfully";

      const user = await categoryService.create(dto);

      return response.success(res, user, message, 201);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async update(req: IReqUser, res: Response): Promise<void> {
    try {
      const { id } = productIdSchema.parse(req.params);
      const dto = updateProductSchema.parse(req.body);
      const message: string = "User updated successfully";

      const user = await categoryService.update(id, dto);

      return response.success(res, user, message, 201);
    } catch (error) {
      return response.error(res, error);
    }
  },
};
