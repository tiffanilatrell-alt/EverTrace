import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { db } from "../firebaseClient";
import plaqueBoxImage from "../assets/plaque-box.jpg";

export default function PlaquePurchase() {
  const { tributeId } = useParams();
  const navigate = useNavigate();

  const [tribute, setTribute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTribute() {
      try {
        setLoading(true);
        setError("");

        const tributeRef = doc(db, "tributes", tributeId);
        const tributeSnap = await getDoc(tributeRef);

        if (!tributeSnap.exists()) {
          setError("We couldn’t find that tribute.");
          setLoading(false);
          return;
        }

        setTribute({
          id: tributeSnap.id,
          ...tributeSnap.data(),
        });
      } catch (err) {
        console.error("Error loading tribute for plaque purchase page:", err);
        setError("Something went wrong while loading this page.");
      } finally {
        setLoading(false);
      }
    }

    if (tributeId) {
      loadTribute();
    }
  }, [tributeId]);

  function handleContinuePurchase() {
    // Placeholder for your future checkout flow
    alert("Next step: connect this button to your plaque checkout or order flow.");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-stone-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-neutral-300">Loading plaque details...</p>
        </div>
      </main>
    );
  }

  if (error || !tribute) {
    return (
      <main className="min-h-screen bg-stone-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-sm uppercase tracking-[0.22em] text-amber-200/80">
            EverTrace Memorial Plaque
          </p>

          <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
            Memorial Plaque
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-300">
            {error || "Tribute not found."}
          </p>

          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex rounded-2xl border border-white/20 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const displayName = tribute.name || "Your Loved One";

  const years =
    tribute.birthYear || tribute.passingYear
      ? `${tribute.birthYear || "—"} — ${tribute.passingYear || "—"}`
      : "";

  return (
    <main className="min-h-screen bg-stone-950 text-white">
      <section className="px-6 py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="mb-3 text-sm uppercase tracking-[0.22em] text-amber-200/80">
              EverTrace Memorial Plaque
            </p>

            <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
              Bring their memory into a place of honor.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-300">
              Create a memorial plaque that gives family and visitors a simple
              way to return to {displayName}’s tribute, memories, and photos
              with a single scan.
            </p>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-400">
                Connected Tribute
              </p>

              <h2 className="mt-3 font-serif text-3xl text-white">
                {displayName}
              </h2>

              {years ? (
                <p className="mt-2 text-neutral-400">{years}</p>
              ) : null}

              {tribute.message ? (
                <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-300">
                  {tribute.message}
                </p>
              ) : (
                <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-400">
                  This plaque will connect visitors to their tribute page and
                  the memories shared there.
                </p>
              )}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white">Elegant keepsake</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  A physical object designed to feel meaningful from the moment
                  it arrives.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white">Instant access</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  Visitors scan once and open the tribute page immediately.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white">Built for remembrance</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  A bridge between the physical place and the digital memory.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleContinuePurchase}
                className="rounded-2xl bg-white px-6 py-3 text-sm font-medium text-stone-950 transition-all duration-300 hover:shadow-lg"
              >
                Continue to Purchase
              </motion.button>

              <button
                onClick={() => navigate(-1)}
                className="rounded-2xl border border-white/20 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10"
              >
                Back to Tribute
              </button>
            </div>

            <p className="mt-4 text-sm text-neutral-500">
              A lasting marker for remembrance, reflection, and family
              connection.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl">
              <div className="absolute left-4 top-4 z-10 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                Keepsake Plaque
              </div>

              <img
                src={plaqueBoxImage}
                alt="EverTrace memorial plaque displayed in a wooden keepsake box"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-5 text-center">
              <p className="font-serif text-2xl text-white">
                A lasting tribute, made physical
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                Designed to help loved ones return to stories, photos, and
                shared memory with a simple scan.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}