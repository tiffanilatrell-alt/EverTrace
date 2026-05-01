import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import LandingModal from "../components/LandingModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Only show modal if not previously dismissed in this browser
    const dismissed = localStorage.getItem("evertrace_md_modal_dismissed");
    if (!dismissed) setModalOpen(true);
  }, []);

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
      {/* Light Top Banner */}
      <header className="fixed top-0 left-0 z-50 w-full border-b border-white/40 bg-white backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Logo / Brand */}
          <a href="/" className="flex items-center gap-3">
            <div className="leading-tight">
              <p className="font-serif text-xl font-bold text-purple-950">
                EverTrace
              </p>
              <p className="hidden text-xs tracking-wide text-slate-500 sm:block">
                Stories • Plaques • Grounds
              </p>
            </div>
          </a>
          {/* Utility Links */}
          <nav className="flex items-center gap-3 text-sm font-medium text-slate-600">
            <div className="relative group">
              <Link
                to="/account"
                className="rounded-full px-4 py-2 transition hover:bg-purple-50 hover:text-purple-900 flex items-center justify-center"
                aria-label="Account"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5a7.5 7.5 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75V19.5z" />
                </svg>
              </Link>
              <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-stone-200">
                My Account
              </span>
            </div>
            <div className="relative group">
              <Link
                to="/checkout"
                className="rounded-full border border-purple-100 bg-white/70 px-4 py-2 shadow-sm transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-900 flex items-center justify-center"
                aria-label="Cart"
              >
                {/* Modern cart icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <circle cx="9" cy="21" r="1.5" />
                  <circle cx="19" cy="21" r="1.5" />
                  <path d="M3 5h2l.4 2M7 13h10l4-8H5.4" />
                  <path d="M7 13l-1.5 6h13" />
                </svg>
              </Link>
              <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-stone-200">
                Cart
              </span>
            </div>
          </nav>
        </div>
      </header>

      {modalOpen && <LandingModal onClose={() => {
        setModalOpen(false);
        localStorage.setItem("evertrace_md_modal_dismissed", "1");
      }} />}

      <main className="pt-16">
        {/* HERO */}
        <section className="relative overflow-hidden">
          {/* BACKGROUND LAYER — edge fades */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-white/50 via-transparent to-white/50" />
          <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white/50 via-transparent to-white/50" />

          <div className="relative z-10">
            {/* Give the hero breathing room above and below without swallowing the image */}
            <div className="mx-auto max-w-[1600px] px-0 md:px-4 pt-8 md:pt-10 pb-8 md:pb-10">
              <div className="mb-6 px-6 text-center md:mb-8">
                <div className="text-center">
                  <h1 className="font-serif text-4xl md:text-5xl text-[#4b1248] mx-auto max-w-5xl font-semibold tracking-tight leading-[1.15]">
                    Every life leaves a trace. We help you preserve it.
                  </h1>
                  <div className="mt-4">
                    <Link
                      to="/example"
                      className="text-sm font-medium text-[#4b1248] underline underline-offset-4 hover:opacity-80"
                    >
                      View an Example Tribute →
                    </Link>
                  </div>
                </div>
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

        {/* EXAMPLE TRIBUTE */}
        <section className="px-6 pb-12 pt-4 md:pb-16">
          <div className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white/90 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm">
              <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[240px]">
                  <img
                    src="/ExampleProfileBackground.png"
                    alt="Example tribute preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                </div>
                <div className="px-6 py-7 md:px-8 md:py-9">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                    Example Tribute
                  </p>
                  <h2
                    className="mt-3 text-3xl leading-tight text-slate-900 md:text-4xl"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    See how a finished tribute can feel
                  </h2>
                  <p className="mt-4 max-w-xl text-lg leading-8 text-stone-600">
                    Explore a sample memorial page with story, photos, and shared family memories.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/example"
                      className="inline-flex items-center justify-center rounded-xl border border-[#d8b8df] bg-[#f8f1fa] px-5 py-3 text-base font-semibold text-[#43124a] transition hover:bg-[#f3e8f7]"
                    >
                      View Example Tribute
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      </main>
    </div>
  );
}

