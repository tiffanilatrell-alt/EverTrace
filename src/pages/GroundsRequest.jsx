import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseClient";
import { logGroundsEvent } from "../lib/groundsEvents";

export default function GroundsRequest() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cemeteryName: "",
    cemeteryCity: "",
    lovedOneName: "",
    serviceType: "one-time",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    void logGroundsEvent("grounds_request_page_view", {
      sourcePage: "/grounds/request",
    });
  }, []);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.cemeteryName || !form.cemeteryCity || !form.lovedOneName) {
      setError("Please fill out the required fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      await addDoc(collection(db, "groundsRequests"), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        cemeteryName: form.cemeteryName,
        cemeteryCity: form.cemeteryCity,
        lovedOneName: form.lovedOneName,
        serviceType: form.serviceType,
        notes: form.notes,
        status: "new",
        createdAt: serverTimestamp(),
      });

      navigate("/grounds/thanks");
    } catch (err) {
      console.error(err);
      setError("We couldn't submit your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f1e8] px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-2xl rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">Request Grounds Care</h1>
        <p className="mt-3 text-slate-600">
          Tell us a little about the resting place you'd like cared for. We'll review your request and follow up shortly.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            className="w-full rounded-xl border border-stone-300 px-4 py-3"
            placeholder="Your name *"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />

          <input
            className="w-full rounded-xl border border-stone-300 px-4 py-3"
            placeholder="Email *"
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
          />

          <input
            className="w-full rounded-xl border border-stone-300 px-4 py-3"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />

          <input
            className="w-full rounded-xl border border-stone-300 px-4 py-3"
            placeholder="Cemetery name *"
            value={form.cemeteryName}
            onChange={(e) => updateField("cemeteryName", e.target.value)}
          />

          <input
            className="w-full rounded-xl border border-stone-300 px-4 py-3"
            placeholder="Cemetery city *"
            value={form.cemeteryCity}
            onChange={(e) => updateField("cemeteryCity", e.target.value)}
          />

          <input
            className="w-full rounded-xl border border-stone-300 px-4 py-3"
            placeholder="Loved one's name *"
            value={form.lovedOneName}
            onChange={(e) => updateField("lovedOneName", e.target.value)}
          />

          <input
            className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-slate-600"
            value="One-Time Visit"
            readOnly
          />

          <textarea
            className="w-full rounded-xl border border-stone-300 px-4 py-3"
            placeholder="Anything else we should know?"
            rows={4}
            value={form.notes}
            onChange={(e) => updateField("notes", e.target.value)}
          />

          {error ? <p className="text-sm text-rose-700">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </main>
  );
}
