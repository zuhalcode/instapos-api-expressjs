//#region-imports

import { Response } from "express";
import { IReqUser } from "../../utils/interfaces";
import response from "../../utils/response";
import reportService from "./report.service";
import { salesReportQuerySchema } from "./report.schema";

//#endregion

export default {
  async getSalesReport(req: IReqUser, res: Response): Promise<void> {
    try {
      const query = salesReportQuerySchema.parse(req.query);
      const report = await reportService.getSalesReport(query);
      const message: string = "Sales report retrieved successfully";

      return response.success(res, report, message);
    } catch (error) {
      return response.error(res, error);
    }
  },
};
