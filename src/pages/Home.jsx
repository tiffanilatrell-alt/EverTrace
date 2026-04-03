import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/Spring-peace.jpg')",
          }}
        />

        {/* Darken image so it actually reads */}
        <div className="absolute inset-0 bg-slate-950/50" />

        {/* Soft spring tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100/10 via-white/5 to-transparent" />

        {/* Content */}
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-24"> 
                      <div className="mx-auto max-w-4xl text-center text-white">
                        <p className="mb-4 text-sm font-medium uppercase tracking-[0.28em] text-white/80">
                          Mother’s Day Tribute
                        </p>

                        <h1 className="text-4xl font-semibold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-5xl md:text-6xl">
                          Preserve Her Memory This Mother’s Day
                        </h1>

                        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/90 sm:text-xl">
                          Create a beautiful digital tribute for your mother or maternal
                          figure, invite loved ones to share memories, and preserve her
                          story for generations.
                        </p>
                      </div>

                      {/* HOW IT WORKS moved ABOVE CTA */}
                      <div className="mx-auto mt-14 max-w-5xl">
                        <div className="text-center">
                          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                            How EverTrace Works
                          </h2>
                        </div>

                        <div className="mt-8 grid gap-6 md:grid-cols-3">
                          <div className="rounded-3xl border border-white/15 bg-white/10 p-6 text-center shadow-xl backdrop-blur-md">
                            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                              Step 1
                            </div>
                            <h3 className="mt-3 text-xl font-semibold text-white">
                              Create a Tribute
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-white/85">
                              Add her story, photos, and the memories that made her who she
                              was.
                            </p>
                          </div>

                          <div className="rounded-3xl border border-white/15 bg-white/10 p-6 text-center shadow-xl backdrop-blur-md">
                            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                              Step 2
                            </div>
                            <h3 className="mt-3 text-xl font-semibold text-white">
                              Share with Family
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-white/85">
                              Invite siblings, children, and loved ones to add their own
                              memories and photos.
                            </p>
                          </div>

                          <div className="rounded-3xl border border-white/15 bg-white/10 p-6 text-center shadow-xl backdrop-blur-md">
                            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                              Step 3
                            </div>
                            <h3 className="mt-3 text-xl font-semibold text-white">
                              Preserve Forever
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-white/85">
                              Honor her with a lasting digital tribute and an optional
                              memorial plaque.
                            </p>
                          </div>
                        </div>

                        {/* CTA now BELOW the 3-step progression */}
                        <div className="mt-10 text-center">
                          <button
                            onClick={() => navigate("/create")}
                            className="rounded-2xl bg-slate-900 px-8 py-4 text-base font-semibold text-white shadow-2xl transition hover:-translate-y-0.5 hover:bg-slate-800"
                          >
                            Start a Tribute
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* OPTIONAL EXAMPLE / SOCIAL PROOF */}
                  <section className="border-t border-slate-100 bg-slate-50 px-6 py-16">
                    <div className="mx-auto max-w-4xl text-center">
                      <h2 className="text-2xl font-semibold text-slate-900">
                        See a Tribute Example
                      </h2>

                      <p className="mt-3 text-slate-600">
                        Explore how families are preserving memories together.
                      </p>

                      <button
                        onClick={() => navigate("/example")}
                        className="mt-6 rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
                      >
                        View Example
                      </button>
                    </div>
                  </section>
                </div>
              );
            }

