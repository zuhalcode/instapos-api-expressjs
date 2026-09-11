//#region-imports

import { Response } from "express";
import { IReqUser } from "../../utils/interfaces";
import response from "../../utils/response";
import productService from "./product.service";
import {
  createProductSchema,
  updateProductSchema,
  uuidProductSchema,
} from "./product.schema";

//#endregion

export default {
  async findAll(req: IReqUser, res: Response): Promise<void> {
    try {
      const { user } = req;

      if (!user) return response.unauthorized(res, "Unauthorized");

      const role = user.role;
      const message: string = "Data Retrieved Successfully";
      const products = await productService.findAll(role);

      return response.success(res, products, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async create(req: IReqUser, res: Response): Promise<void> {
    try {
      const { body, user } = req;

      if (!user) return response.unauthorized(res, "Unauthorized");

      const userId = user.id;

      const dto = await createProductSchema.validate(body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const message: string = "Product Created Successfully";
      const product = await productService.create(dto, userId);

      return response.success(res, product, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async update(req: IReqUser, res: Response): Promise<void> {
    try {
      const { body, user, params } = req;

      if (!user) return response.unauthorized(res, "Unauthorized");

      const dto = await updateProductSchema.validate(body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const id = params.id;
      const userId = user.id;
      const message: string = "Product Updated Successfully";

      const asset = await productService.update(id, dto, userId);
      return response.success(res, asset, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Soft Delete
  async remove(req: IReqUser, res: Response): Promise<void> {
    try {
      const { params, user } = req;

      if (!user) return response.unauthorized(res, "Unauthorized");

      const { id } = await uuidProductSchema.validate(params, {
        abortEarly: false,
        stripUnknown: true,
      });

      const userId = user!.id;
      const message: string = "Product Deleted Successfully";

      await productService.remove(id, userId);

      return response.success(res, null, message);
    } catch (error) {
      return response.error(res, error);
    }
  },
};
