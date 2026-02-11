const stats = [
  { label: "Total Revenue", value: "₹1,24,000", subtitle: "This month" },
  { label: "Total Orders", value: "1,240", subtitle: "All channels" },
  { label: "Avg. Order Value", value: "₹320", subtitle: "Per order" },
  { label: "Repeat Customers", value: "38%", subtitle: "Returning users" },
  { label: "Cancelled Orders", value: "42", subtitle: "Need attention" },
];

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-black">
      {stats.map((item) => (
        <div
          key={item.label}
          className="relative overflow-hidden rounded-2xl bg-white/80 border border-orange-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-4"
        >
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-orange-50 via-transparent to-amber-50 opacity-80" />
          <div className="relative space-y-1">
            <p className="text-[11px] font-medium uppercase tracking-wide text-orange-500/80">
              {item.label}
            </p>
            <p className="text-xl font-semibold text-gray-900">
              {item.value}
            </p>
            {item.subtitle && (
              <p className="text-xs text-gray-500">{item.subtitle}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
