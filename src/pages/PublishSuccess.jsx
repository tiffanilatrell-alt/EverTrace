import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PublishSuccess() {
  const navigate = useNavigate();
  const { tributeId } = useParams();
  // These would be passed in or loaded in a real app
  const tributeName = "Your Loved One"; // Replace with real name if available
  const tributeLink = `https://evertrace.life/tribute/${tributeId || "abc123"}`;
  const editLink = `${tributeLink}?edit=YOUR_EDIT_TOKEN`;
  const facebookUrl = "https://www.facebook.com/profile.php?id=61578069147573";

  const [copied, setCopied] = useState("");

  function copyToClipboard(text, label) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }

  function handleEmail(link) {
    const subject = "A tribute page to share";
    const body = `Here is the tribute page:\n\n${link}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function handleText(link) {
    window.location.href = `sms:&body=${encodeURIComponent(link)}`;
  }

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-16 text-slate-800 sm:px-6">
      <div className="mx-auto max-w-lg rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-8">
        {/* 1. Confirmation Header */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-center text-emerald-900 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Tribute Published
          </div>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Your tribute has been created</h1>
          <p className="mt-3 text-lg text-slate-600">
            A beautiful space to remember <span className="font-semibold" style={{ color: '#000', background: 'none', WebkitBackgroundClip: 'unset', backgroundClip: 'unset', textShadow: 'none' }}>{tributeName}</span> is now live.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-stone-200 bg-white p-7 shadow-sm sm:p-8">
          <h3 className="text-center text-xl font-semibold text-slate-900 sm:text-2xl">
            Make it a lasting memorial
          </h3>

          <div className="mt-5 space-y-5">
            <div className="w-full overflow-hidden rounded-xl">
              <img
                src="/qrBoxAndScanSplit.PNG"
                alt="EverTrace memorial plaque"
                className="w-full object-cover transition-transform duration-300 ease-out hover:scale-[1.03]"
              />
            </div>

            <p className="text-center text-base leading-7 text-slate-600">
              Place a beautifully crafted EverTrace plaque somewhere meaningful.
              Anyone can scan it to visit this tribute and remember together.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => navigate("/checkout/stories")}
                className="w-full rounded-xl bg-slate-900 px-6 py-3.5 text-base font-medium text-white transition hover:bg-slate-800 sm:w-auto"
              >
                Order Memorial Plaque
              </button>

              <button className="text-sm text-slate-600 underline">
                See how it works
              </button>
            </div>
          </div>
        </div>

        {/* 2. Tribute Link (PRIMARY ACTION) */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="flex w-full flex-col items-stretch gap-2 sm:flex-row sm:items-center">
            <span className="w-full min-w-0 break-all rounded-lg bg-stone-100 px-3 py-2 text-sm font-medium text-slate-800 sm:text-base">
              {tributeLink}
            </span>
            <button
              onClick={() => copyToClipboard(tributeLink, "link")}
              className="rounded-md bg-emerald-700 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-800 sm:w-auto"
            >
              Copy
            </button>
          </div>
          <p className="text-sm text-slate-500 mt-1">Share this with family so they can add memories.</p>
        </div>

        <div className="mt-5 flex justify-center">
          <button
            onClick={() => navigate(`/tribute/${tributeId}`)}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 transition hover:bg-stone-100"
          >
            View Tribute Page
          </button>
        </div>

        {/* 3. Share Actions */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => copyToClipboard(tributeLink, "link")}
            className="rounded-full border border-emerald-700 bg-white px-5 py-2 text-emerald-700 hover:bg-emerald-50"
          >
            Copy Link
          </button>
          <button
            onClick={() => handleText(tributeLink)}
            className="rounded-full border border-emerald-700 bg-white px-5 py-2 text-emerald-700 hover:bg-emerald-50"
          >
            Text It
          </button>
          <button
            onClick={() => handleEmail(tributeLink)}
            className="rounded-full border border-emerald-700 bg-white px-5 py-2 text-emerald-700 hover:bg-emerald-50"
          >
            Email It
          </button>
        </div>

        {/* 4. Edit Link (Ownership Moment) */}
        <div className="mt-10 rounded-2xl border border-stone-200 bg-stone-50 p-5 text-center">
          <div className="font-medium text-slate-900 mb-2">Manage this tribute later</div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <button
              onClick={() => copyToClipboard(editLink, "edit")}
              className="rounded-full border border-slate-400 bg-white px-4 py-2 text-slate-700 hover:bg-slate-100"
            >
              Copy Edit Link
            </button>
            <button
              onClick={() => handleEmail(editLink)}
              className="rounded-full border border-slate-400 bg-white px-4 py-2 text-slate-700 hover:bg-slate-100"
            >
              Email Edit Link
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Save this link to edit or update the tribute anytime.
          </p>
        </div>

        {/* 5. Light Education (Subtle) */}
        <div className="mt-10 rounded-xl bg-emerald-50 px-5 py-4 text-center text-emerald-900">
          <div className="font-semibold mb-1">What happens next?</div>
          <ul className="text-sm list-disc list-inside text-emerald-900">
            <li>Family can visit and add memories</li>
            <li>You can return anytime to update</li>
            <li>This page will grow over time</li>
          </ul>
        </div>

        {/* 6. Emotional Reinforcement */}
        <div className="mt-8 text-center text-base italic text-slate-700">
          Every memory shared keeps their story alive.
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href={facebookUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Follow us on Facebook"
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-stone-100"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1877F2] text-white">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                <path d="M13.5 8.5V6.8c0-.7.5-.8.8-.8h1.2V3h-1.6c-2.2 0-2.9 1.6-2.9 2.9v2.6H9v3h2v8h3v-8h2.2l.3-3z" />
              </svg>
            </span>
            Follow us
          </a>
        </div>

        {/* Copied feedback */}
        {copied && (
          <div className="fixed left-1/2 top-8 z-50 -translate-x-1/2 rounded-xl bg-emerald-700 px-6 py-3 text-white shadow-lg">
            {copied === "link" && "Link copied!"}
            {copied === "edit" && "Edit link copied!"}
          </div>
        )}
      </div>
    </main>
  );
}
