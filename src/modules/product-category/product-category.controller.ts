//#region-imports

import { Response } from "express";
import { IReqUser } from "../../utils/interfaces";
import response from "../../utils/response";
import productCategoryService from "./product-category.service";

//#endregion

export default {
  async findAll(req: IReqUser, res: Response): Promise<void> {
    try {
      const { user } = req;

      if (!user) return response.unauthorized(res, "Unauthorized");

      const message: string = "Product Category Retrieved Successfully";
      const products = await productCategoryService.findAll();

      return response.success(res, products, message);
    } catch (error) {
      return response.error(res, error);
    }
  },
};
