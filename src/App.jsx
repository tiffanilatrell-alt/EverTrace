import React, { useState, useEffect, useCallback, useRef } from "react";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  setDoc,
  onSnapshot,
  serverTimestamp,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import { auth, db, APP_ID } from "./firebaseClient";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("marketing");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
  });
  const [myTraces, setMyTraces] = useState([]);
  const [isFinalFrame, setIsFinalFrame] = useState(false);

  const videoRef = useRef(null);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    if (video.currentTime > video.duration - 0.3) {
      setIsFinalFrame(true);
    } else {
      setIsFinalFrame(false);
    }
  };

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

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (!snapshot.exists()) return;

      const data = snapshot.data();
      setFormData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        bio: data.bio || "",
      });
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "artifacts", APP_ID, "users", user.uid, "memorials"),
      orderBy("lastUpdated", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const traces = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setMyTraces(traces);
    });

    return () => unsubscribe();
  }, [user]);

  const save = useCallback(
    async (patch) => {
      if (!user) return;

      try {
        const docRef = doc(db, "artifacts", APP_ID, "users", user.uid, "memorials", "main");
        await setDoc(
          docRef,
          {
            ...formData,
            ...patch,
            lastUpdated: serverTimestamp(),
          },
          { merge: true }
        );
      } catch (err) {
        console.error("Save Error:", err);
      }
    },
    [user, formData]
  );

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  if (loading) {
    return (
      <div className="et-loading-screen">
        <div className="et-spinner" />
        <p className="et-loading-text">EverTrace Loading</p>
      </div>
    );
  }
  return (
    <div className="et-app">
      <header className="et-header">
        <div className="et-brand">
          <div className="et-logo-box">E</div>
          <div>
            <h1 className="et-logo-text">EverTrace</h1>
            <p className="et-tagline">Every life leaves a trace.</p>
          </div>
        </div>

        <button
          className="et-toggle-button"
          onClick={() => setView(view === "marketing" ? "portal" : "marketing")}
        >
          {view === "marketing" ? "Open Portal" : "Return Home"}
        </button>
      </header>

      {view === "marketing" && (
        <main className="et-marketing-shell">
          <section className="et-hero-v2">
            <div className="et-hero-v2__top">
              <h2 className="et-hero-v2__title">
                Every life leaves <br />
                <span>a trace.</span>
              </h2>

              <p className="et-hero-v2__subtitle">
                Build a tribute free. Publish when you’re ready.
              </p>

              <button
                onClick={() => setView("portal")}
                className="et-primary-button et-primary-button--large"
              >
                Create a free memorial
              </button>
            </div>

            <div className="et-steps">
              <div className="et-step-card">
                <div className="et-step-number">01. Create</div>
                <p>
                  Use our AI storyteller to weave memories into a beautiful digital legacy.
                </p>
              </div>

              <div className="et-step-card">
                <div className="et-step-number">02. Share</div>
                <p>
                  Connect your tribute to a scannable EverTrace marker or share a private link.
                </p>
              </div>

              <div className="et-step-card">
                <div className="et-step-number">03. Keep updated</div>
                <p>
                  Add photos and stories over time to keep their memory vibrant and present.
                </p>
              </div>
            </div>

            <div className="et-video-wrap">
              <div className="et-video-card">
                <video
                  ref={videoRef}
                  src="/evertrace-all.v2.9.26.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  className={`et-video ${isFinalFrame ? "et-video--hidden" : ""}`}
                />
                <div className="et-video-fallback">
                  <p>Video preview will appear here once the file is in your public folder.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {view !== "marketing" && (
        <main className="et-portal">
          <section className="et-editor-card">
            <div className="et-editor-header">
              <p className="et-section-label">Memorial Editor</p>
              <h2>Build a tribute that lasts.</h2>
              <p className="et-editor-subtitle">
                Start with the basics. We’ll expand this into your fuller EverTrace experience.
              </p>
            </div>

            <div className="et-form-grid">
              <div className="et-field">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  onBlur={() => save({ firstName: formData.firstName })}
                />
              </div>

              <div className="et-field">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  onBlur={() => save({ lastName: formData.lastName })}
                />
              </div>
            </div>

            <div className="et-field et-field-full">
              <label htmlFor="bio">The Story</label>
              <textarea
                id="bio"
                placeholder="Share the memories, the personality, and the moments that mattered most..."
                value={formData.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                onBlur={() => save({ bio: formData.bio })}
              />
            </div>

            <div className="et-status-row">
              <div className="et-status-dot" />
              <span>Cloud sync active</span>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}