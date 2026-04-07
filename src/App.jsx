import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StartTribute from "./pages/StartTribute";
import ExampleTribute from "./pages/ExampleTribute";
import Grounds from "./pages/Grounds";
import GroundsRequest from "./pages/GroundsRequest";
import GroundsThanks from "./pages/GroundsThanks";
import GroundsRequestsAdmin from "./pages/GroundsRequestsAdmin";
import Checkout from "./pages/Checkout";
import PreservePage from "./pages/PreservePage";
import TributePage from "./pages/TributePage";
import PublishSuccess from "./pages/PublishSuccess";
import PlaqueRouter from "./pages/PlaqueRouter";
import PlaquePurchase from "./pages/PlaquePurchase";
import EditTribute from "./pages/EditTribute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<StartTribute />} />
        <Route path="/grounds" element={<Grounds />} />
        <Route path="/grounds/request" element={<GroundsRequest />} />
        <Route path="/grounds/thanks" element={<GroundsThanks />} />
        <Route path="/grounds/admin" element={<GroundsRequestsAdmin />} />
        <Route
          path="/checkout/success"
          element={
            <main className="min-h-screen bg-[#f5f1e8] px-6 py-16 text-slate-900">
              <section className="mx-auto max-w-3xl rounded-[28px] border border-stone-200 bg-white p-8 text-center shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">EverTrace Checkout</p>
                <h1 className="mt-3 text-3xl font-semibold">Request Received</h1>
                <p className="mt-3 text-slate-600">
                  Thank you. We received your details and will follow up with next steps.
                </p>
              </section>
            </main>
          }
        />
        <Route path="/checkout/:type" element={<Checkout />} />
        <Route path="/preserve/:tributeId" element={<PreservePage />} />
        <Route path="/example" element={<ExampleTribute />} />

        {/* This still uses tributeId (correct for post-creation flow) */}
        <Route path="/published/:tributeId" element={<PublishSuccess />} />

        {/* Plaque-based routing */}
        <Route path="/tribute/:tributeId" element={<TributePage />} />

        {/* Clean public URL (evertrace.life/001) */}
        <Route path="/:plaqueId" element={<PlaqueRouter />} />
        <Route path="/plaque/:tributeId" element={<PlaquePurchase />} />
        <Route path="/edit/:tributeId" element={<EditTribute />} />
      </Routes>
    </BrowserRouter>
  );
}