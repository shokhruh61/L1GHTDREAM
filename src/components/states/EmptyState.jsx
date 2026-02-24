export default function EmptyState({ title, description }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/20 bg-slate-900/50 p-10 text-center">
      <p className="text-xl font-medium text-white">{title}</p>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
    </div>
  );
}