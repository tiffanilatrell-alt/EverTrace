import { Link } from "react-router-dom";

const faqs = [
  {
    question: "Do I need to buy a plaque to create a tribute?",
    answer: "No. You can create and share a tribute for free. Plaque options are available later.",
  },
  {
    question: "Can family and friends add memories?",
    answer: "Yes. Visitors can contribute memories and photos to help preserve a fuller story.",
  },
  {
    question: "Can I request grounds care without ordering a plaque?",
    answer: "Yes. Grounds care can be arranged independently based on your needs.",
  },
];

export default function Faq() {
  return (
    <main
      className="min-h-screen px-6 py-16 text-slate-900"
      style={{
        backgroundImage: "url('/Spring-peace.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <section className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">FAQ</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Common questions</h1>

        <div className="mt-10 space-y-6">
          {faqs.map((item) => (
            <article key={item.question} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">{item.question}</h2>
              <p className="mt-3 leading-7 text-slate-700">{item.answer}</p>
            </article>
          ))}
        </div>

        <p className="mt-8 text-base text-slate-700">
          More questions? Contact us: {" "}
          <a className="font-medium text-slate-900 underline" href="mailto:support@evertrace.life">
            support@evertrace.life
          </a>
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
