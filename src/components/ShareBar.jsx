export default function ShareBar() {
  return (
    <div className="flex flex-wrap gap-3">
      <button className="rounded-xl border border-slate-300 px-5 py-2 text-sm transition hover:bg-white">
        Copy Link
      </button>
      <button className="rounded-xl border border-slate-300 px-5 py-2 text-sm transition hover:bg-white">
        Share
      </button>
    </div>
  );
}
