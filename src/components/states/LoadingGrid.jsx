export default function LoadingGrid({ cards = 6, short = false }) {
  return (
    <div className={`grid gap-4 ${short ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
      {Array.from({ length: cards }).map((_, index) => (
        <div key={`skeleton-${index}`} className="animate-pulse rounded-2xl border border-white/10 bg-slate-900/60 p-3">
          <div className={`${short ? "aspect-[9/16]" : "aspect-video"} rounded-xl bg-slate-700/40`} />
          <div className="mt-3 h-4 rounded bg-slate-700/40" />
          <div className="mt-2 h-3 w-2/3 rounded bg-slate-700/30" />
        </div>
      ))}
    </div>
  );
}