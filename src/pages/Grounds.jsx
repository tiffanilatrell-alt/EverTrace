import { useNavigate } from "react-router-dom";

export default function Grounds() {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/GravesiteBeforeAfterBackgroundMom.png')" }}
      />

      {/* Darkened overlay for white text readability */}
      <div className="absolute inset-0 bg-slate-950/45" />
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/10 via-white/5 to-transparent" />

      {/* Page content */}
      <div className="relative z-10">
        <p className="absolute left-6 top-6 text-sm tracking-[0.18em] text-white/75 md:text-base">
          EverTrace Grounds
        </p>

        {/* Hero */}
        <section className="mx-auto max-w-4xl px-6 pb-6 pt-16 text-center md:pt-20">
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-5xl md:text-6xl">
            Care for her place of remembrance
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/90 sm:text-xl">
            When you can&apos;t visit, EverTrace Grounds helps care for the place
            where she rests&mdash;with thoughtful service and photo updates after
            each visit.
          </p>
        </section>

        {/* How EverTrace Grounds Works */}
        <section className="mx-auto max-w-5xl px-6 pb-16 pt-8">
          <p className="mb-6 text-center text-3xl font-semibold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.28)] md:text-4xl">
            How EverTrace Grounds Works
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 text-center shadow-xl backdrop-blur-md">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                STEP 1
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
                Request a Visit
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/85 sm:text-base">
                Tell us where she rests and choose the visit that feels right for
                your family.
              </p>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 text-center shadow-xl backdrop-blur-md">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                STEP 2
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
                We Care for the Space
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/85 sm:text-base">
                We complete thoughtful grounds care with attention, respect, and
                memorial-area presentation.
              </p>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 text-center shadow-xl backdrop-blur-md">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                STEP 3
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
                Receive Photo Updates
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/85 sm:text-base">
                After each completed visit, you receive photo confirmation so you
                can see the care that was provided.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-6 pb-16 pt-2 text-center">
          <h3 className="text-3xl font-semibold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.28)] md:text-4xl">
            Schedule a visit when you need it
          </h3>
          <button
            onClick={() => navigate("/checkout/grounds")}
            className="mt-8 inline-flex rounded-xl bg-slate-900 px-8 py-4 text-xl font-semibold text-white transition hover:bg-slate-800"
          >
            Schedule a Visit
          </button>
        </section>

        {/* What's Included */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <h3 className="text-center text-3xl font-semibold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.28)] md:text-4xl">
            What&apos;s Included
          </h3>

          <div className="mx-auto mt-8 max-w-xl">
            <ul className="space-y-5 text-left text-lg text-white/90">
              <li>Gentle headstone cleaning</li>
              <li>Debris and grass removal</li>
              <li>Light upkeep and presentation</li>
              <li>Optional flower placement</li>
            </ul>
          </div>
        </section>

        {/* Pricing */}
        <section className="mx-auto max-w-4xl px-6 pb-12 pt-16 text-center">
          <h3 className="text-3xl font-semibold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.28)] md:text-4xl">Simple Pricing</h3>

          <div className="mx-auto mt-6 max-w-xl divide-y divide-white/25 text-left">
            <div className="flex items-end justify-between py-4">
              <p className="text-lg text-white/90">One-time visit</p>
              <p className="text-2xl font-semibold text-white">$79</p>
            </div>

            <div className="flex items-end justify-between py-4">
              <p className="text-lg text-white/90">Annual care plan</p>
              <p className="text-2xl font-semibold text-white">$149</p>
            </div>
          </div>

          <p className="mt-6 text-sm text-white/70">
            Now serving the Atlanta area
          </p>
        </section>

      </div>
    </main>
  );
}