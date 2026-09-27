//#region-imports

import { Response } from "express";
import { IReqUser } from "../../utils/interfaces";
import response from "../../utils/response";

import saleService from "./sale.service";
import { createSaleSchema } from "./sale.schema";
import { idSchema } from "../../shared";

//#endregion

export default {
  async findAll(_: IReqUser, res: Response): Promise<void> {
    try {
      const message: string = "Data Retrieved Successfully";
      const sales = await saleService.findAll();

      return response.success(res, sales, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async findOne(req: IReqUser, res: Response): Promise<void> {
    try {
      const { id } = idSchema.parse(req.params);
      const message: string = "Data Retrieved Successfully";

      const sale = await saleService.findOne(id);

      return response.success(res, sale, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async create(req: IReqUser, res: Response): Promise<void> {
    try {
      const { id: userId } = idSchema.parse(req.param);
      const dto = createSaleSchema.parse(req.body);
      const message: string = "Sale created successfully";

      const user = await saleService.create(userId, dto);

      return response.success(res, user, message, 201);
    } catch (error) {
      return response.error(res, error);
    }
  },
};
