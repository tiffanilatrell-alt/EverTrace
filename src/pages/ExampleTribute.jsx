import { Link, useNavigate } from "react-router-dom";

export default function ExampleTribute() {
  const navigate = useNavigate();
  const memories = [
    {
      name: "Angela",
      text: "She never let anyone leave hungry, and every Sunday felt like home because of her.",
    },
    {
      name: "Marcus",
      text: "Her laugh could reset a whole room. You always felt lighter after being with her.",
    },
    {
      name: "Danielle",
      text: "She made ordinary moments feel special, especially birthdays and family dinners.",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <button
          onClick={() => navigate("/")}
          className="mb-6 text-sm font-medium text-stone-600 transition hover:text-stone-900"
        >
          ← Back to Home
        </button>

        <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl">
          <div className="relative h-[320px] w-full md:h-[420px]">
            <img
              src="/YoungMom.png"
              alt="Jean E. White tribute"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-10">
              <p className="text-sm uppercase tracking-[0.24em] text-stone-200">
                Example Tribute
              </p>
              <h1 className="mt-3 text-4xl font-bold text-white md:text-6xl">
                Jean E. White
              </h1>
              <p className="mt-3 text-lg text-stone-200">
                Beloved Mother • 1952 – 2024
              </p>
            </div>
          </div>

          <div className="grid gap-10 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-10">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Her Story
              </h2>

              <p className="mt-5 text-lg italic leading-8 text-stone-600">
                &quot;Her laughter filled every room she entered and her love
                will live on in our hearts forever.&quot;
              </p>

              <p className="mt-6 leading-8 text-stone-700">
                Jean was the steady heart of her family — warm, thoughtful, and
                deeply loved. She made people feel seen, welcomed, and cared
                for. From family dinners to handwritten birthday cards, she left
                traces of love everywhere she went.
              </p>

              <h3 className="mt-10 text-2xl font-semibold text-slate-900">
                Memories Shared
              </h3>

              <div className="mt-6 space-y-5">
                {memories.map((memory) => (
                  <div
                    key={memory.name}
                    className="rounded-[1.5rem] bg-stone-50 p-5"
                  >
                    <p className="leading-7 text-stone-700">{memory.text}</p>
                    <p className="mt-3 text-sm font-medium text-emerald-700">
                      — {memory.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="overflow-hidden rounded-[1.5rem] bg-white shadow">
                <img
                  src="/Young Mom.png"
                  alt="Young portrait of Jean E. White"
                  className="h-64 w-full object-cover"
                />
                <div className="px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-stone-500">
                    In Loving Memory
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    Jean E. White
                  </p>
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-stone-50 p-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  Why EverTrace
                </h3>

                <p className="mt-4 leading-7 text-stone-700">
                  A tribute page gives family one beautiful place to gather
                  photos, memories, and stories — and can later be connected to
                  a memorial QR plaque.
                </p>

                <Link
                  to="/create"
                  className="mt-6 block w-full rounded-2xl bg-emerald-700 px-6 py-3 text-center text-base font-medium text-white transition hover:bg-emerald-800"
                >
                  Create a Tribute Like This
                </Link>
              </div>

              <div className="mt-6 rounded-[1.5rem] bg-white p-6 shadow">
                <h3 className="text-xl font-semibold text-slate-900">
                  What family can do
                </h3>

                <ul className="mt-4 space-y-3 text-stone-700">
                  <li>• Add memories</li>
                  <li>• Upload photos</li>
                  <li>• Share with loved ones</li>
                  <li>• Preserve with a QR plaque</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}