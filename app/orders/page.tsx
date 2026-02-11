'use client';

import { useState } from 'react';
import AppTable, { Column } from '@/components/ui/AppTable';
import AppModal from '@/components/ui/AppModal';
import { useRouter } from 'next/navigation';

/* ---------------- Types ---------------- */

type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

type OrderItem = {
  name: string;
  qty: number;
  price: number;
};

type Order = {
  id: number;
  orderNo: string;
  customer: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
};

/* ---------------- Helpers ---------------- */

const statusLabel: Record<OrderStatus, string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  preparing: 'Preparing',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const statusColor: Record<OrderStatus, string> = {
  pending: 'bg-[var(--color-warning)]/15 text-[var(--color-warning)]',
  accepted: 'bg-[var(--color-info)]/15 text-[var(--color-info)]',
  preparing: 'bg-[var(--color-secondary)]/15 text-[var(--color-secondary)]',
  out_for_delivery: 'bg-[var(--color-primary)]/15 text-[var(--color-primary)]',
  delivered: 'bg-[var(--color-success)]/15 text-[var(--color-success)]',
  cancelled: 'bg-[var(--color-danger)]/15 text-[var(--color-danger)]',
};

/* ---------------- Page ---------------- */

export default function OrdersPage() {
    const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      orderNo: 'ORD-1001',
      customer: 'Nishant',
      total: 548,
      status: 'pending',
      items: [
        { name: 'Pizza', qty: 1, price: 299 },
        { name: 'Burger', qty: 1, price: 249 },
      ],
    },
    {
      id: 2,
      orderNo: 'ORD-1002',
      customer: 'Amit',
      total: 299,
      status: 'out_for_delivery',
      items: [{ name: 'Pizza', qty: 1, price: 299 }],
    },
  ]);

  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const paginatedData = orders.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  /* ---------------- Status Update ---------------- */

  const updateStatus = (id: number, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === id ? { ...o, status } : o))
    );
  };

  /* ---------------- Columns ---------------- */

  const columns: Column<Order>[] = [
    { key: 'orderNo', label: 'Order No' },
    { key: 'customer', label: 'Customer' },
    {
      key: 'total',
      label: 'Total',
      render: row => <>₹{row.total}</>,
    },
    {
      key: 'status',
      label: 'Status',
      render: row => (
        <span
          className={`px-3 py-1 rounded-full text-xs ${statusColor[row.status]}`}
        >
          {statusLabel[row.status]}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: row => (
        <div className="flex flex-wrap gap-2">
          {/* View */}
          <button
            onClick={() => router.push(`/orders/${row.id}`)}
            className="text-info hover:underline"
          >
            View
          </button>

          {row.status === 'pending' && (
            <button
              onClick={() => updateStatus(row.id, 'accepted')}
              className="text-success hover:underline"
            >
              Accept
            </button>
          )}

          {row.status === 'accepted' && (
            <button
              onClick={() => updateStatus(row.id, 'preparing')}
              className="text-secondary hover:underline"
            >
              Prepare
            </button>
          )}

          {row.status === 'preparing' && (
            <button
              onClick={() => updateStatus(row.id, 'out_for_delivery')}
              className="text-primary hover:underline"
            >
              Out for Delivery
            </button>
          )}

          {row.status === 'out_for_delivery' && (
            <button
              onClick={() => updateStatus(row.id, 'delivered')}
              className="text-success hover:underline"
            >
              Delivered
            </button>
          )}

          {row.status !== 'delivered' &&
            row.status !== 'cancelled' && (
              <button
                onClick={() => updateStatus(row.id, 'cancelled')}
                className="text-danger hover:underline"
              >
                Cancel
              </button>
            )}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-black">
          Orders Management
        </h1>
        <p className="text-sm text-gray-500">
          Track and manage order lifecycle
        </p>
      </div>

      {/* Table */}
      <AppTable
        columns={columns}
        data={paginatedData}
        page={page}
        pageSize={pageSize}
        total={orders.length}
        onPageChange={setPage}
        searchKey="orderNo"
        filterKey="status"
        filterOptions={[
          { label: 'Pending', value: 'pending' },
          { label: 'Accepted', value: 'accepted' },
          { label: 'Preparing', value: 'preparing' },
          { label: 'Out for Delivery', value: 'out_for_delivery' },
          { label: 'Delivered', value: 'delivered' },
          { label: 'Cancelled', value: 'cancelled' },
        ]}
      />

      {/* Order Details */}
      <AppModal
        isOpen={!!selectedOrder}
        title="Order Details"
        onClose={() => setSelectedOrder(null)}
      >
        {selectedOrder && (
          <div className="space-y-4 text-black">
            <div>
              <p><strong>Order No:</strong> {selectedOrder.orderNo}</p>
              <p><strong>Customer:</strong> {selectedOrder.customer}</p>
              <p><strong>Total:</strong> ₹{selectedOrder.total}</p>
              <p>
                <strong>Status:</strong>{' '}
                {statusLabel[selectedOrder.status]}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Items</h3>
              <table className="w-full text-sm border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Item</th>
                    <th className="p-2 text-left">Qty</th>
                    <th className="p-2 text-left">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.qty}</td>
                      <td className="p-2">₹{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="border border-gray-300 px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </AppModal>
    </div>
  );
}
