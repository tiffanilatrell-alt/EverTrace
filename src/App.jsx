import React, { useState, useEffect, useCallback } from "react";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { auth, db, APP_ID } from "./firebaseClient";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("marketing");
  const [formData, setFormData] = useState({ firstName: "", lastName: "", bio: "" });

  useEffect(() => {
    signInAnonymously(auth).catch((err) => console.error("Auth Error:", err));
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const docRef = doc(db, "artifacts", APP_ID, "users", user.uid, "memorials", "main");
    const unsubscribe = onSnapshot(docRef, (s) => {
      if (s.exists()) {
        const data = s.data();
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          bio: data.bio || ""
        });
      }
    });
    return () => unsubscribe();
  }, [user]);

  const save = useCallback(async (val) => {
    if (!user) return;
    try {
      const docRef = doc(db, "artifacts", APP_ID, "users", user.uid, "memorials", "main");
      await setDoc(docRef, { ...formData, ...val, lastUpdated: serverTimestamp() }, { merge: true });
    } catch (err) {
      console.error("Save Error:", err);
    }
  }, [user, formData]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Arial, sans-serif" }}>
        <p>EverTrace loading...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FCFBF7", color: "#0f172a", fontFamily: "Arial, sans-serif", padding: "40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
        <h1>EverTrace</h1>
        <button onClick={() => setView(view === "marketing" ? "portal" : "marketing")}>
          {view === "marketing" ? "Open Portal" : "Return Home"}
        </button>
      </div>

      {view === "marketing" ? (
        <div>
          <h2>Every life leaves a trace.</h2>
          <p>The most elegant way to preserve, protect, and share a digital legacy.</p>
          <button onClick={() => setView("portal")}>Start Building Your Legacy</button>
        </div>
      ) : (
        <div style={{ maxWidth: "700px", background: "white", padding: "30px", borderRadius: "16px" }}>
          <h2>Memorial Details</h2>

          <div style={{ marginBottom: "16px" }}>
            <label>First Name</label>
            <br />
            <input
              style={{ width: "100%", padding: "12px", marginTop: "6px" }}
              value={formData.firstName || ""}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              onBlur={() => save({ firstName: formData.firstName })}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label>Last Name</label>
            <br />
            <input
              style={{ width: "100%", padding: "12px", marginTop: "6px" }}
              value={formData.lastName || ""}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              onBlur={() => save({ lastName: formData.lastName })}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label>The Story</label>
            <br />
            <textarea
              style={{ width: "100%", padding: "12px", marginTop: "6px", minHeight: "180px" }}
              value={formData.bio || ""}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              onBlur={() => save({ bio: formData.bio })}
            />
          </div>
        </div>
      )}
    </div>
  );
}