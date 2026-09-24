//#region-imports

import { Response } from "express";
import { IReqUser } from "../../utils/interfaces";
import response from "../../utils/response";
import {
  createSaleItemSchema,
  saleItemIdSchema,
  updateSaleItemSchema,
} from "./sale-item.schema";
import saleItemService from "./sale-item.service";

//#endregion

export default {
  async findAll(_: IReqUser, res: Response): Promise<void> {
    try {
      const message: string = "Data Retrieved Successfully";
      const users = await saleItemService.findAll();

      return response.success(res, users, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async findOne(req: IReqUser, res: Response): Promise<void> {
    try {
      const { id } = saleItemIdSchema.parse(req.params);
      const message: string = "Data Retrieved Successfully";

      const user = await saleItemService.findOne(id);

      return response.success(res, user, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async create(req: IReqUser, res: Response): Promise<void> {
    try {
      const dto = createSaleItemSchema.parse(req.body);
      const message: string = "Sale Item created successfully";

      const user = await saleItemService.create(dto);

      return response.success(res, user, message, 201);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async update(req: IReqUser, res: Response): Promise<void> {
    try {
      const { id } = saleItemIdSchema.parse(req.params);
      const dto = updateSaleItemSchema.parse(req.body);
      const message: string = "User updated successfully";

      const user = await saleItemService.update(id, dto);

      return response.success(res, user, message, 201);
    } catch (error) {
      return response.error(res, error);
    }
  },
};
