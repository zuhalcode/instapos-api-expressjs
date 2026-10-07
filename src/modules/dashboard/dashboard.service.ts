//#region-imports

import { supabase } from "../../libs/supabase";
import { DashboardStats, DashboardStatsQuery } from "./dashboard.schema";

//#endregion

export default {
  async getStats(params: DashboardStatsQuery): Promise<DashboardStats> {
    const { data, error } = await supabase.rpc("get_dashboard_stats", {
      p_from: params.from,
      p_to: params.to,
    });

    if (error) {
      console.error("[dashboard.service] getDashboardStats:", error);
      throw error;
    }

    return data as DashboardStats;
  },
};
