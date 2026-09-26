//#region-imports

import { Response } from "express";
import { IReqUser } from "../../utils/interfaces";
import response from "../../utils/response";
import { idSchema } from "../../shared";
import purchaseOrderService from "./purchase-order.service";
import {
  createPurchaseOrderSchema,
  updatePurchaseOrderSchema,
} from "./purchase-order.schema";

//#endregion

export default {
  async findAll(_: IReqUser, res: Response): Promise<void> {
    try {
      const message: string = "Data Retrieved Successfully";
      const suppliers = await purchaseOrderService.findAll();

      return response.success(res, suppliers, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async findOne(req: IReqUser, res: Response): Promise<void> {
    try {
      const { id } = idSchema.parse(req.params);
      const message: string = "Data Retrieved Successfully";

      const supplier = await purchaseOrderService.findOne(id);

      return response.success(res, supplier, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async create(req: IReqUser, res: Response): Promise<void> {
    try {
      const dto = createPurchaseOrderSchema.parse(req.body);
      const message: string = "Supplier created successfully";

      const supplier = await purchaseOrderService.create(dto);

      return response.success(res, supplier, message, 201);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async update(req: IReqUser, res: Response): Promise<void> {
    try {
      const { id } = idSchema.parse(req.params);
      const dto = updatePurchaseOrderSchema.parse(req.body);
      const message: string = "Supplier updated successfully";

      const supplier = await purchaseOrderService.update(id, dto);

      return response.success(res, supplier, message, 201);
    } catch (error) {
      return response.error(res, error);
    }
  },
};
