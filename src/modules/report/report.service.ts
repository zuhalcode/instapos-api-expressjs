//#region-imports

import reportRepository from "./report.repository";
import { SalesReportQueryDTO } from "./report.schema";
import { SalesReportResponse } from "./report.types";

//#endregion

export default {
  async getSalesReport(
    params: SalesReportQueryDTO,
  ): Promise<SalesReportResponse> {
    return reportRepository.getSalesReport(params);
  },
};
