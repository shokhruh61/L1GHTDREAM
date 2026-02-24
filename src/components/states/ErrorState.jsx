export default function ErrorState({ message }) {
  return (
    <div className="rounded-2xl border border-rose-400/40 bg-rose-900/20 p-6 text-center text-rose-100">
      <p className="text-lg font-medium">Something went wrong</p>
      <p className="mt-2 text-sm">{message}</p>
    </div>
  );
}