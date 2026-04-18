import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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
import EditTribute from "./pages/EditTribute";
import About from "./pages/About";
import Faq from "./pages/Faq";
import Resources from "./pages/Resources";
import WritingMeaningfulTribute from "./pages/WritingMeaningfulTribute";
import InvitingFamilyContribute from "./pages/InvitingFamilyContribute";
import PlanningGroundsCareGuide from "./pages/PlanningGroundsCareGuide";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import SiteFooter from "./components/SiteFooter";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="pointer-events-none fixed left-4 top-4 z-50 sm:left-6 sm:top-5">
        <Link
          to="/"
          className="pointer-events-auto text-sm font-semibold uppercase tracking-[0.18em] text-[#43124a] drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] transition hover:text-[#340d3a]"
          aria-label="EverTrace home"
        >
          EverTrace
        </Link>
      </div>
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
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/resources" element={<Resources />} />
        <Route
          path="/resources/writing-a-meaningful-tribute"
          element={<WritingMeaningfulTribute />}
        />
        <Route
          path="/writing-a-meaningful-triubte"
          element={<Navigate to="/resources/writing-a-meaningful-tribute" replace />}
        />
        <Route
          path="/resources/inviting-family-to-contribute"
          element={<InvitingFamilyContribute />}
        />
        <Route
          path="/resources/planning-ongoing-grounds-care"
          element={<PlanningGroundsCareGuide />}
        />
        <Route
          path="/writing-a-meaningful-tribute"
          element={<Navigate to="/resources/writing-a-meaningful-tribute" replace />}
        />
        <Route
          path="/inviting-family-to-contribute"
          element={<Navigate to="/resources/inviting-family-to-contribute" replace />}
        />
        <Route
          path="/planning-ongoing-grounds-care"
          element={<Navigate to="/resources/planning-ongoing-grounds-care" replace />}
        />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* This still uses tributeId (correct for post-creation flow) */}
        <Route path="/published/:tributeId" element={<PublishSuccess />} />

        {/* Plaque-based routing */}
        <Route path="/tribute/:tributeId" element={<TributePage />} />

        {/* Clean public URL (evertrace.life/001) */}
        <Route path="/:plaqueId" element={<PlaqueRouter />} />
        <Route path="/plaque/:tributeId" element={<Navigate to="/checkout/stories" replace />} />
        <Route path="/edit/:tributeId" element={<EditTribute />} />
      </Routes>
      <SiteFooter />
      </BrowserRouter>
    </HelmetProvider>
  );
}