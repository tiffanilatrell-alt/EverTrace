import { Link, useNavigate } from "react-router-dom";

export default function ExampleTribute() {
  const navigate = useNavigate();

  const memories = [
    {
      name: "Angela",
      relationship: "Daughter",
      text: "She never let anyone leave hungry, and every Sunday felt like home because of her.",
      candleCount: 12,
      loveCount: 8,
      flowerCount: 5,
    },
    {
      name: "Marcus",
      relationship: "Nephew",
      text: "Her laugh could reset a whole room. You always felt lighter after being with her.",
      candleCount: 9,
      loveCount: 6,
      flowerCount: 4,
    },
    {
      name: "Danielle",
      relationship: "Family Friend",
      text: "She made ordinary moments feel special, especially birthdays and family dinners.",
      candleCount: 11,
      loveCount: 7,
      flowerCount: 6,
    },
  ];

  const timeline = [
    { year: "1952", label: "Born", detail: "A new light entered the world." },
    { year: "1974", label: "Graduated college", detail: "A proud milestone that shaped her future." },
    { year: "1978", label: "Married", detail: "Built a life rooted in love and family." },
    { year: "1982", label: "Became a mother", detail: "Her most cherished role began." },
    { year: "2024", label: "Passed", detail: "Her love remains in every life she touched." },
  ];

  const thingsSheLoved = [
    { icon: "🎵", label: "Favorite Song", value: "Amazing Grace" },
    { icon: "🍽️", label: "Favorite Meal", value: "Sunday dinner with family" },
    { icon: "🌸", label: "Known For", value: "Warmth, handwritten cards, and making people feel at home" },
  ];

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-stone-800">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/")}
          className="mb-6 inline-flex items-center text-sm font-medium text-stone-600 transition hover:text-stone-900"
        >
          ← Back to Home
        </button>

        <div className="overflow-hidden rounded-[2rem] border border-stone-200/70 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          {/* HERO */}
          <section className="relative">
            <div className="relative h-[430px] w-full md:h-[560px]">
              <img
                src="/ExampleProfileBackground.png"
                alt="Jean E. White tribute"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />

              <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-6 pb-10 md:px-10 md:pb-14">
                <p className="text-xs uppercase tracking-[0.28em] text-stone-200/90">
                  Example Tribute
                </p>

                <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
                  Jean E. White
                </h1>

                <p className="mt-4 text-lg text-stone-200 md:text-xl">
                  1952 — 2024
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {["Mother", "Teacher", "Host", "Heart of the Family"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-6 max-w-3xl text-lg italic leading-8 text-stone-100 md:text-xl">
                  “Her laughter filled every room she entered, and her love still
                  lives in every life she touched.”
                </p>
              </div>
            </div>
          </section>

          {/* RITUAL STRIP */}
          <section className="border-b border-stone-200 bg-stone-50/70 px-6 py-5 md:px-10">
            <div className="flex flex-wrap items-center gap-3">
              {[
                { label: "🕯️ Light a Candle", count: 124 },
                { label: "🕊️ Send Love", count: 87 },
                { label: "🌸 Leave Flowers", count: 49 },
              ].map((item) => (
                <button
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
                >
                  <span>{item.label}</span>
                  <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600">
                    {item.count}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* MAIN CONTENT */}
          <section className="grid gap-10 px-6 py-8 md:grid-cols-[1.3fr_0.7fr] md:px-10 md:py-10">
            {/* LEFT COLUMN */}
            <div className="space-y-10">
              {/* STORY */}
              <div className="rounded-[1.75rem] border border-stone-200/70 bg-white p-6 shadow-sm md:p-8">
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                  Her Story
                </p>

                <div className="mt-5 space-y-5 text-[1.03rem] leading-8 text-stone-700">
                  <p>
                    Jean was the steady heart of her family—warm, thoughtful, and
                    deeply loved. She had a way of making people feel seen, welcomed,
                    and cared for without ever needing attention for herself.
                  </p>

                  <p>
                    From family dinners to handwritten birthday cards, she left traces
                    of love everywhere she went. She made ordinary moments feel sacred,
                    and the people around her felt safer, softer, and more connected
                    because she was there.
                  </p>

                  <p>
                    This tribute is a place to hold onto those pieces of her life—the
                    stories, the photographs, the quiet gestures, and the memories that
                    still gather people together.
                  </p>
                </div>
              </div>

              {/* TIMELINE */}
              <div className="rounded-[1.75rem] border border-stone-200/70 bg-stone-50/60 p-6 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                      A Life Remembered
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                      Timeline
                    </h2>
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  {timeline.map((item, index) => (
                    <div key={`${item.year}-${item.label}`} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="mt-1 h-3 w-3 rounded-full bg-emerald-700" />
                        {index !== timeline.length - 1 && (
                          <div className="mt-2 h-full min-h-[52px] w-px bg-stone-300" />
                        )}
                      </div>

                      <div className="pb-2">
                        <p className="text-sm uppercase tracking-[0.14em] text-stone-500">
                          {item.year}
                        </p>
                        <p className="mt-1 text-lg font-semibold text-slate-900">
                          {item.label}
                        </p>
                        <p className="mt-1 leading-7 text-stone-700">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* MEMORIES */}
              <div className="rounded-[1.75rem] border border-stone-200/70 bg-white p-6 shadow-sm md:p-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                      Shared by Family
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                      Memories Shared
                    </h2>
                  </div>

                  <button className="hidden rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50 md:inline-flex">
                    + Add a Memory
                  </button>
                </div>

                <div className="mt-6 space-y-5">
                  {memories.map((memory) => (
                    <div
                      key={memory.name}
                      className="rounded-[1.5rem] border border-stone-200 bg-stone-50/80 p-5 transition hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <p className="leading-8 text-stone-700">{memory.text}</p>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            — {memory.name}
                          </p>
                          <p className="text-sm text-stone-500">{memory.relationship}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 text-sm">
                          <span className="rounded-full bg-white px-3 py-1 text-stone-700 ring-1 ring-stone-200">
                            🕯️ {memory.candleCount}
                          </span>
                          <span className="rounded-full bg-white px-3 py-1 text-stone-700 ring-1 ring-stone-200">
                            🕊️ {memory.loveCount}
                          </span>
                          <span className="rounded-full bg-white px-3 py-1 text-stone-700 ring-1 ring-stone-200">
                            🌸 {memory.flowerCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-6 inline-flex rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800 md:hidden">
                  + Add a Memory
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              {/* PORTRAIT CARD */}
              <div className="overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-sm">
                <img
                  src="/Young Mom.png"
                  alt="Young portrait of Jean E. White"
                  className="h-72 w-full object-cover"
                />
                <div className="px-6 py-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-stone-500">
                    In Loving Memory
                  </p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">
                    Jean E. White
                  </p>
                  <p className="mt-2 leading-7 text-stone-600">
                    Beloved mother, steady presence, and the kind of person whose
                    warmth lingered long after she left the room.
                  </p>
                </div>
              </div>

              {/* THINGS SHE LOVED */}
              <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                  A Few Things She Loved
                </p>

                <div className="mt-5 space-y-4">
                  {thingsSheLoved.map((item) => (
                    <div key={item.label} className="rounded-2xl bg-stone-50 px-4 py-4">
                      <p className="text-sm text-stone-500">
                        {item.icon} {item.label}
                      </p>
                      <p className="mt-1 font-medium leading-7 text-slate-900">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* WHY EVERTRACE */}
              <div className="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                  Why EverTrace
                </p>

                <h3 className="mt-3 text-2xl font-semibold text-slate-900">
                  More than a memorial page
                </h3>

                <p className="mt-4 leading-7 text-stone-700">
                  EverTrace gives families one beautiful place to gather stories,
                  memories, and photographs—and preserve them in a way loved ones
                  can revisit together for years to come.
                </p>

                <Link
                  to="/create"
                  className="mt-6 block w-full rounded-2xl bg-emerald-700 px-6 py-3.5 text-center text-base font-medium text-white transition hover:bg-emerald-800"
                >
                  Create a Tribute Like This
                </Link>
              </div>

              {/* PLAQUE CTA */}
              <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                  Preserve This Tribute
                </p>

                <h3 className="mt-3 text-2xl font-semibold text-slate-900">
                  Connect it to a lasting plaque
                </h3>

                <p className="mt-4 leading-7 text-stone-700">
                  Place this memory somewhere family can visit, scan, and return to.
                  The plaque becomes a physical doorway to the stories held here.
                </p>

                <div className="mt-5 rounded-[1.25rem] border border-dashed border-stone-300 bg-stone-50 px-4 py-5 text-center text-sm text-stone-500">
                  QR plaque preview area
                </div>

                <button className="mt-5 w-full rounded-2xl border border-stone-300 px-5 py-3 text-sm font-medium text-stone-800 transition hover:bg-stone-50">
                  Learn About Plaques
                </button>
              </div>

              {/* FAMILY ACTIONS */}
              <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                  What Family Can Do
                </p>

                <ul className="mt-5 space-y-3 text-stone-700">
                  <li>• Add memories and stories</li>
                  <li>• Upload meaningful photos</li>
                  <li>• Share the tribute with loved ones</li>
                  <li>• Return on birthdays and anniversaries</li>
                  <li>• Preserve it with a QR plaque</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}