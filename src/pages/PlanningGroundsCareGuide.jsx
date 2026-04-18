import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

export default function PlanningGroundsCareGuide() {
  const [copied, setCopied] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareUrl =
    typeof window !== "undefined" && window.location.hostname.includes("localhost")
      ? `https://evertrace.life${window.location.pathname}`
      : pageUrl;
  const pageTitle = "A Simple Care Checklist";
  const pageDescription = "Keeping a place of remembrance tended, without overwhelm.";
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
          A Simple Care Checklist
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Keeping a place of remembrance tended, without overwhelm
        </p>
        <p className="mt-4 text-base text-slate-700">
          You don't need to do everything at once. What matters is returning, consistently and with
          intention.
        </p>

        <div className="mt-10 space-y-6 text-lg leading-8 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Set a Rhythm</h2>
            <ul className="mt-3 space-y-2">
              <li>☐ Choose a simple cadence (monthly or every other month)</li>
              <li>☐ Mark meaningful dates (birthdays, anniversaries, holidays)</li>
              <li>☐ Add reminders so visits don't get lost in busy schedules</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Keep It Fresh</h2>
            <ul className="mt-3 space-y-2">
              <li>☐ Replace or refresh flowers</li>
              <li>☐ Remove old or weathered arrangements</li>
              <li>☐ Wipe down surfaces (headstone, plaque, surrounding area)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Tend the Space</h2>
            <ul className="mt-3 space-y-2">
              <li>☐ Clear away leaves, debris, or overgrowth</li>
              <li>☐ Check for any damage or wear</li>
              <li>☐ Straighten or reset items that may have shifted</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Stay Connected</h2>
            <ul className="mt-3 space-y-2">
              <li>☐ Add or update photos on their tribute page</li>
              <li>☐ Revisit memories already shared</li>
              <li>☐ Invite family members to contribute something new</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Pause for a Moment</h2>
            <ul className="mt-3 space-y-2">
              <li>☐ Take a quiet minute while you're there</li>
              <li>☐ Reflect, speak, or simply sit</li>
              <li>☐ Let the visit be more than a task</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Over Time</h2>
            <ul className="mt-3 space-y-2">
              <li>☐ Revisit the space regularly, even in small ways</li>
              <li>☐ Keep care simple so it remains sustainable</li>
              <li>☐ Remember: consistency matters more than perfection</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-10">
          <div className="mx-auto max-w-2xl rounded-3xl border border-[#d9cae3] bg-[#faf6fd] p-8 text-center shadow-sm">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
              Ready to schedule visits?
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              Start a tribute or arrange grounds care to keep this place tended and remembered.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Link
                to="/create"
                className="inline-flex items-center justify-center rounded-2xl bg-[#43124a] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#340d3a]"
              >
                Create a Tribute
              </Link>
              <Link
                to="/grounds"
                className="inline-flex items-center justify-center rounded-2xl border border-[#cdb8d8] bg-white px-7 py-3 text-sm font-semibold text-[#43124a] transition hover:bg-[#f9f4fc]"
              >
                Schedule Grounds Care
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
