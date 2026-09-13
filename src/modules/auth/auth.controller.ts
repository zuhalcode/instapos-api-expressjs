import { Request, Response } from "express";
import authService from "./auth.service";
import response from "../../utils/response";
import { loginSchema } from "./auth.schema";

export default {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const data = await authService.login(email, password);

      response.success(res, data, "Login Successfully");
    } catch (error) {
      response.error(res, error);
    }
  },

  async logout(req: Request, res: Response): Promise<void> {
    /**
     #swagger.tags = ['Auth']
     #swagger.summary = 'Logout user'
     */

    try {
      await authService.logout();

      response.success(res, null, "Logout Successfully");
    } catch (error) {
      response.error(res, error);
    }
  },
};
