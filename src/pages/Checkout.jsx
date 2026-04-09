import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import plaqueBoxImage from "../assets/plaque-box.jpg";

const PRODUCT_CONFIG = {
  grounds: {
    label: "EverTrace Grounds",
    title: "Grounds Care Visit",
    subtitle: "Respectful gravesite care with photo updates after every visit.",
    price: "$79",
    cta: "Continue to Payment",
    companionTitle: "EverTrace Stories",
    companionText:
      "Create a digital tribute page families can visit, share, and return to over time.",
    companionButton: "Explore Stories",
    companionRoute: "/create",
  },
  stories: {
    label: "EverTrace Stories",
    title: "Memorial Medallion + Story Setup",
    subtitle:
      "A lasting way to connect a physical marker to a digital tribute page.",
    price: "$54",
    cta: "Continue to Payment",
    companionTitle: "EverTrace Grounds",
    companionText:
      "Add physical care for the resting place with respectful upkeep and photo updates.",
    companionButton: "Explore Grounds",
    companionRoute: "/grounds",
  },
};

export default function Checkout() {
  const { type } = useParams();
  const navigate = useNavigate();

  const product = useMemo(() => {
    return PRODUCT_CONFIG[type] || PRODUCT_CONFIG.grounds;
  }, [type]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    honoreeName: "",
    notes: "",
  });
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    setIsRedirecting(true);

    try {
      const selectedType = type === "stories" ? "stories" : "grounds";

      const response = await fetch("/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: selectedType,
          ...form,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.url) {
        throw new Error(data?.error || "Unable to start checkout.");
      }

      window.location.href = data.url;
    } catch (error) {
      setSubmitError(
        error?.message || "We couldn't start checkout right now. Please try again."
      );
      setIsRedirecting(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-[#f5f1e8] text-slate-900">
      <p className="absolute left-6 top-6 text-sm tracking-[0.18em] text-slate-500 md:text-base">
        {product.label}
      </p>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              {product.label}
            </p>

            <h1 className="mt-3 text-3xl font-semibold md:text-4xl">
              Complete Your EverTrace Order
            </h1>

            <p className="mt-3 max-w-2xl text-slate-600">
              A simple way to preserve their story and care for their space.
            </p>

            <div className="mt-8 rounded-2xl bg-stone-50 p-5 ring-1 ring-stone-200">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.14em] text-slate-500">
                    Selected Offering
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">{product.title}</h2>
                  <p className="mt-2 text-slate-600">{product.subtitle}</p>
                </div>

                <div className="shrink-0 rounded-xl bg-[#6f5c8d] px-4 py-3 text-white">
                  <p className="text-xs uppercase tracking-[0.14em] text-white/80">
                    Starting at
                  </p>
                  <p className="mt-1 text-2xl font-semibold">{product.price}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#6f5c8d]"
                  placeholder="Full name"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  required
                />

                <input
                  className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#6f5c8d]"
                  placeholder="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#6f5c8d]"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                />

                <input
                  className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#6f5c8d]"
                  placeholder="Loved one's name"
                  value={form.honoreeName}
                  onChange={(e) => updateField("honoreeName", e.target.value)}
                />
              </div>

              <textarea
                className="min-h-[120px] w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#6f5c8d]"
                placeholder="Anything you'd like us to know?"
                value={form.notes}
                onChange={(e) => updateField("notes", e.target.value)}
              />

              <button
                type="submit"
                disabled={isRedirecting}
                className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-base font-medium text-white transition hover:bg-slate-800"
              >
                {isRedirecting ? "Redirecting to Secure Checkout..." : product.cta}
              </button>

              {submitError ? (
                <p className="text-sm text-rose-700">{submitError}</p>
              ) : null}

              <p className="text-sm text-slate-500">
                You will review final details before payment is completed.
              </p>
            </form>
          </div>

          <aside className="space-y-6">
            {type === "stories" ? (
              <div className="overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-sm">
                <img
                  src={plaqueBoxImage}
                  alt="EverTrace memorial plaque in keepsake box"
                  className="h-72 w-full object-cover"
                />
              </div>
            ) : null}

            <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Another Way to Remember
              </p>

              <h3 className="mt-3 text-2xl font-semibold">
                {product.companionTitle}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">{product.companionText}</p>

              <button
                onClick={() => navigate(product.companionRoute)}
                className="mt-5 inline-flex rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 transition hover:bg-stone-50"
              >
                {product.companionButton}
              </button>
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-[#efe8dc] p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">EverTrace</p>

              <p className="mt-3 text-xl font-semibold text-slate-900">
                Preserve their story. Care for their space.
              </p>

              <p className="mt-3 leading-7 text-slate-600">
                EverTrace brings together digital remembrance and physical care,
                so families can honor someone they love in more than one way.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
