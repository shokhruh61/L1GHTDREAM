import SectionHeading from "../components/ui/SectionHeading";
import { usePageMeta } from "../hooks/usePageMeta";

const pillars = [
  {
    title: "What Is M1NOR FM",
    body: "M1NOR FM is a digital media platform combining music, video, and short-form entertainment into one consistent experience.",
  },
  {
    title: "Mission",
    body: "Deliver fast, immersive content for the creator generation with mobile-first speed and high visual quality.",
  },
  {
    title: "Vision",
    body: "Build a future where independent media culture is discoverable, interactive, and always within one tap.",
  },
];

export default function About() {
  usePageMeta("About", "Learn the mission and vision behind M1NOR FM.");

  return (
    <section>
      <SectionHeading
        eyebrow="About"
        title="Built For The New Media Era"
        description="A minimal, futuristic platform architecture for young audiences who live on music and motion content."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {pillars.map((item) => (
          <article key={item.title} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}