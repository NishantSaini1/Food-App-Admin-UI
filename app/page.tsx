"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import StatCard from "@/components/ui/StatCard";

type OrderStatus = "Pending" | "Completed" | "Cancelled";

type RecentOrder = {
  id: string;
  customer: string;
  amount: number;
  status: OrderStatus;
};

// ------- Static dashboard data -------

const STATIC_DASHBOARD = {
  totalOrders: 1245,
  pendingOrders: 32,
  totalRevenue: 98400,
  menuItems: 84,
  recentOrders: [
    {
      id: "#1024",
      customer: "Rahul Sharma",
      amount: 450,
      status: "Pending" as OrderStatus,
    },
    {
      id: "#1023",
      customer: "Amit Singh",
      amount: 980,
      status: "Completed" as OrderStatus,
    },
    {
      id: "#1022",
      customer: "Neha Verma",
      amount: 320,
      status: "Cancelled" as OrderStatus,
    },
  ] satisfies RecentOrder[],
};

export default function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 px-6 py-5 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-white">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/80 mb-1">
            Admin overview
          </p>
          <h1 className="text-2xl font-semibold leading-tight">Dashboard</h1>
          <p className="text-sm text-white/90 mt-1">
            Welcome back{user?.email ? `, ${user.email}` : ""}. Here&apos;s
            what&apos;s happening with your restaurant today.
          </p>
        </div>
        <div className="flex items-center gap-3 mt-2 sm:mt-0">
          <div className="hidden sm:flex flex-col text-xs text-white/80">
            <span>Today&apos;s summary</span>
            <span className="font-medium text-white">
              {STATIC_DASHBOARD.totalOrders} orders • ₹
              {STATIC_DASHBOARD.totalRevenue}
            </span>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur hover:bg-white/20 transition">
            <span>+ Add menu item</span>
          </button>
        </div>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Orders" value={STATIC_DASHBOARD.totalOrders} />
        <StatCard title="Pending Orders" value={STATIC_DASHBOARD.pendingOrders} />
        <StatCard
          title="Total Revenue"
          value={`₹ ${STATIC_DASHBOARD.totalRevenue}`}
        />
        <StatCard title="Menu Items" value={STATIC_DASHBOARD.menuItems} />
      </section>

      {/* Recent Orders */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Orders
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              A quick look at the latest activity in your restaurant.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
            {STATIC_DASHBOARD.recentOrders.length} latest orders
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                  Order ID
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                  Customer
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                  Amount
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {STATIC_DASHBOARD.recentOrders.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function OrderRow({ order }: { order: RecentOrder }) {
  const statusStyles =
    order.status === "Completed"
      ? "bg-green-50 text-green-700 border border-green-100"
      : order.status === "Pending"
      ? "bg-amber-50 text-amber-700 border border-amber-100"
      : "bg-red-50 text-red-700 border border-red-100";

  return (
    <tr className="border-t border-gray-100 hover:bg-gray-50/60 transition-colors">
      <td className="px-5 py-3 text-gray-900 font-medium">{order.id}</td>
      <td className="px-5 py-3 text-gray-700">{order.customer}</td>
      <td className="px-5 py-3 text-gray-900 font-medium">
        ₹{order.amount}
      </td>
      <td className="px-5 py-3">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles}`}
        >
          {order.status}
        </span>
      </td>
    </tr>
  );
}
