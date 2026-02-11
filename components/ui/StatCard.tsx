export default function StatCard({ title, value }: any) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/80 border border-orange-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-4">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-orange-50 via-transparent to-amber-50 opacity-80" />
      <div className="relative space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-orange-500/80">
          {title}
        </p>
        <h2 className="text-2xl font-semibold text-gray-900">{value}</h2>
      </div>
    </div>
  );
}
