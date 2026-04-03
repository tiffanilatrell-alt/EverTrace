import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseClient";

export default function PlaqueRouter() {
  const { plaqueC } = useParams();
  const navigate = useNavigate();``

  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function resolvePlaque() {
      try {
        if (!plaqueId) {
          setStatus("error");
          setErrorMessage("Invalid plaque link.");
          return;
        }

        const plaqueRef = doc(db, "plaques", plaqueId);
        const plaqueSnap = await getDoc(plaqueRef);

        if (!plaqueSnap.exists()) {
          setStatus("not-found");
          return;
        }

        const plaque = plaqueSnap.data();

        if (plaque.status !== "active") {
          setStatus("inactive");
          return;
        }

        if (!plaque.tributeId) {
          setStatus("unassigned");
          return;
        }

        navigate(`/tribute/${plaque.tributeId}`, { replace: true });
      } catch (error) {
        console.error("Error resolving plaque:", error);
        setStatus("error");
        setErrorMessage("We couldn't open this memorial page right now.");
      }
    }

    resolvePlaque();
  }, [plaqueId, navigate]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-6">
        <div className="text-center">
          <p className="text-lg text-stone-700">Opening memorial page...</p>
        </div>
      </div>
    );
  }

  if (status === "not-found") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold text-stone-900">Plaque not found</h1>
          <p className="mt-3 text-stone-600">
            This memorial link could not be found.
          </p>
        </div>
      </div>
    );
  }

  if (status === "inactive") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold text-stone-900">Memorial not active yet</h1>
          <p className="mt-3 text-stone-600">
            This plaque has not been activated yet.
          </p>
        </div>
      </div>
    );
  }

  if (status === "unassigned") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold text-stone-900">No tribute linked yet</h1>
          <p className="mt-3 text-stone-600">
            This plaque exists, but it has not been connected to a tribute page yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-6">
      <div className="text-center">
        <p className="text-lg text-stone-700">{errorMessage}</p>
      </div>
    </div>
  );
}