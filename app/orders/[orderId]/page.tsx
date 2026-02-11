'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

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

/* ---------------- Status Helpers ---------------- */

const statusLabel: Record<OrderStatus, string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  preparing: 'Preparing',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const statusColor: Record<OrderStatus, string> = {
  pending: 'text-warning',
  accepted: 'text-info',
  preparing: 'text-secondary',
  out_for_delivery: 'text-primary',
  delivered: 'text-success',
  cancelled: 'text-danger',
};

/* ---------------- Page ---------------- */

export default function OrderViewPage() {
  const { id } = useParams();
  const router = useRouter();

  /* ⚠️ Temporary mock data (replace with API later) */
  const [order, setOrder] = useState<Order>({
    id: Number(id),
    orderNo: `ORD-${id}`,
    customer: 'Nishant',
    total: 548,
    status: 'preparing',
    items: [
      { name: 'Pizza', qty: 1, price: 299 },
      { name: 'Burger', qty: 1, price: 249 },
    ],
  });

  /* ---------------- Status Update ---------------- */

  const updateStatus = (status: OrderStatus) => {
    setOrder(prev => ({ ...prev, status }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-black">
            Order {order.orderNo}
          </h1>
          <p className={`text-sm font-medium ${statusColor[order.status]}`}>
            {statusLabel[order.status]}
          </p>
        </div>

        <button
          onClick={() => router.back()}
          className="border bg-secondary text-white px-4 py-2 rounded "
        >
          ← Back
        </button>
      </div>

      {/* Order Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black">
        <Info label="Customer" value={order.customer} />
        <Info label="Total Amount" value={`₹${order.total}`} />
        <Info label="Status" value={statusLabel[order.status]} />
      </div>

      {/* Items */}
      <div>
        <h2 className="font-semibold mb-2 text-black">Order Items</h2>
        <table className="w-full text-sm border text-black">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-left">Qty</th>
              <th className="p-2 text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.qty}</td>
                <td className="p-2">₹{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Admin Actions */}
      <div className="flex flex-wrap gap-3">
        {order.status === 'pending' && (
          <ActionButton label="Accept" color="success" onClick={() => updateStatus('accepted')} />
        )}

        {order.status === 'accepted' && (
          <ActionButton label="Prepare" color="secondary" onClick={() => updateStatus('preparing')} />
        )}

        {order.status === 'preparing' && (
          <ActionButton
            label="Out for Delivery"
            color="primary"
            onClick={() => updateStatus('out_for_delivery')}
          />
        )}

        {order.status === 'out_for_delivery' && (
          <ActionButton
            label="Delivered"
            color="success"
            onClick={() => updateStatus('delivered')}
          />
        )}

        {order.status !== 'delivered' && order.status !== 'cancelled' && (
          <ActionButton
            label="Cancel Order"
            color="danger"
            onClick={() => updateStatus('cancelled')}
          />
        )}
      </div>
    </div>
  );
}

/* ---------------- Small Components ---------------- */

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border rounded-lg p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function ActionButton({
  label,
  onClick,
  color,
}: {
  label: string;
  onClick: () => void;
  color: 'primary' | 'success' | 'secondary' | 'danger';
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded text-white bg-[var(--color-${color})]`}
    >
      {label}
    </button>
  );
}
