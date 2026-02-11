"use client";

import { useState } from "react";
import OverviewCards from "@/components/reports/OverviewCards";
import SalesChart from "@/components/reports/SalesChart";
import OrderStatusChart from "@/components/reports/OrderStatusChart";
import DateRangeFilter from "@/components/reports/DateRangeFilter";
import TopItemsTable from "@/components/reports/TopItemsTable";

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-5 shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-white">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-1">
            Reports &amp; Insights
          </p>
          <h1 className="text-2xl font-semibold leading-tight">
            Performance Reports
          </h1>
          <p className="text-sm text-white/85 mt-1 max-w-xl">
            Analyze revenue, orders and item performance to make better
            decisions for your restaurant.
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2">
          <span className="text-[11px] uppercase tracking-wide text-white/70">
            Date range
          </span>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 backdrop-blur border border-white/10">
            <DateRangeFilter dateRange={dateRange} setDateRange={setDateRange} />
          </div>
        </div>
      </header>

      {/* Overview */}
      <OverviewCards />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <OrderStatusChart />
      </div>

      {/* Top items */}
      <TopItemsTable />
    </div>
  );
}
