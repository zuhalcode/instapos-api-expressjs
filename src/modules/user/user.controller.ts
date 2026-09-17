//#region-imports

import { Response } from "express";
import { IReqUser } from "../../utils/interfaces";
import response from "../../utils/response";
import userService from "./user.service";
import { createAuthUserSchema, userIdSchema } from "./user.schema";

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
      const { id } = userIdSchema.parse(req.params);
      const message: string = "Data Retrieved Successfully";

      const user = await userService.findOne(id);

      return response.success(res, user, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async createAuthUser(req: IReqUser, res: Response): Promise<void> {
    try {
      const dto = createAuthUserSchema.parse(req.body);
      const message: string = "Authenticated user created successfully";

      const user = await userService.createAuthUser(dto);

      return response.success(res, user, message);
    } catch (error) {
      return response.error(res, error);
    }
  },
};
