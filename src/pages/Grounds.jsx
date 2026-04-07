import { useNavigate } from "react-router-dom";

export default function Grounds() {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen text-slate-900 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/treewithroots.png')" }}
      />

      {/* Cream scrim overlay */}
      <div className="absolute inset-0 bg-[#f5f1e8]/85" />

      {/* Page content */}
      <div className="relative z-10">
        <p className="absolute left-6 top-6 text-sm tracking-[0.16em] text-slate-500/75 md:text-base">
          EverTrace Grounds
        </p>

        {/* Hero */}
        <section className="mx-auto max-w-4xl px-6 pb-4 pt-10 text-center">
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
            Care for her place of remembrance
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            When you can&apos;t visit, EverTrace Grounds helps care for the place
            where she rests&mdash;with thoughtful service and photo updates after
            each visit.
          </p>
        </section>

        {/* Before / After proof - landscape focused */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <img
            src="/GravesiteBeforeAndAfterMom.png?v=4"
            alt="Before and after gravesite care comparison"
            className="h-80 w-full rounded-2xl object-cover object-[center_68%] shadow-[0_12px_32px_rgba(15,23,42,0.10)] md:h-[25rem]"
          />

          <p className="mt-5 inline-flex w-full items-center justify-center gap-2 text-center text-lg font-medium text-slate-700 md:text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 7.5h3l1.2-2.1a1.5 1.5 0 011.3-.75h5.5a1.5 1.5 0 011.3.75l1.2 2.1h3A1.75 1.75 0 0122 9.25v8.5A1.75 1.75 0 0120.25 19.5H3.75A1.75 1.75 0 012 17.75v-8.5A1.75 1.75 0 013.75 7.5z"
              />
              <circle cx="12" cy="13" r="3.25" />
            </svg>
            <span>Photo updates are included after each completed visit.</span>
          </p>
        </section>

        {/* How EverTrace Grounds Works */}
        <section className="mx-auto max-w-5xl px-6 pb-16 pt-8">
          <p className="mb-6 text-center font-serif text-2xl text-slate-900 md:text-3xl">
            How EverTrace Grounds Works
          </p>

          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12">
            <div className="text-center">
              <div className="text-base font-bold uppercase tracking-[0.22em] text-slate-500">
                STEP 1
              </div>
              <h3 className="mt-5 text-2xl font-semibold leading-tight text-slate-900 md:text-3xl">
                Request a Visit
              </h3>
            </div>

            <div className="text-center">
              <div className="text-base font-bold uppercase tracking-[0.22em] text-slate-500">
                STEP 2
              </div>
              <h3 className="mt-5 text-2xl font-semibold leading-tight text-slate-900 md:text-3xl">
                We Care for the Space
              </h3>
            </div>

            <div className="text-center">
              <div className="text-base font-bold uppercase tracking-[0.22em] text-slate-500">
                STEP 3
              </div>
              <h3 className="mt-5 text-2xl font-semibold leading-tight text-slate-900 md:text-3xl">
                Receive Photo Updates
              </h3>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <h3 className="text-center font-serif text-2xl text-slate-900 md:text-3xl">
            What&apos;s Included
          </h3>

          <div className="mx-auto mt-8 max-w-xl">
            <ul className="space-y-5 text-left text-lg text-slate-700">
              <li>Gentle headstone cleaning</li>
              <li>Debris and grass removal</li>
              <li>Light upkeep and presentation</li>
              <li>Optional flower placement</li>
            </ul>
          </div>
        </section>

        {/* Pricing */}
        <section className="mx-auto max-w-4xl px-6 pb-12 pt-16 text-center">
          <h3 className="font-serif text-2xl text-slate-900">Simple Pricing</h3>

          <div className="mx-auto mt-6 max-w-xl divide-y divide-white/70 text-left">
            <div className="flex items-end justify-between py-4">
              <p className="text-lg text-slate-700">One-time visit</p>
              <p className="text-2xl font-semibold text-slate-900">$79</p>
            </div>

            <div className="flex items-end justify-between py-4">
              <p className="text-lg text-slate-700">Annual care plan</p>
              <p className="text-2xl font-semibold text-slate-900">$149</p>
            </div>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            Now serving the Atlanta area
          </p>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-6 pb-16 pt-2 text-center">
          <h3 className="font-serif text-3xl text-slate-900 md:text-4xl">
            Schedule a visit when you need it
          </h3>
          <button
            onClick={() => navigate("/checkout/grounds")}
            className="mt-8 inline-flex rounded-xl bg-slate-900 px-8 py-4 text-xl font-semibold text-white transition hover:bg-slate-800"
          >
            Schedule a Visit
          </button>
        </section>
      </div>
    </main>
  );
}