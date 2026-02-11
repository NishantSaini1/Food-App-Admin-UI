const topItems = [
  { name: "Margherita Pizza", category: "Pizza", orders: 320, revenue: 48000 },
  { name: "Veg Burger Combo", category: "Burgers", orders: 260, revenue: 31200 },
  { name: "Paneer Tikka Roll", category: "Rolls", orders: 210, revenue: 25200 },
  { name: "Masala Fries", category: "Sides", orders: 185, revenue: 11100 },
];

export default function TopItemsTable() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Top Performing Items
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Which dishes are bringing in most of your revenue.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                Item
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                Category
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide">
                Orders
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide">
                Revenue
              </th>
            </tr>
          </thead>
          <tbody>
            {topItems.map((item) => (
              <tr
                key={item.name}
                className="border-t border-gray-100 hover:bg-gray-50/60 transition-colors"
              >
                <td className="px-5 py-3 text-gray-900 font-medium">
                  {item.name}
                </td>
                <td className="px-5 py-3 text-gray-600">{item.category}</td>
                <td className="px-5 py-3 text-right text-gray-900 font-medium">
                  {item.orders}
                </td>
                <td className="px-5 py-3 text-right text-gray-900 font-medium">
                  ₹{item.revenue.toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



