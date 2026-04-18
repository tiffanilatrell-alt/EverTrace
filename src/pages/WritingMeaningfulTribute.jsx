import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

export default function WritingMeaningfulTribute() {
  const [copied, setCopied] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareUrl =
    typeof window !== "undefined" && window.location.hostname.includes("localhost")
      ? `https://evertrace.life${window.location.pathname}`
      : pageUrl;
  const pageTitle = "Writing a Meaningful Tribute";
  const pageDescription = "Prompts and examples to help you begin a tribute with confidence and warmth.";
  const pageImage = "https://evertrace.life/greenbranch.png";

  useEffect(() => {
    document.title = `${pageTitle} | EverTrace`;
  }, [pageTitle]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: "Facebook",
      icon: "f",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(pageTitle + " - " + pageDescription)}`,
    },
    {
      name: "LinkedIn",
      icon: "in",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Email",
      icon: "✉",
      url: `mailto:?subject=${encodeURIComponent(pageTitle)}&body=${encodeURIComponent(pageDescription + "\n\n" + shareUrl)}`,
    },
    {
      name: "SMS",
      icon: "💬",
      url: `sms:?body=${encodeURIComponent(pageTitle + ": " + shareUrl)}`,
    },
  ];
  return (
    <>
      <Helmet>
        <title>{pageTitle} | EverTrace</title>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:image" content={pageImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
      </Helmet>
      <main
        className="min-h-screen px-6 py-16 text-slate-900"
        style={{
          backgroundImage: "url('/greenbranch.png')",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
      {/* Share Buttons - Vertical Bar (Desktop) */}
      <div className="hidden md:fixed md:right-6 md:top-24 md:z-40 md:flex md:flex-col md:gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#43124a] text-white transition hover:bg-[#340d3a] shadow-md"
            title={link.name}
          >
            {link.icon}
          </a>
        ))}
        <button
          onClick={handleCopyLink}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-600 text-white transition hover:bg-slate-700 shadow-md"
          title="Copy link"
        >
          {copied ? "✓" : "🔗"}
        </button>
      </div>

      {/* Share FAB - Mobile */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        {fabOpen && (
          <div className="absolute bottom-16 right-0 flex flex-col gap-2 rounded-2xl bg-white p-3 shadow-lg">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#43124a] text-white transition hover:bg-[#340d3a]"
                title={link.name}
                onClick={() => setFabOpen(false)}
              >
                {link.icon}
              </a>
            ))}
            <button
              onClick={() => {
                handleCopyLink();
                setFabOpen(false);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-600 text-white transition hover:bg-slate-700"
              title="Copy link"
            >
              {copied ? "✓" : "🔗"}
            </button>
          </div>
        )}
        <button
          onClick={() => setFabOpen(!fabOpen)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#43124a] text-white shadow-lg transition hover:bg-[#340d3a]"
          title="Share"
        >
          📤
        </button>
      </div>

      <section className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Resource</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
          Writing a Meaningful Tribute
        </h1>
        <p className="mt-4 text-xl leading-8 text-slate-700">
          Prompts and examples to help you begin with confidence and warmth.
        </p>
        <p className="mt-2 text-base italic text-slate-600">
          You don't need perfect words. Just honest ones.
        </p>

        <div className="mt-10 space-y-10 text-lg leading-8 text-slate-700">
          <section>
            <p>There's a quiet moment that comes when you sit down to write about someone you love.</p>
            <p className="mt-5">You might have the page open.</p>
            <p>You might have photos nearby.</p>
            <p>You might even know exactly what you feel.</p>
            <p className="mt-5">But the words don't always come easily.</p>
            <p className="mt-5">And that's okay.</p>
            <p className="mt-5">
              Writing a tribute isn't about finding the perfect words. It's about finding true ones
              - the kind that reflect who they were and what they meant.
            </p>
            <p className="mt-5">
              At EverTrace, we believe every life deserves to be remembered in a way that feels
              personal, lasting, and real - a kind of <span className="font-semibold">history you can hold</span>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Start with what made them them
            </h2>
            <p className="mt-4">Before writing full sentences, begin with simple truths:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>What did people always say about them?</li>
              <li>What did they love?</li>
              <li>How did they make others feel?</li>
              <li>What small moments capture who they were?</li>
            </ul>
            <p className="mt-5">You don't need a full story yet. Just begin with fragments.</p>
            <p className="mt-3">Sometimes, a single sentence is enough to begin.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">A gentle way to begin</h2>
            <p className="mt-4">If you're unsure where to start, this simple structure can help:</p>
            <ol className="mt-4 space-y-2 pl-1">
              <li>1. Who they were</li>
              <li>2. What they loved</li>
              <li>3. How they showed up in the world</li>
              <li>4. What they meant to you</li>
            </ol>
            <p className="mt-5">You don't need to follow it perfectly - it's just a place to begin.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">A simple tribute example</h2>
            <blockquote className="mt-5 rounded-2xl border border-[#d9cae3] bg-[#f9f4fc] p-6 text-slate-700 shadow-sm">
              <p>Mary was the kind of person who made everything feel warmer.</p>
              <p className="mt-4">
                She loved deeply - her family, her friends, and the small traditions that brought
                people together. Sunday dinners were never just meals; they were moments she
                created for others to feel at home.
              </p>
              <p className="mt-4">
                She had a quiet strength about her. The kind that didn't need to be announced, but
                was always felt.
              </p>
              <p className="mt-4">To me, she was home. And in so many ways, she still is.</p>
            </blockquote>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              If you're feeling stuck, start here
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-900">One thing I'll always remember is...</h3>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  One thing I'll always remember is how she laughed - fully, without holding back.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-900">They were known for...</h3>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  He was known for his kindness, the kind that showed up in small, everyday ways.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-900">Being around them felt like...</h3>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  Being around her felt like being understood without having to explain anything.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-900">A moment that captures them is...</h3>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  A moment that captures him perfectly is sitting outside, music playing, telling
                  stories like time didn't exist.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:col-span-2">
                <h3 className="text-base font-semibold text-slate-900">They taught me...</h3>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  She taught me that love isn't always loud - sometimes it's steady and constant.
                </p>
              </article>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              It doesn't have to be finished today
            </h2>
            <p className="mt-4">A tribute isn't something you have to complete all at once.</p>
            <p className="mt-4">It can grow over time.</p>
            <p className="mt-4">You might add a memory later.</p>
            <p>Include a photo.</p>
            <p>Invite others to share their stories.</p>
            <p className="mt-4">Because memory isn't static - it's something we build together.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              You don't have to do this alone
            </h2>
            <p className="mt-4">Often, the most meaningful tributes aren't written by one person.</p>
            <p className="mt-4">They're shaped by many.</p>
            <p className="mt-4">Family members.</p>
            <p>Friends.</p>
            <p>People who carry different pieces of the same story.</p>
            <p className="mt-4">That's what turns a tribute into something lasting.</p>
          </section>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-10">
          <div className="mx-auto max-w-2xl rounded-3xl border border-[#d9cae3] bg-[#faf6fd] p-8 text-center shadow-sm">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Start with a single memory</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">You don't need the full story today.</p>
            <p className="text-lg leading-8 text-slate-700">Just one sentence. One moment. One memory.</p>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              You can always come back and add more - and invite others to do the same.
            </p>
            <p className="text-lg leading-8 text-slate-700">Over time, it becomes something bigger than a page.</p>
            <p className="mt-4 text-lg leading-8 text-slate-700">It becomes a place to return to.</p>
            <p className="text-lg leading-8 text-slate-700">A place to share.</p>
            <p className="text-lg leading-8 text-slate-700">A place to remember.</p>

            <div className="mt-7">
              <Link
                to="/create"
                className="inline-flex items-center rounded-2xl bg-[#43124a] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#340d3a]"
              >
                Start a Tribute
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-600">No cost to begin. Add to it anytime.</p>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-3">
          <Link
            to="/resources"
            className="inline-flex items-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
          >
            Back to Resources
          </Link>
          <Link
            to="/"
            className="inline-flex items-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Back to Home
          </Link>
        </div>
      </section>
      </main>
    </>
  );
}
