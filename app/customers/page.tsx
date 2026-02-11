"use client";

import { useMemo, useState } from "react";
import AppTable, { Column } from "@/components/ui/AppTable";
import AppModal from "@/components/ui/AppModal";

type CustomerStatus = "active" | "blocked" | "guest";

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpend: number;
  status: CustomerStatus;
  lastOrderDate: string;
};

const CUSTOMERS: Customer[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    totalOrders: 34,
    totalSpend: 12450,
    status: "active",
    lastOrderDate: "2026-02-08",
  },
  {
    id: 2,
    name: "Neha Verma",
    email: "neha.verma@example.com",
    phone: "+91 98989 12345",
    totalOrders: 12,
    totalSpend: 4850,
    status: "guest",
    lastOrderDate: "2026-02-07",
  },
  {
    id: 3,
    name: "Amit Singh",
    email: "amit.singh@example.com",
    phone: "+91 99001 23456",
    totalOrders: 58,
    totalSpend: 28400,
    status: "active",
    lastOrderDate: "2026-02-09",
  },
  {
    id: 4,
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 98111 77889",
    totalOrders: 3,
    totalSpend: 950,
    status: "blocked",
    lastOrderDate: "2026-01-30",
  },
];

const PAGE_SIZE = 5;

export default function CustomersPage() {
  const [page, setPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const total = CUSTOMERS.length;

  const columns: Column<Customer>[] = useMemo(
    () => [
      {
        key: "name",
        label: "Customer",
        render: (row) => (
          <div>
            <p className="font-medium text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        ),
      },
      {
        key: "phone",
        label: "Phone",
      },
      {
        key: "totalOrders",
        label: "Orders",
      },
      {
        key: "totalSpend",
        label: "Total Spend",
        render: (row) => (
          <span className="font-medium text-gray-900">
            ₹{row.totalSpend.toLocaleString("en-IN")}
          </span>
        ),
      },
      {
        key: "status",
        label: "Status",
        render: (row) => {
          const styles =
            row.status === "active"
              ? "bg-green-50 text-green-700 border border-green-100"
              : row.status === "blocked"
              ? "bg-red-50 text-red-700 border border-red-100"
              : "bg-gray-50 text-gray-700 border border-gray-100";

          return (
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${styles}`}
            >
              {row.status}
            </span>
          );
        },
      },
      {
        key: "lastOrderDate",
        label: "Last Order",
      },
      {
        key: "actions",
        label: "Actions",
        render: (row) => (
          <button
            onClick={() => setSelectedCustomer(row)}
            className="text-xs font-medium text-orange-600 hover:text-orange-700 underline"
          >
            View details
          </button>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 px-6 py-5 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-white">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/80 mb-1">
            Customers
          </p>
          <h1 className="text-2xl font-semibold leading-tight">
            Customer Management
          </h1>
          <p className="text-sm text-white/90 mt-1 max-w-xl">
            View, search and manage all customers who order from your
            restaurant.
          </p>
        </div>
      </header>

      {/* Table */}
      <AppTable<Customer>
        columns={columns}
        data={CUSTOMERS}
        page={page}
        pageSize={PAGE_SIZE}
        total={total}
        onPageChange={setPage}
        searchKey="name"
        filterKey="status"
        filterOptions={[
          { label: "Active", value: "active" },
          { label: "Blocked", value: "blocked" },
          { label: "Guest", value: "guest" },
        ]}
      />

      {/* Detail modal */}
      <AppModal
        isOpen={!!selectedCustomer}
        title={selectedCustomer ? selectedCustomer.name : ""}
        onClose={() => setSelectedCustomer(null)}
        footer={
          <button
            onClick={() => setSelectedCustomer(null)}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 text-sm font-medium hover:bg-gray-200"
          >
            Close
          </button>
        }
      >
        {selectedCustomer && (
          <div className="space-y-3 text-sm text-gray-800">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">
                Contact
              </p>
              <p className="mt-1">{selectedCustomer.email}</p>
              <p>{selectedCustomer.phone}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">
                Orders
              </p>
              <p className="mt-1">
                Total orders:{" "}
                <span className="font-medium">
                  {selectedCustomer.totalOrders}
                </span>
              </p>
              <p>
                Total spend:{" "}
                <span className="font-medium">
                  ₹{selectedCustomer.totalSpend.toLocaleString("en-IN")}
                </span>
              </p>
              <p>Last order: {selectedCustomer.lastOrderDate}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">
                Status
              </p>
              <p className="mt-1 capitalize">{selectedCustomer.status}</p>
            </div>
          </div>
        )}
      </AppModal>
    </div>
  );
}
