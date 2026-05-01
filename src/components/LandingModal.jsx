import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function LandingModal({ onClose }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
  }, []);

  const closeModal = () => {
    setShow(false);
    if (onClose) onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-2 sm:px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl sm:rounded-3xl border border-stone-200 bg-white px-3 py-5 sm:px-7 sm:py-9 text-center shadow-2xl">
        {/* Close X */}
        <button
          onClick={closeModal}
          aria-label="Close modal"
          className="absolute right-4 top-4 rounded-full px-3 py-1 text-xl leading-none text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
        >
          ×
        </button>

        {/* Profile Image (right-aligned, elegant) */}
        <div className="flex justify-end mb-4 sm:mb-6">
          <img
            src="/YoungMom.png"
            alt="Young Mom"
            className="h-20 w-20 sm:h-28 sm:w-28 rounded-full border border-stone-200 object-cover shadow-lg"
            style={{ background: "#f8f1fa" }}
          />
        </div>

        {/* Picture Gallery (below main content) */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-row justify-center gap-3 sm:gap-5">
            <div className="flex flex-col items-center">
              <img
                src="/Mom%20Combing%20Hair.jpg"
                alt="Mom Combing Hair"
                className="h-20 w-20 sm:h-24 sm:w-24 rounded-xl object-cover border border-stone-200 shadow"
                style={{ background: "#f8f1fa" }}
              />
              <span className="mt-2 text-xs text-stone-500 italic">“So gentle and caring”</span>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/Mom%20w%20Flowers.jpg"
                alt="Mom with Flowers"
                className="h-20 w-20 sm:h-24 sm:w-24 rounded-xl object-cover border border-stone-200 shadow"
                style={{ background: "#f8f1fa" }}
              />
              <span className="mt-2 text-xs text-stone-500 italic">“Her smile lit up the room”</span>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/Mom%20and%20Dad%20Halloween.jpg"
                alt="Mom and Dad Halloween"
                className="h-20 w-20 sm:h-24 sm:w-24 rounded-xl object-cover border border-stone-200 shadow"
                style={{ background: "#f8f1fa" }}
              />
              <span className="mt-2 text-xs text-stone-500 italic">“Cherished family moments”</span>
            </div>
          </div>
        </div>

        {/* Campaign Label */}
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#8a5b8f]">
          Mother&apos;s Day Remembrance
        </p>

        {/* Headline */}
        <h2
          className="mb-3 text-2xl sm:mb-4 sm:text-3xl font-semibold leading-tight text-[#43124a]"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Remember her this Mother&apos;s Day
        </h2>

        {/* Body */}
        <p className="mx-auto mb-5 sm:mb-6 max-w-xs sm:max-w-sm text-sm sm:text-base leading-6 sm:leading-7 text-stone-600">
          Create a space to hold her stories, photos, and memories — and share
          it with the people who loved her too.
        </p>

        {/* Primary CTA */}
        <Link
          to="/create"
          onClick={closeModal}
          className="inline-flex w-full items-center justify-center rounded-xl bg-[#43124a] px-4 py-3 sm:px-6 sm:py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-[#340d3a]"
        >
          Create a Tribute
        </Link>

        <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-stone-500">
          Takes just a few minutes to begin.
        </p>

        {/* Learn About Plaques CTA */}
        <Link
          to="/grounds"
          onClick={closeModal}
          className="mt-4 sm:mt-5 inline-block w-full rounded-xl border border-[#43124a] bg-white px-4 py-3 sm:px-6 sm:py-3.5 text-base font-semibold text-[#43124a] shadow transition hover:bg-[#f8f1fa] hover:border-[#340d3a] hover:text-[#340d3a]"
        >
          Learn About Plaques
        </Link>

        {/* Secondary CTA */}
        <button
          onClick={closeModal}
          className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-stone-500 underline-offset-4 transition hover:text-[#43124a] hover:underline"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
