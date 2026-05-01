import { Link } from "react-router-dom";

export default function AccountPage() {
  const user = {
    name: "Your Name",
    email: "you@email.com",
  };

  const tributes = [];

  return (
    <main className="min-h-screen bg-[#faf7f2] px-4 py-10 text-stone-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-8 flex flex-col gap-5 rounded-[2rem] border border-stone-200 bg-white/80 p-6 shadow-sm sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
              EverTrace Account
            </p>
            <h1 className="font-serif text-4xl font-semibold text-[#4b1248] sm:text-5xl">
              My Family Tributes
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600">
              Manage the stories, memories, and memorial plaques connected to
              your family.
            </p>
          </div>

          <Link
            to="/start?intent=tribute"
            className="inline-flex items-center justify-center rounded-full bg-[#4b1248] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#371036]"
          >
            Create a Tribute
          </Link>
        </section>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
              Account
            </p>

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f1e7ef] font-serif text-xl font-semibold text-[#4b1248]">
                {user.name?.charAt(0) || "Y"}
              </div>

              <div>
                <h2 className="text-lg font-semibold text-stone-900">
                  {user.name}
                </h2>
                <p className="text-sm text-stone-500">{user.email}</p>
              </div>
            </div>
          </aside>

          <section className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-[#4b1248]">
                  Your Tributes
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                  View, edit, share, and preserve the tribute pages you manage.
                </p>
              </div>
            </div>

            {tributes.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-stone-300 bg-[#fbfaf8] px-6 py-12 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f1e7ef] text-2xl">
                  🕊️
                </div>

                <h3 className="font-serif text-3xl font-semibold text-[#4b1248]">
                  Begin preserving your first story.
                </h3>

                <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-stone-600">
                  Create a tribute page for someone you love, then invite family
                  to add memories, photos, and moments.
                </p>

                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    to="/start?intent=tribute"
                    className="inline-flex items-center justify-center rounded-full bg-[#4b1248] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#371036]"
                  >
                    Create Your First Tribute
                  </Link>

                  <Link
                    to="/example"
                    className="text-sm font-medium text-[#4b1248] underline underline-offset-4"
                  >
                    See an example tribute
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {tributes.map((tribute) => (
                  <article
                    key={tribute.id}
                    className="rounded-[1.25rem] border border-stone-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex gap-4">
                      <div className="h-16 w-16 rounded-2xl bg-stone-100" />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-serif text-xl font-semibold text-[#4b1248]">
                              {tribute.name}
                            </h3>
                            <p className="text-sm text-stone-500">
                              {tribute.years}
                            </p>
                          </div>

                          <span className="rounded-full bg-[#f1e7ef] px-3 py-1 text-xs font-semibold text-[#4b1248]">
                            {tribute.status}
                          </span>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2 text-xs text-stone-500">
                          <span>{tribute.memories || 0} memories</span>
                          <span>•</span>
                          <span>{tribute.candles || 0} candles</span>
                          <span>•</span>
                          <span>{tribute.plaqueStatus || "No plaque yet"}</span>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                          <Link
                            to={`/tribute/${tribute.id}`}
                            className="rounded-full border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50"
                          >
                            View
                          </Link>
                          <Link
                            to={`/tribute/${tribute.id}/edit`}
                            className="rounded-full border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50"
                          >
                            Edit
                          </Link>
                          <button className="rounded-full border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50">
                            Share
                          </button>
                          <Link
                            to={`/plaque/${tribute.id}`}
                            className="rounded-full bg-[#4b1248] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#371036]"
                          >
                            Order Plaque
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Create another tribute",
              text: "Add another loved one to your family memory library.",
              link: "/start?intent=tribute",
            },
            {
              title: "Share with family",
              text: "Invite relatives to add memories, photos, and moments.",
              link: "/account",
            },
            {
              title: "Order a memorial plaque",
              text: "Connect a lasting physical marker to a tribute page.",
              link: "/start?intent=plaque",
            },
          ].map((action) => (
            <Link
              key={action.title}
              to={action.link}
              className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-[#4b1248]">
                {action.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                {action.text}
              </p>
            </Link>
          ))}
        </section>

        <footer className="mt-10 text-center text-sm text-stone-500">
          Need help?{" "}
          <Link to="/faq" className="underline underline-offset-4">
            Visit our FAQ
          </Link>
        </footer>
      </div>
    </main>
  );
}
