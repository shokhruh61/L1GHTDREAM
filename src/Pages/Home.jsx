import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Home() {
  usePageMeta("Home", "M1NOR FM streams music, videos, and shorts in one modern media platform.");

  return (
    <div className="space-y-14 md:space-y-18">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-6 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Smart Fashion Search</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-white md:text-6xl">
          Rasmdan kiyim toping va bir zumda sotib oling.
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-slate-300 md:text-lg">
          Kiyim rasmini yuklang, AI yordamida o'xshash mahsulotlarni toping va marketplace orqali buyurtma bering.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/music" className="rounded-full bg-cyan-300 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
            Play
          </Link>
          <Link to="/videos" className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-cyan-300/80 hover:text-cyan-200">
            Watch
          </Link>
          <Link to="/style-finder" className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-cyan-300/80 hover:text-cyan-200">
            Style Finder
          </Link>
          <Link to="/contact" className="rounded-full border border-fuchsia-300/40 px-5 py-2 text-sm font-semibold text-fuchsia-100 transition hover:bg-fuchsia-300/10">
            Subscribe
          </Link>
        </div>
      </section>
    </div>
  );
}