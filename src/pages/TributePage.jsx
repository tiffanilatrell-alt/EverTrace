
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebaseClient";
import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MemoryForm from "../components/MemoryForm";
import { addMemory, getMemories } from "../lib/memories";
import { getTributeById } from "../lib/tribute";
import { uploadMemoryPhoto } from "../lib/photoUpload";
import PhotoGallery from "../components/PhotoCarousel";
import { getPhotos, incrementPhotoReaction } from "../lib/photos";
import { updateTribute } from "../lib/tribute";
import plaqueBoxImage from "../assets/plaque-box.jpg";
import { auth } from "../firebaseClient";

// Capitalize and clean up the category stem for display
function capitalizeStem(stem) {
  if (!stem) return '';
  // Remove leading/trailing whitespace, capitalize first letter, keep rest as is
  return stem.charAt(0).toUpperCase() + stem.slice(1);
}

function TimelineSidebar({ tribute }) {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ year: '', label: '' });
  const [eventError, setEventError] = useState('');
  const autoEvents = [];
  if (tribute?.birthYear) autoEvents.push({ year: tribute.birthYear, label: "Born" });
  if (tribute?.passingYear) autoEvents.push({ year: tribute.passingYear, label: "Passed" });
  const initialExtraEvents = Array.isArray(tribute?.timelineEvents)
    ? tribute.timelineEvents.filter(e => e?.year && e?.label)
    : [];
  const [localEvents, setLocalEvents] = useState(initialExtraEvents);
  const [saving, setSaving] = useState(false);
  const events = [...autoEvents, ...localEvents].sort((a, b) => Number(a.year) - Number(b.year));
  function handleOpenModal() {
    setShowModal(true);
    setNewEvent({ year: '', label: '' });
    setEventError('');
  }

  function handleCloseModal() {
    setShowModal(false);
    setEventError('');
  }

  function handleEventChange(e) {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  }

  async function handleAddEvent(e) {
    e.preventDefault();
    if (!newEvent.year.trim() || !newEvent.label.trim()) {
      setEventError('Both year and event are required.');
      return;
    }
    if (isNaN(Number(newEvent.year))) {
      setEventError('Year must be a number.');
      return;
    }
    setSaving(true);
    try {
      // Save to Firestore
      const updatedEvents = [...localEvents, { year: newEvent.year, label: newEvent.label }];
      await updateTribute(tribute.id, { timelineEvents: updatedEvents });
      setLocalEvents(updatedEvents);
      setShowModal(false);
      setEventError('');
    } catch (err) {
      setEventError('Failed to save event. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (events.length === 0) return null;

  return (
    <aside className="h-fit rounded-3xl border border-stone-200 bg-gradient-to-br from-yellow-50 to-stone-50 p-5 shadow-sm ring-amber-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Legacy</p>
          <h3 className="mt-1 text-lg font-semibold text-stone-900">Life Timeline</h3>
        </div>
        <button
          aria-label="Add timeline event"
          className="ml-2 rounded-full bg-white border border-stone-200 w-8 h-8 flex items-center justify-center text-2xl text-stone-500 hover:bg-stone-100 hover:text-stone-900 shadow"
          onClick={handleOpenModal}
          type="button"
        >
          +
        </button>
      </div>
      <div className="mt-6 border-l border-stone-200 pl-5">
        {events.map((event, i) => (
          <div key={i} className="relative mb-6 last:mb-0">
            <div className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border border-stone-300 bg-white" />
            <p className="text-sm font-medium text-stone-500">{event.year}</p>
            <p className="mt-1 text-base text-stone-800">{event.label}</p>
          </div>
        ))}
      </div>

      {/* Modal for adding event */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-xs">
            <h4 className="text-lg font-semibold mb-4">Add Timeline Event</h4>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Year</label>
                <input
                  type="text"
                  name="year"
                  value={newEvent.year}
                  onChange={handleEventChange}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-emerald-700"
                  placeholder="e.g. 1990"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Event</label>
                <input
                  type="text"
                  name="label"
                  value={newEvent.label}
                  onChange={handleEventChange}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-emerald-700"
                  placeholder="e.g. Graduated college"
                />
              </div>
              {eventError && <div className="text-sm text-red-600">{eventError}</div>}
              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 rounded-lg border border-stone-300 bg-white px-4 py-2 text-stone-700 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-emerald-700 px-4 py-2 text-white font-medium hover:bg-emerald-800"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
}

function TributePage() {
        // Helper to open the memory form from CTA area
        function openMemoryForm() {
          setShowMemoryForm(true);
        }
      // Handles adding a new memory with optional photo upload
      async function handleMemorySubmit(memoryPayload) {
        try {
          setIsSavingMemory(true);
          setMemoryError("");

          let photoUrl = "";

          if (memoryPayload.photoFile) {
            photoUrl = await uploadMemoryPhoto(tributeId, memoryPayload.photoFile);
          }

          await addMemory(tributeId, {
            contributorName: memoryPayload.contributorName || "",
            memoryText: memoryPayload.memoryText || "",
            photoUrl,
          });

          const refreshedMemories = await getMemories(tributeId);
          const sorted = Array.isArray(refreshedMemories)
            ? [...refreshedMemories].sort((a, b) => {
                const aTime =
                  a?.createdAt?.seconds ??
                  a?.createdAt?.toMillis?.() ??
                  a?.createdAt ??
                  0;
                const bTime =
                  b?.createdAt?.seconds ??
                  b?.createdAt?.toMillis?.() ??
                  b?.createdAt ??
                  0;

                return aTime - bTime;
              })
            : [];

          setMemories(sorted);
          setShowMemoryForm(false);
        } catch (error) {
          console.error("Error saving memory:", error);
          setMemoryError("We couldn't save that memory. Please try again.");
        } finally {
          setIsSavingMemory(false);
        }
      }
    // Share handler for the 'Share with Family' button
    function handleShare() {
      if (navigator.share) {
        navigator.share({
          title: tributeName,
          text: `View the tribute for ${tributeName}`,
          url: window.location.href,
        });
      } else {
        window.prompt('Copy this link to share:', window.location.href);
      }
    }
  const { tributeId } = useParams();
  // V1 owner logic: check localStorage for owner status and edit link
  let isOwner = false;
  let editLink = null;
  if (typeof window !== "undefined" && tributeId) {
    isOwner = localStorage.getItem(`tributeOwner:${tributeId}`) === "true";
    editLink = localStorage.getItem(`tributeEditLink:${tributeId}`);
    // Also allow edit link if edit token is present in localStorage
    if (!isOwner && localStorage.getItem(`evertrace_edit_token_${tributeId}`)) {
      isOwner = true;
      if (!editLink) {
        editLink = `/edit/${tributeId}?token=${localStorage.getItem(`evertrace_edit_token_${tributeId}`)}`;
      }
    }
  }

  // All hooks must be at the top, before any returns
  const [tribute, setTribute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showMemoryForm, setShowMemoryForm] = useState(false);
  const [memories, setMemories] = useState([]);
  const [isSavingMemory, setIsSavingMemory] = useState(false);
  const [memoryError, setMemoryError] = useState("");
  const [photos, setPhotos] = useState([]); // For gallery with reactions

  // Fetch tribute
  useEffect(() => {
    async function fetchTribute() {
      setLoading(true);
      setError("");
      try {
        const data = await getTributeById(tributeId);
        if (!data) {
          setError("Tribute not found.");
        } else {
          setTribute(data);
        }
      } catch (e) {
        setError("Failed to load tribute.");
      } finally {
        setLoading(false);
      }
    }
    fetchTribute();
  }, [tributeId]);

  // Fetch photos for gallery (with reactions)
  useEffect(() => {
    async function fetchPhotos() {
      if (!tributeId) return;
      try {
        const data = await getPhotos(tributeId);
        setPhotos(data);
      } catch (e) {
        setPhotos([]);
      }
    }
    fetchPhotos();
  }, [tributeId]);

  // Fetch memories
  useEffect(() => {
    async function fetchMemories() {
      if (!tributeId) return;
      try {
        const data = await getMemories(tributeId);
        setMemories(data);
      } catch (e) {
        // ignore for now
      }
    }
    fetchMemories();
  }, [tributeId]);



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-lg text-slate-700">Loading tribute...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-lg text-rose-700">{error}</div>
      </div>
    );
  }

  // --- UI REWRITE START ---
  // Safe defaults for missing data
  const tributeName = tribute?.name || "Loved One";
  const years = tribute?.birthYear || tribute?.passingYear
    ? `${tribute?.birthYear || "—"} – ${tribute?.passingYear || "—"}`
    : "";
  const relationship = tribute?.relationship || "";
  const message = tribute?.memoryText || tribute?.message || "";
  const photosArr = Array.isArray(photos) && photos.length > 0 ? photos : (Array.isArray(tribute?.photos) ? tribute.photos.map(url => ({ url })) : []);
  const primaryPhotoUrl = tribute?.primaryPhotoUrl || (photosArr.length > 0 ? (photosArr[0].url || photosArr[0]) : "");
  const allowPhotoReactions = tribute?.allowPhotoReactions !== false;
  const highlights = Array.isArray(tribute?.highlights) ? tribute.highlights : [];
  // Partition highlights
  const lovedThings = highlights.filter(
    (item) =>
      item?.category &&
      item?.value &&
      [
        "favorite song",
        "favorite book",
        "favorite meal",
        "favorite movie",
        "favorite saying",
        "a few things they loved",
      ].includes(item.category.toLowerCase())
  );
  const otherHighlights = highlights.filter(
    (item) =>
      item?.category &&
      item?.value &&
      ![
        "favorite song",
        "favorite book",
        "favorite meal",
        "favorite movie",
        "favorite saying",
        "a few things they loved",
      ].includes(item.category.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            {/* 1. HERO CARD (wide photo, info underneath) */}
            <section className="rounded-[2rem] bg-white overflow-hidden">
              <div className="p-8 pb-0">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 mb-2">
                  {tributeName || 'Loved One'}
                </h1>
              </div>
              <div className="w-full flex justify-center items-center" style={{ minHeight: '220px', background: 'none' }}>
                <img
                  src={primaryPhotoUrl || "/Spring-peace.jpg"}
                  alt={tributeName || 'Loved One'}
                  className="max-h-72 w-auto object-contain border-0 shadow-none"
                  style={{ boxShadow: 'none', border: 'none', maxWidth: '100%' }}
                />
              </div>
              <div className="p-8 pt-4">
                {years && <div className="text-lg text-slate-500 mb-2">{years}</div>}
                {message && <p className="mt-4 text-lg leading-7 text-slate-800">{message}</p>}
                {lovedThings.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-base font-semibold text-slate-900 mb-2">A few things they loved</h3>
                    <ul className="flex flex-wrap gap-2">
                      {lovedThings.map((item, idx) => (
                        <li key={idx} className="rounded-full bg-stone-100 px-4 py-2 text-sm text-slate-700">
                          {item.category ? `${capitalizeStem(item.category)}: ` : ''}{item.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {otherHighlights.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-base font-semibold text-slate-900 mb-2">Highlights</h3>
                    <ul className="flex flex-wrap gap-2">
                      {otherHighlights.map((item, idx) => (
                        <li key={idx} className="rounded-full bg-stone-100 px-4 py-2 text-sm text-slate-700">
                          {item.category ? `${capitalizeStem(item.category)}: ` : ''}{item.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {/* 2. Memories Section */}
            <section className="rounded-2xl bg-white shadow p-8">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950 mb-4">Memories</h2>
              <div className="mt-10 space-y-10">
                {memories.map((memory) => (
                  <div
                    key={memory.id}
                    className="mx-auto max-w-2xl rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 sm:p-6"
                  >
                    {memory.photoUrl && (
                      <img
                        src={memory.photoUrl}
                        alt="Shared memory"
                        className="mb-5 aspect-[4/5] w-full rounded-xl object-cover"
                      />
                    )}

                    <p className="text-base leading-8 text-slate-700 sm:text-lg">
                      {memory.memoryText || memory.text}
                    </p>

                    <p className="mt-4 text-sm text-slate-400">
                      — {memory.contributorName || memory.author || "A loved one"}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA: Share a memory button always visible */}
              <div className="mt-12 flex justify-center">
                {!showMemoryForm && (
                  <button
                    onClick={openMemoryForm}
                    className="rounded-full border border-slate-300 px-6 py-3 text-slate-700 transition hover:bg-slate-100"
                  >
                    Share a memory
                  </button>
                )}
              </div>
            </section>

          </div>
          {/* 3. Participation box and Timeline in right column */}
          <aside className="lg:sticky lg:top-8 lg:self-start flex flex-col gap-6">
            {/* Participation box anchored above Timeline */}
            <section className="rounded-[32px] bg-gradient-to-br from-emerald-50 to-stone-50 px-7 py-8 shadow-sm ring-1 ring-emerald-100 sm:px-8">
              <div className="text-xs uppercase tracking-[0.22em] text-emerald-700/70">
                Remember Together
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                Keep their memory alive
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                Invite family and friends to add stories and share the tribute
                with others who loved {tributeName.split(" ")[0]}.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
                  onClick={() => setShowMemoryForm(true)}
                >
                  Add a Memory
                </button>
                <button
                  className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-stone-50"
                  onClick={handleShare}
                >
                  Share with Family
                </button>
              </div>

              {/* Memory Form Modal */}
              {showMemoryForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                  <div className="bg-white rounded-2xl p-6 shadow-xl max-w-md w-full">
                    <MemoryForm
                      honoreeName={tributeName}
                      onSubmit={handleAddMemory}
                      onCancel={() => setShowMemoryForm(false)}
                      isSaving={isSavingMemory}
                    />
                    {memoryError && <div className="mt-3 text-sm text-red-600">{memoryError}</div>}
                  </div>
                </div>
              )}
            </section>
            {/* Timeline card */}
            <TimelineSidebar tribute={tribute} />
          </aside>
        </div>
        {/* Photo Gallery for additional photos - now at the bottom of the page */}
        {photosArr.length > 0 && (
          <section className="rounded-[32px] bg-white px-7 py-8 shadow-sm ring-1 ring-black/5 sm:px-8 mt-10">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950 mb-4">Photo Gallery</h2>
            <PhotoGallery
              photos={photosArr}
              reactionsEnabled={allowPhotoReactions}
              onReact={
                allowPhotoReactions
                  ? async (photoId, type) => {
                      try {
                        await incrementPhotoReaction(tributeId, photoId, type);
                        // Refresh photos after reaction
                        const updated = await getPhotos(tributeId);
                        setPhotos(updated);
                      } catch (e) {
                        // Optionally show error
                      }
                    }
                  : undefined
              }
            />
          </section>
        )}
      </div>

      {!showMemoryForm && (
        <div
          className="fixed bottom-4 left-4 right-4 z-40 sm:bottom-8 sm:left-auto sm:right-8"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <Link
            to="/checkout/stories"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-amber-200 bg-white/95 px-5 py-3 text-sm font-medium text-slate-900 shadow-lg backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-amber-50 sm:w-auto"
          >
            Order Memorial Plaque
          </Link>
        </div>
      )}
    </main>
  );
}

export default TributePage;

function formatHighlightLabel(category = "") {
  const map = {
    Hometown: "Hometown",
    Nickname: "Nickname",
    Occupation: "Occupation",
    "Favorite Saying": "Favorite Saying",
    "Favorite Hobby": "Favorite Hobby",
    School: "School",
    Church: "Church",
    "Military Service": "Military Service",
    Custom: "Detail",
    favorite_recipe: "Favorite Recipe",
    favorite_food: "Favorite Food",
    favorite_song: "Favorite Song",
    signature_saying: "Signature Saying",
    favorite_place: "Favorite Place",
    favorite_hobby: "Favorite Hobby",
    life_lesson: "Life Lesson",
    nickname: "Nickname",
  };



// Capitalize and clean up the category stem for display
function capitalizeStem(stem) {
  if (!stem) return '';
  // Remove leading/trailing whitespace, capitalize first letter, keep rest as is
  return stem.charAt(0).toUpperCase() + stem.slice(1);
}
  return map[category] || category || "Detail";
}