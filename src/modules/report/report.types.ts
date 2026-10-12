export type SalesReportPeriod = {
  from: string;
  to: string;
};

export type SalesReportSummary = {
  gross_sales: number;
  total_discounts: number;
  net_sales: number;
  transaction_count: number;
  average_transaction_value: number;
  items_sold: number;
};

export type PaymentMethodBreakdown = {
  method: string;
  transactions: number;
  amount: number;
  percentage: number;
};

export type DailySalesTrend = {
  date: string;
  transactions: number;
  gross_sales: number;
  net_sales: number;
};

export type CashierPerformance = {
  cashier_id: string;
  cashier_name: string;
  transactions: number;
  net_sales: number;
};

export type SalesReportResponse = {
  period: SalesReportPeriod;
  summary: SalesReportSummary;
  payment_breakdown: PaymentMethodBreakdown[];
  cashiers: CashierPerformance[];
  daily_trend: DailySalesTrend[];
};
