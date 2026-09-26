//#region-imports

import { Response } from "express";
import { IReqUser } from "../../utils/interfaces";
import response from "../../utils/response";
import categoryService from "./category.service";
import { createCategorySchema, updateCategorySchema } from "./category.schema";
import { idSchema } from "../../shared";

//#endregion

export default {
  async findAll(_: IReqUser, res: Response): Promise<void> {
    try {
      const message: string = "Data Retrieved Successfully";
      const categories = await categoryService.findAll();

      return response.success(res, categories, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async findOne(req: IReqUser, res: Response): Promise<void> {
    try {
      const { id } = idSchema.parse(req.params);
      const message: string = "Data Retrieved Successfully";

      const category = await categoryService.findOne(id);

      return response.success(res, category, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async create(req: IReqUser, res: Response): Promise<void> {
    try {
      const dto = createCategorySchema.parse(req.body);
      const message: string = "Category created successfully";

      const user = await categoryService.create(dto);

      return response.success(res, user, message, 201);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async update(req: IReqUser, res: Response): Promise<void> {
    try {
      const { id } = idSchema.parse(req.params);
      const dto = updateCategorySchema.parse(req.body);
      const message: string = "User updated successfully";

      const category = await categoryService.update(id, dto);

      return response.success(res, category, message, 201);
    } catch (error) {
      return response.error(res, error);
    }
  },
};
