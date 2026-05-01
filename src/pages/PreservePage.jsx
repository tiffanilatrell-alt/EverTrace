import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import plaqueBoxImage from "../assets/plaque-box.jpg";
import { getTributeById } from "../lib/tribute";

function formatYears(birthYear, passingYear) {
  if (!birthYear && !passingYear) return "";
  return `${birthYear || "-"} - ${passingYear || "-"}`;
}

function getPrimaryPhoto(tribute) {
  if (!tribute) return "";
  if (tribute.primaryPhotoUrl) return tribute.primaryPhotoUrl;
  if (Array.isArray(tribute.photoUrls) && tribute.photoUrls.length > 0) {
    return tribute.photoUrls[0];
  }
  return "";
}

function getExcerpt(message) {
  if (!message) return "";
  const trimmed = message.trim();
  if (trimmed.length <= 160) return trimmed;
  return `${trimmed.slice(0, 157)}...`;
}

function LoadingState() {
  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="h-3 w-32 rounded-full bg-stone-200" />
      <div className="mt-4 h-8 w-2/3 rounded-lg bg-stone-200" />
      <div className="mt-3 h-5 w-full rounded-lg bg-stone-100" />
      <div className="mt-2 h-5 w-5/6 rounded-lg bg-stone-100" />
      <div className="mt-6 grid gap-4 sm:grid-cols-[120px_1fr]">
        <div className="h-28 rounded-xl bg-stone-100" />
        <div>
          <div className="h-6 w-40 rounded-lg bg-stone-200" />
          <div className="mt-3 h-4 w-28 rounded-lg bg-stone-100" />
          <div className="mt-4 h-4 w-full rounded-lg bg-stone-100" />
          <div className="mt-2 h-4 w-4/5 rounded-lg bg-stone-100" />
        </div>
      </div>
    </div>
  );
}

function PreviewCard({ tribute }) {
  const tributeName = tribute?.name || "Her tribute";
  const years = formatYears(tribute?.birthYear, tribute?.passingYear);
  const excerpt = getExcerpt(tribute?.message);
  const previewPhoto = getPrimaryPhoto(tribute);

  return (
    <article className="mx-auto mt-10 max-w-3xl rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid gap-4 sm:grid-cols-[120px_1fr] sm:items-start">
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
          {previewPhoto ? (
            <img
              src={previewPhoto}
              alt={`Preview of ${tributeName}`}
              className="h-32 w-full object-cover sm:h-full"
            />
          ) : (
            <div className="flex h-32 items-center justify-center bg-stone-100 text-sm text-stone-500 sm:h-full">
              No tribute photo yet
            </div>
          )}
        </div>

        <div>
          <h2 className="font-serif text-2xl text-slate-900">{tributeName}</h2>
          {years ? <p className="mt-2 text-sm text-slate-500">{years}</p> : null}
          {excerpt ? (
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">{excerpt}</p>
          ) : (
            <p className="mt-3 leading-7 text-slate-500">
              A quiet place for family to gather around her story, photos, and
              shared memory.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

function DecisionCard({
  eyebrow,
  title,
  body,
  cta,
  onClick,
  featured = false,
  image,
  imageAlt,
}) {
  return (
    <article
      className={[
        "rounded-2xl border bg-white p-6 transition sm:p-8",
        featured
          ? "border-stone-300 shadow-md ring-1 ring-stone-200"
          : "border-stone-200 shadow-sm",
      ].join(" ")}
    >
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{eyebrow}</p>
      <h3 className="mt-3 font-serif text-2xl text-slate-900 sm:text-3xl">{title}</h3>
      <p className="mt-3 leading-7 text-slate-600">{body}</p>

      {image ? (
        <div className="mt-6 overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
          <img src={image} alt={imageAlt} className="h-44 w-full object-cover" />
        </div>
      ) : null}

      <button
        type="button"
        onClick={onClick}
        className={[
          "mt-7 inline-flex rounded-xl px-5 py-3 text-sm font-medium transition",
          featured
            ? "bg-slate-900 text-white hover:bg-slate-800"
            : "border border-stone-300 bg-white text-slate-800 hover:bg-stone-50",
        ].join(" ")}
      >
        {cta}
      </button>
    </article>
  );
}

function GroundsBullet({ children }) {
  return (
    <li className="flex items-start gap-3 text-slate-700">
      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-stone-500" />
      <span>{children}</span>
    </li>
  );
}

export default function PreservePage() {
  const { tributeId } = useParams();
  const navigate = useNavigate();

  const [tribute, setTribute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadTribute() {
      if (!tributeId) {
        if (isMounted) {
          setLoading(false);
          setLoadFailed(true);
        }
        return;
      }

      try {
        setLoading(true);
        setLoadFailed(false);

        const data = await getTributeById(tributeId);

        if (!isMounted) return;

        if (!data) {
          setTribute(null);
          setLoadFailed(true);
        } else {
          setTribute(data);
          setLoadFailed(false);
        }
      } catch {
        if (!isMounted) return;
        setTribute(null);
        setLoadFailed(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadTribute();

    return () => {
      isMounted = false;
    };
  }, [tributeId]);

  function goToTribute() {
    navigate(`/tribute/${tributeId}`);
  }

  function goToPlaque() {
    navigate("/checkout/stories");
  }

  function goToGrounds() {
    navigate("/grounds");
  }

  return (
    <main className="min-h-screen bg-[#f6f2ea] text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <header className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Preserve Her Tribute
          </p>
          <h1 className="mt-4 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl md:text-5xl">
            Choose how you want to honor her memory
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            Keep her tribute online for family to revisit, or preserve it in the
            physical world with a memorial plaque linked directly to her story.
          </p>
        </header>

        {loading ? <LoadingState /> : null}

        {!loading && loadFailed ? (
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-sm">
            <p className="leading-7 text-slate-600">
              We couldn't load this tribute right now, but you can still explore
              preservation options.
            </p>
          </div>
        ) : null}

        {!loading && !loadFailed && tribute ? <PreviewCard tribute={tribute} /> : null}

        <section className="mt-16 grid gap-6 lg:grid-cols-[0.96fr_1.04fr] lg:items-stretch">
          <DecisionCard
            eyebrow="Digital remembrance"
            title="Digital Tribute"
            body="A living space for her story, photos, and the memories family shares over time."
            cta="Continue Her Tribute"
            onClick={goToTribute}
          />

          <DecisionCard
            eyebrow="Physical remembrance"
            title="Memorial Plaque"
            body="A lasting physical plaque that links directly to her tribute, so loved ones can visit, scan, and remember with care."
            cta="Honor Her With a Plaque"
            onClick={goToPlaque}
            featured
            image={plaqueBoxImage}
            imageAlt="EverTrace memorial plaque in a keepsake presentation box"
          />
        </section>

        <section className="mx-auto mt-16 max-w-4xl text-center">
          <h2 className="font-serif text-2xl text-slate-900 sm:text-3xl">
            Two beautiful ways to carry her memory forward
          </h2>
          <p className="mx-auto mt-4 max-w-3xl leading-8 text-slate-600">
            Her tribute keeps memories living online. The plaque gives that
            remembrance a physical place in the world, something family can
            return to again and again.
          </p>
        </section>

        <section className="mt-16 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Also available
              </p>
              <h2 className="mt-3 font-serif text-2xl text-slate-900 sm:text-3xl">
                Care for her place of remembrance
              </h2>
              <p className="mt-4 leading-8 text-slate-600">
                When you cannot visit, EverTrace Grounds helps care for the
                place where she rests with thoughtful service and photo updates
                after each completed visit.
              </p>

              <ul className="mt-6 space-y-3">
                <GroundsBullet>Respectful memorial-area care</GroundsBullet>
                <GroundsBullet>Optional flowers or placement support</GroundsBullet>
                <GroundsBullet>Photo updates after each visit</GroundsBullet>
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={goToGrounds}
                  className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Schedule a Grounds Visit
                </button>
                <button
                  type="button"
                  onClick={goToGrounds}
                  className="inline-flex rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 transition hover:bg-stone-50"
                >
                  Learn How Grounds Works
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
              <img
                src="/GravesiteBeforeAndAfter.webp"
                alt="EverTrace Grounds before and after gravesite care"
                className="h-72 w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-4xl rounded-2xl border border-stone-200 bg-white px-6 py-10 text-center shadow-sm sm:px-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Preserve This Tribute</p>
          <h2 className="mb-2 font-serif text-2xl font-semibold text-slate-900 sm:text-3xl">Connect it to a lasting plaque</h2>
          <p className="mb-6 text-base leading-7 text-slate-600">Place this memory somewhere family can visit, scan, and return to. The plaque becomes a physical doorway to the stories held here.</p>
          <div className="mb-6 flex items-center justify-center">
            <div className="w-full max-w-xs rounded-xl border border-dashed border-stone-300 bg-stone-50 p-4">
              <img
                src="/qrCodeInBox.jpg"
                alt="QR plaque preview area"
                className="mx-auto h-40 w-auto object-contain"
                style={{ background: '#f8f1fa' }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={goToPlaque}
            className="mb-2 mt-2 inline-flex w-full max-w-xs justify-center rounded-xl border border-stone-300 bg-white px-6 py-3 text-base font-semibold text-slate-900 shadow transition hover:bg-stone-50"
          >
            Learn About Plaques
          </button>
        </section>
      </section>
    </main>
  );
}
