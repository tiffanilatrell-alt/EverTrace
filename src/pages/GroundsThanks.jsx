import { useNavigate } from "react-router-dom";

export default function GroundsThanks() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#f5f1e8] px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-xl rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-semibold">We received your request</h1>
        <p className="mt-3 text-slate-600">We'll follow up shortly with next steps.</p>

        <button
          onClick={() => navigate("/grounds")}
          className="mt-8 rounded-xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
        >
          Back to EverTrace Grounds
        </button>
      </div>
    </main>
  );
}
