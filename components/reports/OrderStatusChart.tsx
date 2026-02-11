import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Delivered", value: 720 },
  { name: "Cancelled", value: 80 },
  { name: "Pending", value: 140 },
  { name: "Preparing", value: 300 },
];

export default function OrderStatusChart() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-900">Order Status Mix</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            See how many orders are delivered, pending, preparing or cancelled.
          </p>
        </div>
        <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-[11px] font-medium text-amber-700 border border-amber-100">
          Live service health
        </span>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
