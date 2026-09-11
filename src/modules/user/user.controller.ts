//#region-imports

import { Response } from "express";
import { IReqUser } from "../../utils/interfaces";
import response from "../../utils/response";
import userService from "./user.service";

//#endregion

export default {
  async findAll(req: IReqUser, res: Response): Promise<void> {
    /**
     #swagger.tags = ['Auth']
     

     */
    try {
      const message: string = "Data Retrieved Successfully";
      const users = await userService.findAll();

      return response.success(res, users, message);
    } catch (error) {
      return response.error(res, error);
    }
  },
};
