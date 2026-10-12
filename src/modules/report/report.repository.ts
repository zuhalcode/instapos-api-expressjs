import { supabase } from "../../libs/supabase";
import { TABLES } from "../../shared";
import { SalesReportQueryDTO } from "./report.schema";
import {
  CashierPerformance,
  DailySalesTrend,
  PaymentMethodBreakdown,
  SalesReportResponse,
} from "./report.types";

const table = TABLES.SALES;

export default {
  async getSalesReport(
    params: SalesReportQueryDTO,
  ): Promise<SalesReportResponse> {
    const { from, to, cashier_id } = params;

    const fromIso = `${from}T00:00:00.000Z`;
    const toIso = `${to}T00:00:00.000Z`;

    let query = supabase
      .from(table)
      .select(
        `
        id,
        invoice_number,
        cashier_id,
        customer_id,
        subtotal,
        discount,
        total,
        status,
        created_at,
        cashier:users!sales_cashier_id_fkey (
          name
        ),
        items:sale_items (
          quantity,
          subtotal
        ),
        payments:payments (
          method,
          amount
        )
      `,
      )
      .eq("status", "completed")
      .gte("created_at", fromIso)
      .lt("created_at", toIso)
      .order("created_at", { ascending: true });

    if (cashier_id) {
      query = query.eq("cashier_id", cashier_id);
    }

    const { data: sales, error } = await query;

    if (error) throw error;

    let grossSales = 0;
    let totalDiscounts = 0;
    let netSales = 0;
    let itemsSold = 0;

    const paymentMap = new Map<
      string,
      { transactions: number; amount: number }
    >();
    const cashierMap = new Map<
      string,
      { name: string; transactions: number; net_sales: number }
    >();
    const dailyMap = new Map<
      string,
      { transactions: number; gross_sales: number; net_sales: number }
    >();

    for (const sale of sales || []) {
      const saleSubtotal = Number(sale.subtotal) || 0;
      const saleDiscount = Number(sale.discount) || 0;
      const saleTotal = Number(sale.total) || 0;

      grossSales += saleSubtotal;
      totalDiscounts += saleDiscount;
      netSales += saleTotal;

      for (const item of sale.items || []) {
        itemsSold += Number(item.quantity) || 0;
      }

      for (const payment of sale.payments || []) {
        const method = payment.method;
        const amount = Number(payment.amount) || 0;
        const existing = paymentMap.get(method) || {
          transactions: 0,
          amount: 0,
        };
        existing.transactions += 1;
        existing.amount += amount;
        paymentMap.set(method, existing);
      }

      const cashierName = sale.cashier?.name ?? "Unknown";
      const existingCashier = cashierMap.get(sale.cashier_id) || {
        name: cashierName,
        transactions: 0,
        net_sales: 0,
      };
      existingCashier.transactions += 1;
      existingCashier.net_sales += saleTotal;
      cashierMap.set(sale.cashier_id, existingCashier);

      const dateStr = new Date(sale.created_at).toLocaleDateString("en-CA", {
        timeZone: "Asia/Jakarta",
      });
      const existingDaily = dailyMap.get(dateStr) || {
        transactions: 0,
        gross_sales: 0,
        net_sales: 0,
      };
      existingDaily.transactions += 1;
      existingDaily.gross_sales += saleSubtotal;
      existingDaily.net_sales += saleTotal;
      dailyMap.set(dateStr, existingDaily);
    }

    const transactionCount = sales?.length ?? 0;
    const avgTransactionValue =
      transactionCount > 0
        ? Math.round((netSales / transactionCount) * 100) / 100
        : 0;

    let totalPaymentAmount = 0;
    paymentMap.forEach((val) => {
      totalPaymentAmount += val.amount;
    });

    const paymentBreakdown: PaymentMethodBreakdown[] = Array.from(
      paymentMap.entries(),
    ).map(([method, val]) => ({
      method,
      transactions: val.transactions,
      amount: Math.round(val.amount * 100) / 100,
      percentage:
        totalPaymentAmount > 0
          ? Math.round((val.amount / totalPaymentAmount) * 10000) / 100
          : 0,
    }));

    const cashiers: CashierPerformance[] = Array.from(
      cashierMap.entries(),
    ).map(([id, val]) => ({
      cashier_id: id,
      cashier_name: val.name,
      transactions: val.transactions,
      net_sales: Math.round(val.net_sales * 100) / 100,
    }));

    const dailyTrend: DailySalesTrend[] = Array.from(dailyMap.entries()).map(
      ([date, val]) => ({
        date,
        transactions: val.transactions,
        gross_sales: Math.round(val.gross_sales * 100) / 100,
        net_sales: Math.round(val.net_sales * 100) / 100,
      }),
    );

    return {
      period: { from, to },
      summary: {
        gross_sales: Math.round(grossSales * 100) / 100,
        total_discounts: Math.round(totalDiscounts * 100) / 100,
        net_sales: Math.round(netSales * 100) / 100,
        transaction_count: transactionCount,
        average_transaction_value: avgTransactionValue,
        items_sold: itemsSold,
      },
      payment_breakdown: paymentBreakdown,
      cashiers,
      daily_trend: dailyTrend,
    };
  },
};
