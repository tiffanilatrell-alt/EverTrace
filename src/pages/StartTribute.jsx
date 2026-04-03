import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTribute, updateTribute } from "../lib/tribute";
import { uploadTributePhotos } from "../lib/photoUpload";

const RELATIONSHIPS = [
  "Parent",
  "Grandparent",
  "Sibling",
  "Child",
  "Partner",
  "Friend",
  "Cousin",
  "Other",
];

function getRelationshipDetailOptions(selectedRelationship) {
  switch (selectedRelationship) {
    case "Parent":
      return ["Mother", "Father"];
    case "Grandparent":
      return ["Grandmother", "Grandfather"];
    case "Sibling":
      return ["Sister", "Brother"];
    case "Child":
      return ["Daughter", "Son"];
    default:
      return [];
  }
}

function buildStarter(name, relationship) {
  const subject = name || "your loved one";
  const relation = relationship ? relationship.toLowerCase() : "loved one";

  return `${subject} was a deeply loved ${relation} whose presence brought warmth, comfort, and meaning to everyone around them. Their memory lives on in the stories, kindness, and love they shared. This tribute is a place for family and friends to remember them together.`;
}

export default function StartTribute() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("Parent");
  const [relationshipDetail, setRelationshipDetail] = useState("");
  const [photos, setPhotos] = useState([]);
  const [primaryPhotoIndex, setPrimaryPhotoIndex] = useState(0);
  const [captions, setCaptions] = useState({});
  const [captionOpen, setCaptionOpen] = useState({});
  const [memoryText, setMemoryText] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [email, setEmail] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [allowPhotoReactions, setAllowPhotoReactions] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState("");

  const photoPreviews = useMemo(
    () => photos.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [photos]
  );

  const canPublish = creatorName.trim() !== "" && email.trim() !== "";

  function goNext() {
    if (step === 1 && !name.trim()) return;
    setStep((prev) => Math.min(prev + 1, 4));
  }

  function goBackStep() {
    if (step === 1) {
      navigate("/");
      return;
    }
    setStep((prev) => Math.max(prev - 1, 1));
  }

  function handleFilesSelected(event) {
    const selected = Array.from(event.target.files || []);
    if (!selected.length) return;

    setPhotos((prev) => {
      const next = [...prev, ...selected].slice(0, 8);
      if (prev.length === 0 && next.length > 0) {
        setPrimaryPhotoIndex(0);
      }
      return next;
    });
  }

  function removePhoto(indexToRemove) {
    setPhotos((prev) => prev.filter((_, index) => index !== indexToRemove));
    setCaptions((prev) => {
      const next = { ...prev };
      delete next[indexToRemove];
      return Object.fromEntries(
        Object.entries(next).map(([k, v]) => [
          Number(k) > indexToRemove ? Number(k) - 1 : k,
          v,
        ])
      );
    });
    setCaptionOpen((prev) => {
      const next = { ...prev };
      delete next[indexToRemove];
      return next;
    });
    setPrimaryPhotoIndex((prev) => {
      if (indexToRemove === prev) return 0;
      if (indexToRemove < prev) return prev - 1;
      return prev;
    });
  }

  function addPromptText(prompt) {
    setMemoryText((prev) => {
      const spacer = prev.trim() ? "\n\n" : "";
      return `${prev}${spacer}${prompt}`;
    });
  }

  function generateTributeStarter() {
    setMemoryText((prev) => (prev.trim() ? prev : buildStarter(name, relationship)));
  }

  async function publishTribute() {
    if (!canPublish || isPublishing) return;

    setIsPublishing(true);
    setPublishError("");

    try {
      const tributeId = await createTribute({
        name: name.trim(),
        relationship,
        relationshipDetail: relationshipDetail.trim(),
        message: memoryText.trim(),
        creatorName: creatorName.trim(),
        email: email.trim(),
        ownerName: creatorName.trim(),
        ownerEmail: email.trim(),
        visibility,
        allowPhotoReactions,
        birthYear: "",
        passingYear: "",
        highlights: [],
        photoCount: 0,
        photoUrls: [],
      });

      if (photos.length > 0) {
        const uploaded = await uploadTributePhotos(tributeId, photos);
        const urls = uploaded.map((item) => item.url);
        const safePrimaryIndex = Math.min(primaryPhotoIndex, Math.max(uploaded.length - 1, 0));
        const photoCaptions = uploaded.map((_, i) => captions[i] || "");

        await updateTribute(tributeId, {
          photoUrls: urls,
          photoCount: urls.length,
          photoCaptions,
          primaryPhotoId: uploaded[safePrimaryIndex]?.id || "",
          primaryPhotoUrl: urls[safePrimaryIndex] || "",
        });
      }

      navigate(`/published/${tributeId}`);
    } catch (error) {
      console.error("Failed to publish tribute:", error);
      setPublishError("We could not save this tribute. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  }

  const previewImage =
    photoPreviews.length > 0
      ? photoPreviews[Math.min(primaryPhotoIndex, photoPreviews.length - 1)]?.url
      : "/Spring-peace.jpg";
  const tributeExcerpt = memoryText.trim()
    ? memoryText
    : `${name || "Your loved one"} will always be remembered with love.`;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-evertrace-historic">
      <div className="mx-auto w-full max-w-4xl">
        <button
          onClick={goBackStep}
          className="mb-8 text-sm font-medium text-stone-600 transition hover:text-stone-900"
        >
          {step === 1 ? "<- Back to Home" : "<- Back"}
        </button>

        <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl">
          <div className="border-b border-stone-200 px-8 py-6">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-emerald-700">
              Create a Tribute
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className={`h-2 w-16 rounded-full ${step >= 1 ? "bg-emerald-700" : "bg-stone-200"}`} />
              <div className={`h-2 w-16 rounded-full ${step >= 2 ? "bg-emerald-700" : "bg-stone-200"}`} />
              <div className={`h-2 w-16 rounded-full ${step >= 3 ? "bg-emerald-700" : "bg-stone-200"}`} />
              <div className={`h-2 w-16 rounded-full ${step >= 4 ? "bg-emerald-700" : "bg-stone-200"}`} />
            </div>
            <p className="mt-3 text-sm text-stone-500">Step {step} of 4</p>
          </div>

          {step === 1 && (
            <div className="px-8 py-10 md:px-10">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                Who are we honoring?
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
                Start with a few details. You can add photos, stories, and updates as this tribute grows.
              </p>

              <div className="mt-10 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700">Their name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jean E. White"
                    className="mt-2 w-full rounded-2xl border border-stone-300 px-4 py-4 text-lg text-slate-900 outline-none transition focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700">Their relationship to you</label>
                  <select
                    value={relationship}
                    onChange={(e) => {
                      setRelationship(e.target.value);
                      setRelationshipDetail("");
                    }}
                    className="mt-2 w-full rounded-2xl border border-stone-300 px-4 py-4 text-lg text-slate-900 outline-none transition focus:border-emerald-700"
                  >
                    {RELATIONSHIPS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {getRelationshipDetailOptions(relationship).length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-stone-700">More specifically</label>
                    <select
                      value={relationshipDetail}
                      onChange={(e) => setRelationshipDetail(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-stone-300 px-4 py-4 text-lg text-slate-900 outline-none transition focus:border-emerald-700"
                    >
                      <option value="">Select one</option>
                      {getRelationshipDetailOptions(relationship).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={goNext}
                  className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-8 py-4 text-lg font-medium text-white shadow transition hover:bg-emerald-800"
                >
                  Continue
                </button>
                <p className="text-sm text-stone-500">This takes just a few minutes.</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="px-8 py-10 md:px-10">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                Add photos of {name || "your loved one"}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
                Photos make this tribute feel personal and alive. You can upload more later.
              </p>

              <div className="mt-10 rounded-[2rem] border-2 border-dashed border-stone-300 bg-stone-50 p-8 text-center">
                <p className="text-lg font-medium text-slate-900">Upload photos</p>
                <p className="mt-2 text-stone-600">Choose up to 8 images</p>
                <label className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-2xl bg-white px-6 py-3 text-base font-medium text-slate-900 shadow transition hover:bg-stone-100">
                  Select Photos
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFilesSelected}
                    className="hidden"
                  />
                </label>
              </div>

              {photoPreviews.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-slate-900">Selected photos</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {photoPreviews.map((item, index) => (
                      <div key={`${item.file.name}-${index}`} className="overflow-hidden rounded-[1.5rem] bg-stone-50 p-3">
                        <img src={item.url} alt={item.file.name} className="h-40 w-full rounded-xl object-cover" />
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <p className="truncate text-sm text-stone-600">{item.file.name}</p>
                          <button
                            type="button"
                            onClick={() => setCaptionOpen((prev) => ({ ...prev, [index]: !prev[index] }))}
                            className="flex items-center gap-1 text-xs text-stone-400 transition hover:text-stone-600"
                          >
                            <span>{captionOpen[index] ? "▲" : "▼"}</span>
                            <span>{captions[index] ? "Edit caption" : "Add caption"}</span>
                          </button>
                        </div>
                        {captionOpen[index] && (
                          <textarea
                            value={captions[index] || ""}
                            onChange={(e) => setCaptions((prev) => ({ ...prev, [index]: e.target.value }))}
                            placeholder="Add a short caption…"
                            rows={2}
                            className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-600"
                          />
                        )}
                        <div className="mt-3 flex items-center justify-between gap-3">
                          {index !== primaryPhotoIndex ? (
                            <button
                              type="button"
                              onClick={() => setPrimaryPhotoIndex(index)}
                              className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                            >
                              Set as Primary
                            </button>
                          ) : (
                            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800">
                              Primary Photo
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="rounded-full border border-rose-200 bg-white px-3 py-1.5 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={goNext}
                  className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-8 py-4 text-lg font-medium text-white shadow transition hover:bg-emerald-800"
                >
                  Continue
                </button>
                <button
                  onClick={goNext}
                  className="text-sm font-medium text-stone-500 transition hover:text-stone-800"
                >
                  Skip for now
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="px-8 py-10 md:px-10">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                Add memories for {name || "your loved one"}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
                Share what made them special. A few loving sentences are enough to begin.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => addPromptText("What I will always remember most is...")}
                  className="rounded-full bg-stone-100 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-200"
                >
                  What I will always remember...
                </button>
                <button
                  type="button"
                  onClick={() => addPromptText("They made people feel loved by...")}
                  className="rounded-full bg-stone-100 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-200"
                >
                  They made people feel loved by...
                </button>
                <button
                  type="button"
                  onClick={() => addPromptText("One of my favorite memories is...")}
                  className="rounded-full bg-stone-100 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-200"
                >
                  One of my favorite memories...
                </button>
              </div>

              <div className="mt-8">
                <label className="block text-sm font-medium text-stone-700">Tribute text</label>
                <textarea
                  value={memoryText}
                  onChange={(e) => setMemoryText(e.target.value)}
                  placeholder="Write a few words about who they were, what they meant to you, or what you want others to remember."
                  rows={8}
                  className="mt-2 w-full rounded-[1.5rem] border border-stone-300 px-4 py-4 text-base leading-7 text-slate-900 outline-none transition focus:border-emerald-700"
                />
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={generateTributeStarter}
                  className="inline-flex items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-base font-medium text-emerald-800 transition hover:bg-emerald-100"
                >
                  Help me write this
                </button>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={goNext}
                  className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-8 py-4 text-lg font-medium text-white shadow transition hover:bg-emerald-800"
                >
                  Continue
                </button>
                <p className="text-sm text-stone-500">You can edit this anytime later.</p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="px-8 py-10 md:px-10">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">Review and publish</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
                Save this tribute so you can return to it, share it with family, and continue building it over time.
              </p>

              <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700">Your name</label>
                    <input
                      value={creatorName}
                      onChange={(e) => setCreatorName(e.target.value)}
                      placeholder="Tiffani"
                      className="mt-2 w-full rounded-2xl border border-stone-300 px-4 py-4 text-lg text-slate-900 outline-none transition focus:border-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700">Email address</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      type="email"
                      className="mt-2 w-full rounded-2xl border border-stone-300 px-4 py-4 text-lg text-slate-900 outline-none transition focus:border-emerald-700"
                    />
                  </div>

                  <div>
                    <p className="block text-sm font-medium text-stone-700">Visibility</p>
                    <div className="mt-3 space-y-3">
                      <button
                        type="button"
                        onClick={() => setVisibility("public")}
                        className={`w-full rounded-[1.5rem] border p-5 text-left transition ${
                          visibility === "public"
                            ? "border-emerald-700 bg-emerald-50"
                            : "border-stone-300 bg-white hover:bg-stone-50"
                        }`}
                      >
                        <p className="font-medium text-slate-900">Public tribute</p>
                        <p className="mt-2 text-sm leading-7 text-stone-600">
                          Anyone with the link can view and share this tribute.
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setVisibility("private")}
                        className={`w-full rounded-[1.5rem] border p-5 text-left transition ${
                          visibility === "private"
                            ? "border-emerald-700 bg-emerald-50"
                            : "border-stone-300 bg-white hover:bg-stone-50"
                        }`}
                      >
                        <p className="font-medium text-slate-900">Private for now</p>
                        <p className="mt-2 text-sm leading-7 text-stone-600">
                          Save this tribute as a draft before sharing it more broadly.
                        </p>
                      </button>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] bg-stone-50 p-5">
                    <p className="text-sm leading-7 text-stone-600">
                      We use this email so you can return to your tribute, keep editing it, and invite family later.
                    </p>
                  </div>

                  <label className="flex items-start gap-3 rounded-[1.5rem] border border-stone-200 bg-white p-4">
                    <input
                      type="checkbox"
                      checked={allowPhotoReactions}
                      onChange={(e) => setAllowPhotoReactions(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-600"
                    />
                    <div>
                      <p className="text-sm font-medium text-slate-900">Allow reactions on photos</p>
                      <p className="mt-1 text-sm leading-6 text-stone-600">
                        Let visitors react with candles, flowers, and doves on tribute photos.
                      </p>
                    </div>
                  </label>

                  <div className="flex flex-col gap-4">
                    <button
                      onClick={publishTribute}
                      disabled={!canPublish || isPublishing}
                      className={`inline-flex items-center justify-center rounded-2xl px-8 py-4 text-lg font-medium shadow transition ${
                        canPublish && !isPublishing
                          ? "bg-emerald-700 text-white hover:bg-emerald-800"
                          : "cursor-not-allowed bg-stone-200 text-stone-500 shadow-none"
                      }`}
                    >
                      {isPublishing
                        ? "Saving..."
                        : visibility === "private"
                        ? "Save Tribute"
                        : "Publish Tribute"}
                    </button>
                    <p className="text-sm text-stone-500">Please enter your name and email to continue.</p>
                    {publishError && <p className="text-sm text-rose-700">{publishError}</p>}
                  </div>
                </div>

                <div>
                  <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-lg ring-1 ring-stone-200">
                    <img src={previewImage} alt={`${name || "Tribute"} preview`} className="h-60 w-full object-cover" />
                    <div className="p-6">
                      <p className="text-sm uppercase tracking-[0.22em] text-emerald-700">Tribute Preview</p>
                      <h3 className="mt-3 text-2xl font-semibold text-slate-900">{name || "Your loved one"}</h3>
                      <p className="mt-2 text-stone-600">{relationshipDetail || relationship}</p>
                      <p className="mt-4 line-clamp-6 leading-7 text-stone-700">{tributeExcerpt}</p>
                      <div className="mt-5 flex flex-wrap gap-2 text-sm text-stone-500">
                        <span className="rounded-full bg-stone-100 px-3 py-1.5">
                          {photos.length} photo{photos.length === 1 ? "" : "s"}
                        </span>
                        <span className="rounded-full bg-stone-100 px-3 py-1.5">
                          {visibility === "public" ? "Shareable tribute" : "Private draft"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {step === 4 && (
        <div
          className="fixed bottom-4 left-4 right-4 z-40 sm:bottom-6 sm:left-auto sm:right-6"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <button
            type="button"
            disabled
            className="w-full rounded-full border border-amber-200 bg-white/95 px-5 py-3 text-sm font-medium text-slate-900 shadow-lg backdrop-blur-sm sm:w-auto"
          >
            Order Memorial Plaque (after publish)
          </button>
        </div>
      )}
    </div>
  );
}

