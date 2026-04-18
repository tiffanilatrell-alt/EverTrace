import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

export default function InvitingFamilyContribute() {
  const [copied, setCopied] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareUrl =
    typeof window !== "undefined" && window.location.hostname.includes("localhost")
      ? `https://evertrace.life${window.location.pathname}`
      : pageUrl;
  const pageTitle = "Mother's Day feels different when she's gone.";
  const pageDescription = "A gentle way to honor her memory — and begin capturing the moments that still live with you.";
  const pageImage = "https://evertrace.life/strandsofgrass.jpg";

  useEffect(() => {
    document.title = "Honoring Mom on Mother's Day | EverTrace";
  }, []);

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
        <title>Honoring Mom on Mother's Day | EverTrace</title>
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
          backgroundImage: "url('/strandsofgrass.jpg')",
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
          Honoring Mom on Mother's Day
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Gentle ways to remember, reflect, and carry her with you
        </p>

        <div className="mt-10 space-y-10 text-lg leading-8 text-slate-700">
          <section>
            <p>Mother's Day can be complicated.</p>
            <p className="mt-5">For some, it's filled with celebration.</p>
            <p>
              For others, it carries a quiet kind of weight - one that shows up in small moments
              throughout the day.
            </p>
            <p className="mt-5">A song.</p>
            <p>A scent.</p>
            <p>A memory that comes back without warning.</p>
            <p className="mt-5">
              If your mom is no longer here, or your relationship with her was layered and complex,
              this day can feel different.
            </p>
            <p className="mt-5">And that's okay.</p>
            <p className="mt-5">There is no one right way to move through it.</p>
            <p className="mt-5">
              But there are gentle ways to honor her - in ways that feel personal, meaningful, and
              true to your story.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Let the day be what it is</h2>
            <p className="mt-4">
              There's often an unspoken pressure around Mother's Day - to feel a certain way, to
              celebrate a certain way, to show up like everyone else.
            </p>
            <p className="mt-4">But your experience doesn't have to match anyone else's.</p>
            <p className="mt-4">You might feel:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>gratitude</li>
              <li>sadness</li>
              <li>peace</li>
              <li>longing</li>
              <li>or all of it at once</li>
            </ul>
            <p className="mt-5">You don't need to fix those feelings.</p>
            <p className="mt-3">You're allowed to simply notice them.</p>
            <p className="mt-3">And move through the day in a way that feels right for you.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Create a small moment of remembrance
            </h2>
            <p className="mt-4">Honoring your mom doesn't have to be big.</p>
            <p className="mt-3">Sometimes the most meaningful gestures are the quiet ones.</p>
            <p className="mt-4">You might:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Light a candle in her memory</li>
              <li>Play a song she loved</li>
              <li>Cook something she used to make</li>
              <li>Visit a place that reminds you of her</li>
              <li>Look through old photos</li>
            </ul>
            <p className="mt-5">These moments don't have to be shared or posted.</p>
            <p className="mt-3">They're just for you.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Write something - even if it's just for you
            </h2>
            <p className="mt-4">If you're not sure how to "do" Mother's Day, try this:</p>
            <p className="mt-3">Write to her.</p>
            <p className="mt-4">It doesn't need to be perfect.</p>
            <p>It doesn't need to be long.</p>
            <p>Just begin.</p>
            <p className="mt-4">You might start with:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>"I've been thinking about you today..."</li>
              <li>"One thing I wish I could tell you is..."</li>
              <li>"I remember when..."</li>
            </ul>
            <p className="mt-5">
              Sometimes writing opens a door that feels hard to reach otherwise.
            </p>
            <p className="mt-4">And what you write doesn't have to stay private.</p>
            <p>It can become something you return to.</p>
            <p>Something you build on.</p>
            <p>Something you share, if and when you're ready.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Honor the relationship you had - not the one expected
            </h2>
            <p className="mt-4">Not every mother-daughter or mother-child relationship is simple.</p>
            <p className="mt-4">Some are deeply loving.</p>
            <p>Some are complicated.</p>
            <p>Some are marked by both.</p>
            <p className="mt-5">You don't have to rewrite your story to fit the day.</p>
            <p className="mt-4">You can honor:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>what was good</li>
              <li>what shaped you</li>
              <li>what you learned</li>
              <li>what you carry forward</li>
            </ul>
            <p className="mt-5">Even complexity deserves space.</p>
            <p className="mt-3">Even imperfect love leaves a mark.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Include others, if it feels right
            </h2>
            <p className="mt-4">You're not the only one who remembers her.</p>
            <p className="mt-4">Sometimes it helps to:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>call a sibling</li>
              <li>text a relative</li>
              <li>share a memory with someone who knew her</li>
            </ul>
            <p className="mt-5">
              You might be surprised what others remember - the details, the stories, the moments
              you didn't see.
            </p>
            <p className="mt-3">And together, those pieces form something fuller.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Let remembrance grow over time
            </h2>
            <p className="mt-4">Memory doesn't live in one moment.</p>
            <p>It changes. It deepens. It returns in new ways.</p>
            <p className="mt-4">Mother's Day can be one point in that rhythm - not the only one.</p>
            <p className="mt-4">
              You may find that what starts as a single memory becomes something more over time:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>a collection of stories</li>
              <li>a place to revisit</li>
              <li>something shared across family</li>
            </ul>
            <p className="mt-5">That's how remembrance becomes lasting.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">A gentle way to begin</h2>
            <p className="mt-4">If you're not sure what to do today, start small.</p>
            <p className="mt-4">Think of one memory.</p>
            <p>One moment.</p>
            <p>One thing you want to hold onto.</p>
            <p className="mt-4">That's enough.</p>
            <p className="mt-4">
              Over time, those pieces become something meaningful - something you can return to, add
              to, and share with others who loved her too.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Closing Thought</h2>
            <p className="mt-4">Mother's Day may never feel the same.</p>
            <p className="mt-4">But it can still hold meaning.</p>
            <p className="mt-4">Not in the way it used to - but in a quieter, more personal way.</p>
            <p className="mt-4">A way that allows you to remember her as she was.</p>
            <p>And carry her forward in your own life.</p>
          </section>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-10">
          <div className="mx-auto max-w-2xl rounded-3xl border border-[#d9cae3] bg-[#faf6fd] p-8 text-center shadow-sm">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Start with a memory.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              If you'd like a place to write, reflect, or gather memories about your mom, you can
              begin a tribute anytime.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-700">There's no pressure to finish.</p>
            <p className="text-lg leading-8 text-slate-700">
              Just a space to start - and return to when you're ready.
            </p>

            <div className="mt-7">
              <Link
                to="/create"
                className="inline-flex items-center rounded-2xl bg-[#43124a] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#340d3a]"
              >
                👉 Start a Tribute
              </Link>
            </div>
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
