export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-6 md:mb-8">
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-semibold text-white md:text-3xl">{title}</h2>
      {description && <p className="mt-2 max-w-2xl text-sm text-slate-300 md:text-base">{description}</p>}
    </div>
  );
}