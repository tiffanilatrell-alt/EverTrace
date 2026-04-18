import { Link } from "react-router-dom";

export default function About() {
  return (
    <main
      className="min-h-screen px-6 py-16 text-slate-900"
      style={{
        backgroundImage: "url('/grounds-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <section className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">About EverTrace</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          History you can hold.
        </h1>
        <div className="mt-6 space-y-6 text-lg leading-8 text-slate-700">
          <p>EverTrace was built from the understanding that memory doesn't live in one place.</p>

          <p>
            It lives in stories told at the dinner table.
            <br />
            In photos tucked away in boxes.
            <br />
            In moments shared across generations.
          </p>

          <p>But too often, those pieces are lost — or never brought together.</p>

          <p>EverTrace exists to change that.</p>

          <p>
            We help families create living tribute pages where memories can be written, shared, and
            preserved together. What begins as a single story becomes a collective one — growing
            over time as others add their voices.
          </p>

          <p>
            And when that story becomes something you want to keep close, EverTrace offers a way to
            bring it into the physical world — a lasting connection between place and memory.
          </p>

          <p>Because the people we love are more than moments in the past.</p>

          <p>They are part of a story that deserves to be carried forward.</p>

          <p>A history you can hold.</p>
        </div>

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
