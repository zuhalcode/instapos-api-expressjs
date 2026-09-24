//#region-imports

import { Response } from "express";
import { IReqUser } from "../../utils/interfaces";
import response from "../../utils/response";
import saleService from "./payment.service";
import {
  createPaymentSchema,
  paymentIdSchema,
  saleIdSchema,
  updatePaymentSchema,
} from "./payment.schema";

//#endregion

export default {
  async findAll(_: IReqUser, res: Response): Promise<void> {
    try {
      const message: string = "Data Retrieved Successfully";
      const users = await saleService.findAll();

      return response.success(res, users, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async findOne(req: IReqUser, res: Response): Promise<void> {
    try {
      const { id } = paymentIdSchema.parse(req.params);
      const message: string = "Data Retrieved Successfully";

      const user = await saleService.findOne(id);

      return response.success(res, user, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async create(req: IReqUser, res: Response): Promise<void> {
    try {
      const { id: userId } = req.user!;
      const dto = createPaymentSchema.parse(req.body);
      const message: string = "Sale created successfully";

      const user = await saleService.create(dto);

      return response.success(res, user, message, 201);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async update(req: IReqUser, res: Response): Promise<void> {
    try {
      const { id } = paymentIdSchema.parse(req.params);
      const dto = updatePaymentSchema.parse(req.body);
      const message: string = "Sale updated successfully";

      // const user = await saleService.update(id, dto);

      return response.success(res, {}, message, 201);
    } catch (error) {
      return response.error(res, error);
    }
  },
};
