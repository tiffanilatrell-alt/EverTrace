// Scroll to top on tribute load
function useScrollToTopOnLoad(deps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, deps);
}
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MemoryForm from "../components/MemoryForm";
import { addMemory, getMemories } from "../lib/memories";
import { getTributeById, updateTribute } from "../lib/tribute";
import { uploadMemoryPhoto } from "../lib/photoUpload";
import PhotoGallery from "../components/PhotoCarousel";
import { getPhotos, incrementPhotoReaction } from "../lib/photos";

function capitalizeStem(stem) {
  if (!stem) return "";
  return stem.charAt(0).toUpperCase() + stem.slice(1);
}

function TimelineSidebar({ tribute }) {
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ year: "", label: "" });
  const [eventError, setEventError] = useState("");
  const [localEventAdditions, setLocalEventAdditions] = useState([]);

  const autoEvents = [];
  if (tribute?.birthYear) autoEvents.push({ year: tribute.birthYear, label: "Born" });
  if (tribute?.passingYear) autoEvents.push({ year: tribute.passingYear, label: "Passed" });

  const savedEvents = Array.isArray(tribute?.timelineEvents)
    ? tribute.timelineEvents.filter((e) => e?.year && e?.label)
    : [];

  const mergedEvents = [...savedEvents, ...localEventAdditions];
  const uniqueEvents = Array.from(
    new Map(mergedEvents.map((event) => [`${event.year}-${event.label}`, event])).values()
  );

  const events = [...autoEvents, ...uniqueEvents].sort(
    (a, b) => Number(a.year || 0) - Number(b.year || 0)
  );

  function handleOpenModal() {
    setShowModal(true);
    setNewEvent({ year: "", label: "" });
    setEventError("");
  }

  function handleCloseModal() {
    setShowModal(false);
    setEventError("");
  }

  function handleEventChange(e) {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  }

  async function handleAddEvent(e) {
    e.preventDefault();
    if (!newEvent.year.trim() || !newEvent.label.trim()) {
      setEventError("Both year and event are required.");
      return;
    }
    if (isNaN(Number(newEvent.year))) {
      setEventError("Year must be a number.");
      return;
    }

    try {
      const eventToAdd = { year: newEvent.year, label: newEvent.label };
      const updatedEvents = [...savedEvents, ...localEventAdditions, eventToAdd];
      if (tribute?.id) {
        await updateTribute(tribute.id, { timelineEvents: updatedEvents });
      }
      setLocalEventAdditions((prev) => [...prev, eventToAdd]);
      setShowModal(false);
      setEventError("");
    } catch {
      setEventError("Failed to save event. Please try again.");
    }
  }

  return (
    <aside className="rounded-[1.75rem] border border-stone-200/70 bg-stone-50/60 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">A Life Remembered</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">Timeline</h3>
        </div>
        <button
          aria-label="Add timeline event"
          className="ml-2 rounded-full border border-stone-300 bg-white px-3 py-1 text-xl text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
          onClick={handleOpenModal}
          type="button"
        >
          +
        </button>
      </div>

      <div className="mt-8 space-y-6">
        {events.length > 0 ? (
          events.map((event, i) => (
            <div key={`${event.year}-${event.label}-${i}`} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="mt-1 h-3 w-3 rounded-full bg-emerald-700" />
                {i !== events.length - 1 && (
                  <div className="mt-2 h-full min-h-[52px] w-px bg-stone-300" />
                )}
              </div>

              <div className="pb-2">
                <p className="text-sm uppercase tracking-[0.14em] text-stone-500">{event.year}</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{event.label}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white/70 p-5 text-sm text-stone-600">
            No timeline events yet.
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-xs rounded-2xl bg-white p-6 shadow-xl">
            <h4 className="mb-4 text-lg font-semibold">Add Timeline Event</h4>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Year</label>
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
                <label className="mb-1 block text-sm font-medium">Event</label>
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
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 rounded-lg border border-stone-300 bg-white px-4 py-2 text-stone-700 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-emerald-700 px-4 py-2 font-medium text-white hover:bg-emerald-800"
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
  const { tributeId } = useParams();
  useScrollToTopOnLoad([tributeId]);

  let isOwner = false;
  let editLink = null;
  if (typeof window !== "undefined" && tributeId) {
    isOwner = localStorage.getItem(`tributeOwner:${tributeId}`) === "true";
    editLink = localStorage.getItem(`tributeEditLink:${tributeId}`);

    if (!isOwner && localStorage.getItem(`evertrace_edit_token_${tributeId}`)) {
      isOwner = true;
      if (!editLink) {
        editLink = `/edit/${tributeId}?token=${localStorage.getItem(`evertrace_edit_token_${tributeId}`)}`;
      }
    }
  }

  const [tribute, setTribute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showMemoryForm, setShowMemoryForm] = useState(false);
  const [memories, setMemories] = useState([]);
  const [isSavingMemory, setIsSavingMemory] = useState(false);
  const [memoryError, setMemoryError] = useState("");
  const [photos, setPhotos] = useState([]);

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
      } catch {
        setError("Failed to load tribute.");
      } finally {
        setLoading(false);
      }
    }

    fetchTribute();
  }, [tributeId]);

  useEffect(() => {
    async function fetchPhotos() {
      if (!tributeId) return;
      try {
        const data = await getPhotos(tributeId);
        setPhotos(data);
      } catch {
        setPhotos([]);
      }
    }

    fetchPhotos();
  }, [tributeId]);

  useEffect(() => {
    async function fetchMemories() {
      if (!tributeId) return;
      try {
        const data = await getMemories(tributeId);
        setMemories(Array.isArray(data) ? data : []);
      } catch {
        setMemories([]);
      }
    }

    fetchMemories();
  }, [tributeId]);

  const tributeName = tribute?.name || "Loved One";
  const years = tribute?.birthYear || tribute?.passingYear
    ? `${tribute?.birthYear || "-"} - ${tribute?.passingYear || "-"}`
    : "";
  const relationshipLabel = tribute?.relationshipDetail || tribute?.relationship || "";
  const message = tribute?.memoryText || tribute?.message || "";
  const storyParagraphs = message
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  const photosArr = Array.isArray(photos) && photos.length > 0
    ? photos
    : Array.isArray(tribute?.photos)
    ? tribute.photos.map((url) => ({ url }))
    : [];

  const normalizedPhotos = photosArr
    .map((photo, index) => {
      if (typeof photo === "string") {
        return { id: `legacy-${index}`, url: photo, reactions: {} };
      }
      if (!photo?.url) return null;
      return {
        id: photo.id || `legacy-${index}`,
        url: photo.url,
        reactions: photo.reactions || {},
      };
    })
    .filter(Boolean);

  const primaryPhotoUrl =
    tribute?.primaryPhotoUrl ||
    (normalizedPhotos.length > 0 ? normalizedPhotos[0].url : "/Spring-peace.jpg");
  const sidebarPhotoUrl = normalizedPhotos[1]?.url || primaryPhotoUrl || "/Spring-peace.jpg";
  const allowPhotoReactions = tribute?.allowPhotoReactions !== false;

  const highlights = Array.isArray(tribute?.highlights) ? tribute.highlights : [];
  const prominentHighlights = highlights.filter((item) => item?.value).slice(0, 4);

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

  function openMemoryForm() {
    setShowMemoryForm(true);
  }

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
            const aTime = a?.createdAt?.seconds ?? a?.createdAt?.toMillis?.() ?? a?.createdAt ?? 0;
            const bTime = b?.createdAt?.seconds ?? b?.createdAt?.toMillis?.() ?? b?.createdAt ?? 0;
            return aTime - bTime;
          })
        : [];

      setMemories(sorted);
      setShowMemoryForm(false);
    } catch (submitError) {
      console.error("Error saving memory:", submitError);
      setMemoryError("We couldn't save that memory. Please try again.");
    } finally {
      setIsSavingMemory(false);
    }
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: tributeName,
        text: `View the tribute for ${tributeName}`,
        url: window.location.href,
      });
    } else {
      window.prompt("Copy this link to share:", window.location.href);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50">
        <div className="text-lg text-slate-700">Loading tribute...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50">
        <div className="text-lg text-rose-700">{error}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f4ef] px-4 py-6 text-stone-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] border border-stone-200/70 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <section className="relative">
            <div className="relative h-[430px] w-full md:h-[560px]">
              <img
                src={primaryPhotoUrl}
                alt={`${tributeName} tribute`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />

              <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-6 pb-10 md:px-10 md:pb-14">
                <p className="text-xs uppercase tracking-[0.28em] text-stone-200/90">In Loving Memory</p>

                <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
                  {tributeName}
                </h1>

                {years && <p className="mt-4 text-lg text-stone-200 md:text-xl">{years}</p>}

                {prominentHighlights.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {prominentHighlights.map((item, idx) => (
                      <span
                        key={`${item.category || item.value}-${idx}`}
                        className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm"
                      >
                        {item.category ? `${capitalizeStem(item.category)}: ` : ""}
                        {item.value}
                      </span>
                    ))}
                  </div>
                )}

                {message && (
                  <p className="mt-6 max-w-3xl text-lg italic leading-8 text-stone-100 md:text-xl">
                    "{storyParagraphs[0] || message}"
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="border-b border-stone-200 bg-stone-50/70 px-6 py-5 md:px-10">
            <div className="flex flex-wrap items-center gap-3">
              <button
                className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
                onClick={openMemoryForm}
              >
                <span>Add a Memory</span>
                <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600">
                  {memories.length}
                </span>
              </button>

              <button
                className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
                onClick={handleShare}
              >
                <span>Share with Family</span>
              </button>

              <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm">
                <span>Photos</span>
                <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600">
                  {normalizedPhotos.length}
                </span>
              </span>

              {isOwner && editLink && (
                <Link
                  to={editLink}
                  className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
                >
                  Edit Tribute
                </Link>
              )}
            </div>
          </section>

          <section className="grid gap-10 px-6 py-8 md:grid-cols-[1.3fr_0.7fr] md:px-10 md:py-10">
            <div className="space-y-10">
              <div className="rounded-[1.75rem] border border-stone-200/70 bg-white p-6 shadow-sm md:p-8">
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Their Story</p>
                <div className="mt-5 space-y-5 text-[1.03rem] leading-8 text-stone-700">
                  {storyParagraphs.length > 0 ? (
                    storyParagraphs.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
                  ) : (
                    <p>Family and friends are invited to add stories, photos, and memories here.</p>
                  )}
                </div>
              </div>

              <TimelineSidebar tribute={tribute} />

              <div className="rounded-[1.75rem] border border-stone-200/70 bg-white p-6 shadow-sm md:p-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Shared by Family</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">Memories Shared</h2>
                  </div>
                  {!showMemoryForm && (
                    <button
                      onClick={openMemoryForm}
                      className="hidden rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50 md:inline-flex"
                    >
                      + Add a Memory
                    </button>
                  )}
                </div>

                <div className="mt-6 space-y-5">
                  {memories.map((memory) => (
                    <div
                      key={memory.id}
                      className="rounded-[1.5rem] border border-stone-200 bg-stone-50/80 p-5 transition hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      {memory.photoUrl && (
                        <img
                          src={memory.photoUrl}
                          alt="Shared memory"
                          className="mb-5 aspect-[4/5] w-full rounded-xl object-cover"
                        />
                      )}

                      <p className="leading-8 text-stone-700">{memory.memoryText || memory.text}</p>

                      <p className="mt-4 text-sm text-stone-500">
                        - {memory.contributorName || memory.author || "A loved one"}
                      </p>
                    </div>
                  ))}

                  {memories.length === 0 && (
                    <div className="rounded-[1.5rem] border border-dashed border-stone-300 bg-stone-50 p-6 text-center text-stone-600">
                      No memories yet. Be the first to add one.
                    </div>
                  )}
                </div>

                {!showMemoryForm && (
                  <button
                    onClick={openMemoryForm}
                    className="mt-6 inline-flex rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800 md:hidden"
                  >
                    + Add a Memory
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-sm">
                <img src={sidebarPhotoUrl} alt={`${tributeName} portrait`} className="h-72 w-full object-cover" />
                <div className="px-6 py-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-stone-500">In Loving Memory</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">{tributeName}</p>
                  {relationshipLabel && <p className="mt-2 text-sm text-stone-500">{relationshipLabel}</p>}
                  <p className="mt-2 leading-7 text-stone-600">
                    A place for family and friends to return, reflect, and remember together.
                  </p>
                </div>
              </div>

              {lovedThings.length > 0 && (
                <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.22em] text-stone-500">A Few Things They Loved</p>
                  <div className="mt-5 space-y-4">
                    {lovedThings.map((item, idx) => (
                      <div key={`${item.category || item.value}-${idx}`} className="rounded-2xl bg-stone-50 px-4 py-4">
                        <p className="text-sm text-stone-500">{capitalizeStem(item.category || "Favorite")}</p>
                        <p className="mt-1 font-medium leading-7 text-slate-900">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {otherHighlights.length > 0 && (
                <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Highlights</p>
                  <ul className="mt-5 space-y-3 text-stone-700">
                    {otherHighlights.map((item, idx) => (
                      <li key={`${item.category || item.value}-${idx}`}>
                        {item.category ? `${capitalizeStem(item.category)}: ` : ""}
                        {item.value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Preserve This Tribute</p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-900">Connect it to a lasting plaque</h3>
                <p className="mt-4 leading-7 text-stone-700">
                  Place this memory somewhere loved ones can visit, scan, and return to over time.
                </p>
                <Link
                  to="/checkout/stories"
                  className="mt-6 block w-full rounded-2xl bg-emerald-700 px-6 py-3.5 text-center text-base font-medium text-white transition hover:bg-emerald-800"
                >
                  Order Memorial Plaque
                </Link>
              </div>
            </div>
          </section>

          {normalizedPhotos.length > 0 && (
            <section className="border-t border-stone-200 bg-white px-6 py-8 md:px-10 md:py-10">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Photo Gallery</h2>
              <PhotoGallery
                photos={normalizedPhotos}
                reactionsEnabled={allowPhotoReactions}
                onReact={
                  allowPhotoReactions
                    ? async (photoId, type) => {
                        try {
                          await incrementPhotoReaction(tributeId, photoId, type);
                          const updated = await getPhotos(tributeId);
                          setPhotos(updated);
                        } catch {
                          // keep local optimistic reaction state
                        }
                      }
                    : undefined
                }
              />
            </section>
          )}
        </div>

        {showMemoryForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <MemoryForm
                honoreeName={tributeName}
                onSubmit={handleMemorySubmit}
                onCancel={() => setShowMemoryForm(false)}
                isSaving={isSavingMemory}
              />
              {memoryError && <div className="mt-3 text-sm text-red-600">{memoryError}</div>}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default TributePage;
