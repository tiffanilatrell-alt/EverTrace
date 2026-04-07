import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseClient";

function formatCreatedAt(value) {
  if (!value) return "-";

  try {
    const date = value?.toDate ? value.toDate() : new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleString();
  } catch {
    return "-";
  }
}

export default function GroundsRequestsAdmin() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadRequests() {
    setLoading(true);
    setError("");

    try {
      const requestsQuery = query(
        collection(db, "groundsRequests"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(requestsQuery);
      const rows = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRequests(rows);
    } catch (err) {
      console.error(err);
      setError("Could not load requests. Check Firestore rules and indexes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRequests();
  }, []);

  const summary = useMemo(() => {
    const total = requests.length;
    const newCount = requests.filter((item) => (item.status || "new") === "new").length;
    return { total, newCount };
  }, [requests]);

  return (
    <main className="min-h-screen bg-[#f5f1e8] px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">EverTrace Grounds</p>
              <h1 className="mt-2 text-3xl font-semibold">Requests Inbox</h1>
              <p className="mt-2 text-slate-600">Recent intake submissions from the Grounds request form.</p>
            </div>

            <button
              onClick={loadRequests}
              className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-stone-100"
            >
              Refresh
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Total Requests</p>
              <p className="mt-2 text-2xl font-semibold">{summary.total}</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">New</p>
              <p className="mt-2 text-2xl font-semibold">{summary.newCount}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {loading && (
            <div className="rounded-2xl border border-stone-200 bg-white p-5 text-slate-600 shadow-sm">
              Loading requests...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-700 shadow-sm">
              {error}
            </div>
          )}

          {!loading && !error && requests.length === 0 && (
            <div className="rounded-2xl border border-stone-200 bg-white p-5 text-slate-600 shadow-sm">
              No requests yet.
            </div>
          )}

          {!loading && !error && requests.map((item) => (
            <article key={item.id} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-slate-900">{item.name || "Unnamed request"}</h2>
                <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs uppercase tracking-[0.12em] text-slate-600">
                  {item.status || "new"}
                </span>
              </div>

              <div className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                <p><span className="font-medium">Email:</span> {item.email || "-"}</p>
                <p><span className="font-medium">Phone:</span> {item.phone || "-"}</p>
                <p><span className="font-medium">Loved one:</span> {item.lovedOneName || "-"}</p>
                <p><span className="font-medium">Service:</span> {item.serviceType || "-"}</p>
                <p><span className="font-medium">Cemetery:</span> {item.cemeteryName || "-"}</p>
                <p><span className="font-medium">City:</span> {item.cemeteryCity || "-"}</p>
                <p className="sm:col-span-2"><span className="font-medium">Submitted:</span> {formatCreatedAt(item.createdAt)}</p>
              </div>

              {item.notes ? (
                <p className="mt-4 rounded-xl bg-stone-50 px-4 py-3 text-sm text-slate-700">
                  <span className="font-medium">Notes:</span> {item.notes}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
