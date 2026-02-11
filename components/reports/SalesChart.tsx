import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Jan 1", revenue: 12000 },
  { date: "Jan 5", revenue: 18000 },
  { date: "Jan 10", revenue: 15000 },
  { date: "Jan 15", revenue: 22000 },
  { date: "Jan 20", revenue: 26000 },
];

export default function SalesChart() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-900">Revenue Over Time</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Track how much your restaurant is earning across the selected range.
          </p>
        </div>
        <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-[11px] font-medium text-green-700 border border-green-100">
          Trending up
        </span>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
