"use client";

import { useSelector } from "react-redux";

export default function DashboardPage() {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-white shadow-lg flex-col">
        <div className="px-6 py-5 border-b">
          <h2 className="text-xl font-bold text-orange-600">Food Admin</h2>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <SidebarItem label="Dashboard" active />
          <SidebarItem label="Orders" />
          <SidebarItem label="Menu Items" />
          <SidebarItem label="Categories" />
          <SidebarItem label="Customers" />
          <SidebarItem label="Reports" />
          <SidebarItem label="Settings" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Welcome back{user?.email ? `, ${user.email}` : ""}
            </p>
          </div>

          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition">
            + Add Menu
          </button>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Orders" value="1,245" />
          <StatCard title="Pending Orders" value="32" />
          <StatCard title="Total Revenue" value="₹ 98,400" />
          <StatCard title="Menu Items" value="84" />
        </section>

        {/* Recent Orders */}
        <section className="bg-white rounded-xl shadow-sm">
          <div className="px-5 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Orders
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-5 py-3 text-left">Order ID</th>
                  <th className="px-5 py-3 text-left">Customer</th>
                  <th className="px-5 py-3 text-left">Amount</th>
                  <th className="px-5 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <OrderRow
                  id="#1024"
                  customer="Rahul Sharma"
                  amount="₹450"
                  status="Pending"
                />
                <OrderRow
                  id="#1023"
                  customer="Amit Singh"
                  amount="₹980"
                  status="Completed"
                />
                <OrderRow
                  id="#1022"
                  customer="Neha Verma"
                  amount="₹320"
                  status="Cancelled"
                />
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ------------------ Components ------------------ */

function SidebarItem({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer
        ${
          active
            ? "bg-orange-100 text-orange-600"
            : "text-gray-600 hover:bg-gray-100"
        }`}
    >
      {label}
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-xl font-bold text-gray-900 mt-1">
        {value}
      </h3>
    </div>
  );
}

function OrderRow({
  id,
  customer,
  amount,
  status,
}: {
  id: string;
  customer: string;
  amount: string;
  status: "Pending" | "Completed" | "Cancelled";
}) {
  const statusColor =
    status === "Completed"
      ? "text-green-600"
      : status === "Pending"
      ? "text-orange-500"
      : "text-red-500";

  return (
    <tr className="border-t">
      <td className="px-5 py-3">{id}</td>
      <td className="px-5 py-3">{customer}</td>
      <td className="px-5 py-3">{amount}</td>
      <td className={`px-5 py-3 font-medium ${statusColor}`}>
        {status}
      </td>
    </tr>
  );
}
