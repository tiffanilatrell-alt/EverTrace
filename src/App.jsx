import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StartTribute from "./pages/StartTribute";
import ExampleTribute from "./pages/ExampleTribute";
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