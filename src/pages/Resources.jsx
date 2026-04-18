import { Link } from "react-router-dom";

const resources = [
  {
    title: "Writing a Meaningful Tribute",
    description: "Prompts and examples to help you begin with confidence and warmth.",
    to: "/resources/writing-a-meaningful-tribute",
  },
  {
    title: "Honoring Mom on Mother's Day",
    description: "Gentle ways to remember, reflect, and carry her with you.",
    to: "/resources/inviting-family-to-contribute",
  },
  {
    title: "Planning Ongoing Grounds Care",
    description: "A practical checklist for scheduling and maintaining regular care.",
    to: "/resources/planning-ongoing-grounds-care",
  },
];

export default function Resources() {
  return (
    <main
      className="min-h-screen px-6 py-16 text-slate-900"
      style={{
        backgroundImage: "url('/soft-foliage-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <section className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Resources</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Guides for remembrance and care</h1>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {resources.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <Link to={item.to} className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#43124a] focus-visible:ring-offset-2">
                <h2 className="text-lg font-semibold text-slate-900 underline-offset-4 hover:underline">
                  {item.title}
                </h2>
                <p className="mt-3 leading-7 text-slate-700">{item.description}</p>
              </Link>
              <div className="mt-5">
                <Link
                  to={item.to}
                  className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
                >
                  Read article
                </Link>
              </div>
            </article>
          ))}
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
