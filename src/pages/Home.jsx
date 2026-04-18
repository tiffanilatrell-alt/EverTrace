import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="w-full min-h-screen text-slate-900"
      style={{
        fontFamily: "'Source Sans 3', 'Segoe UI', sans-serif",
        backgroundImage: "url('/soft-foliage-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* HERO */}
      <section className="relative overflow-hidden">
          {/* BACKGROUND LAYER — edge fades */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-white/50 via-transparent to-white/50" />
          <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white/50 via-transparent to-white/50" />

        <div className="relative z-10">
        {/* Give the hero breathing room above and below without swallowing the image */}
        <div className="mx-auto max-w-[1600px] px-0 md:px-4 pt-8 md:pt-10 pb-8 md:pb-10">
          <div className="mb-6 px-6 text-center md:mb-8">
            <h1
              className="mx-auto max-w-5xl text-5xl md:text-6xl font-semibold tracking-tight leading-[1.15] text-[#43124a]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Every life leaves a trace. We help you preserve it.
            </h1>
          </div>

          <div className="relative h-[620px] md:h-[700px] rounded-none md:rounded-[28px] overflow-hidden">

            <div className="absolute inset-0 w-full overflow-hidden rounded-3xl">
              {/* HERO IMAGE */}
              <img
                src="/hero-bg.jpg"
                alt="EverTrace memorial"
                className="h-full w-full object-contain"
              />
            </div>

            {/* HERO CONTENT */}
            <div className="relative z-10 flex h-full items-start justify-center px-6 pt-3 md:pt-4">
              <div className="w-full max-w-5xl text-center">
                <div className="absolute inset-x-0 top-[58%] z-20 flex -translate-y-1/2 justify-center px-6">
                  <div className="flex flex-col gap-3 rounded-2xl border border-white/60 bg-white/70 px-4 py-4 shadow-[0_10px_28px_rgba(15,23,42,0.10)] backdrop-blur-sm sm:flex-row sm:items-center">
                    <Link
                      to="/create"
                      className="inline-flex min-w-[180px] items-center justify-center rounded-xl bg-[#43124a] px-5 py-3 text-base font-medium text-white shadow-md transition hover:bg-[#340d3a]"
                    >
                      Start a Tribute
                    </Link>

                    <Link
                      to="/checkout/stories"
                      className="inline-flex min-w-[180px] items-center justify-center rounded-xl border border-fuchsia-300 bg-white px-5 py-3 text-base font-medium text-[#43124a] transition hover:bg-fuchsia-50"
                    >
                      Order a Plaque
                    </Link>

                    <Link
                      to="/checkout/grounds"
                      className="inline-flex min-w-[180px] items-center justify-center rounded-xl border border-slate-200 bg-white/92 px-5 py-3 text-base font-medium text-slate-700 transition hover:bg-white"
                    >
                      Schedule Grounds Care
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        </div>{/* end z-10 content */}
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            Honor their memory in three simple steps
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-left shadow-sm">
              <h3 className="text-2xl font-semibold text-slate-900">
                1. Create their tribute
              </h3>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Share their story, photos, and memories in a beautiful digital
                space.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-left shadow-sm">
              <h3 className="text-2xl font-semibold text-slate-900">
                2. Choose plaque or care
              </h3>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Add a memorial plaque or arrange gravesite care to honor them
                physically.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-left shadow-sm">
              <h3 className="text-2xl font-semibold text-slate-900">
                3. Share and revisit
              </h3>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Invite family to contribute and return anytime to remember
                together.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

