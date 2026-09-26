//#region-imports

import { Response } from "express";
import { IReqUser } from "../../utils/interfaces";
import response from "../../utils/response";
import supplierService from "./supplier.service";
import { idSchema } from "../../shared";
import { createSupplierSchema, updateSupplierSchema } from "./supplier.schema";

//#endregion

export default {
  async findAll(_: IReqUser, res: Response): Promise<void> {
    try {
      const message: string = "Data Retrieved Successfully";
      const suppliers = await supplierService.findAll();

      return response.success(res, suppliers, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async findOne(req: IReqUser, res: Response): Promise<void> {
    try {
      const { id } = idSchema.parse(req.params);
      const message: string = "Data Retrieved Successfully";

      const supplier = await supplierService.findOne(id);

      return response.success(res, supplier, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async create(req: IReqUser, res: Response): Promise<void> {
    try {
      const dto = createSupplierSchema.parse(req.body);
      const message: string = "Supplier created successfully";

      const supplier = await supplierService.create(dto);

      return response.success(res, supplier, message, 201);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async update(req: IReqUser, res: Response): Promise<void> {
    try {
      const { id } = idSchema.parse(req.params);
      const dto = updateSupplierSchema.parse(req.body);
      const message: string = "Supplier updated successfully";

      const supplier = await supplierService.update(id, dto);

      return response.success(res, supplier, message, 201);
    } catch (error) {
      return response.error(res, error);
    }
  },
};
