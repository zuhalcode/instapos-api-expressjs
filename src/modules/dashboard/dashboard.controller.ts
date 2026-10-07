//#region-imports

import { Response } from "express";
import { IReqUser } from "../../utils/interfaces";
import response from "../../utils/response";
import dashboardService from "./dashboard.service";
import { dashboardStatsQuerySchema } from "./dashboard.schema";

//#endregion

export default {
  async getStats(req: IReqUser, res: Response): Promise<void> {
    try {
      const query = dashboardStatsQuerySchema.parse(req.query);
      const stats = await dashboardService.getStats(query);
      const message: string = "Data Retrieved Successfully";

      return response.success(res, stats, message);
    } catch (error) {
      return response.error(res, error);
    }
  },
};
