import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-slate-900">
      <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Terms</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Terms and conditions</h1>
        <p className="mt-6 text-lg leading-8 text-slate-700">
          These terms describe the basic rules for using EverTrace.
          This page is a placeholder for your full terms and conditions.
        </p>
        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
