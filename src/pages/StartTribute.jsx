import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTribute, updateTribute } from "../lib/tribute";
import { uploadTributePhotos } from "../lib/photoUpload";
import MeaningfulDetailsSection from "../components/MeaningfulDetailsSection";

const RELATIONSHIPS = [
  "Parent",
  "Grandparent",
  "Sibling",
  "Child",
  "Partner",
  "Friend",
  "Cousin",
  "Pet",
  "Other",
];

const ROTATING_PLACEHOLDERS = [
  "What is one thing you'll always remember?",
  "What did they make people feel?",
  "What is a story that feels like them?",
  "What would you want someone meeting them to know?",
];

const STORY_PROMPTS = [
  "What is one thing you'll always remember?",
  "What did they make people feel?",
  "What is a moment that feels like them?",
  "What would you want others to know about them?",
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

export default function StartTribute() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
    // Scroll to top on step change
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    }, [step]);
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("Parent");
  const [relationshipDetail, setRelationshipDetail] = useState("");
  const [photos, setPhotos] = useState([]);
  const [primaryPhotoIndex, setPrimaryPhotoIndex] = useState(0);
  const [captions, setCaptions] = useState({});
  const [captionOpen, setCaptionOpen] = useState({});
  const [tributeText, setTributeText] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [highlights, setHighlights] = useState([]);
  const [creatorName, setCreatorName] = useState("");
  const [email, setEmail] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [allowPhotoReactions, setAllowPhotoReactions] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState("");
  const [isGeneratingTributeText, setIsGeneratingTributeText] = useState(false);
  const [tributeAssistError, setTributeAssistError] = useState("");

  const photoPreviews = useMemo(
    () => photos.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [photos]
  );

  const canPublish = creatorName.trim() !== "" && email.trim() !== "";
  const personDisplayName = name?.trim() || "them";
  const relationshipSpecific = relationshipDetail;

  useEffect(() => {
    if (tributeText.trim().length > 0) return;

    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % ROTATING_PLACEHOLDERS.length);
    }, 2600);

    return () => clearInterval(interval);
  }, [tributeText]);

  const activePlaceholder = ROTATING_PLACEHOLDERS[placeholderIndex];

  const encouragementMessage = useMemo(() => {
    const wordCount = tributeText.trim().split(/\s+/).filter(Boolean).length;

    if (wordCount >= 25) return "That's a beautiful start.";
    if (wordCount >= 10) return "You're capturing something meaningful.";
    if (wordCount >= 1) return "Keep going - even a few words are enough to begin.";
    return "";
  }, [tributeText]);

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

  function handlePromptClick(prompt) {
    setTributeText((current) => {
      if (current.trim()) {
        return current.endsWith(" ") ? `${current}${prompt}` : `${current}\n\n${prompt}`;
      }
      return prompt;
    });
  }

  async function handleHelpMeStart() {
    if (isGeneratingTributeText) return;

    setTributeAssistError("");
    const starter = `One thing I'll always remember about ${personDisplayName} is `;

    try {
      setIsGeneratingTributeText(true);

      const response = await fetch("/generate-tribute-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          relationship,
          relationshipDetail: relationshipDetail.trim(),
          existingText: tributeText,
          highlights,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || typeof data?.text !== "string" || !data.text.trim()) {
        throw new Error(data?.error || "Unable to generate tribute text.");
      }

      setTributeText((current) => {
        const nextSuggestion = data.text.trim();
        if (!current.trim()) return nextSuggestion;
        return `${current.trim()}\n\n---\n\n${nextSuggestion}`;
      });
    } catch (error) {
      console.error("AI writing help unavailable:", error);
      setTributeAssistError("AI writing help is unavailable right now. We added a starter line instead.");
      setTributeText((current) => {
        if (!current.trim()) return starter;
        return `${current.trim()}\n\n---\n\n${starter}`;
      });
    } finally {
      setIsGeneratingTributeText(false);
    }
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
        message: tributeText.trim(),
        creatorName: creatorName.trim(),
        email: email.trim(),
        ownerName: creatorName.trim(),
        ownerEmail: email.trim(),
        visibility,
        allowPhotoReactions,
        birthYear: "",
        passingYear: "",
        highlights,
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
  const tributeExcerpt = tributeText.trim()
    ? tributeText
    : `${name || "Your loved one"} will always be remembered with love.`;

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-evertrace-historic">
      {/* Soft background image overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[url('/Spring-peace.jpg')] bg-cover bg-center opacity-10" />
      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <button
          onClick={goBackStep}
          className="mb-8 text-sm font-medium text-stone-600 transition hover:text-stone-900"
        >
          {step === 1 ? "<- Back to Home" : "<- Back"}
        </button>

        <div
          className="overflow-hidden rounded-[2rem] shadow-xl"
          style={{
            background:
              "radial-gradient(120% 140% at 8% 6%, rgba(139, 92, 246, 0.10) 0%, rgba(255, 255, 255, 0.96) 36%, rgba(110, 231, 183, 0.14) 100%)",
          }}
        >
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
            <p className="mt-3 text-sm text-stone-500">Step {step} of 4 - Getting started</p>
          </div>

          {step === 1 && (
            <div className="px-8 py-10 md:px-10">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                Let's begin with their name
              </h1>
              <p className="mt-3 text-base font-medium text-stone-700">
                A name is where every story begins.
              </p>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
                You don't need everything right now. Just start with what you know - you can always come back and add more.
              </p>

              <div className="mt-10 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700">What is their name?</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jean E. White"
                    className="w-full text-xl py-4 px-5 rounded-xl border border-stone-300 bg-white/80 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700">How did you know them?</label>
                  <select
                    value={relationship}
                    onChange={(e) => {
                      setRelationship(e.target.value);
                      setRelationshipDetail("");
                    }}
                    className="w-full text-xl py-4 px-5 rounded-xl border border-stone-300 bg-white/80 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition"
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
                    <label className="block text-sm font-medium text-stone-700">If you'd like, you can be more specific</label>
                    <select
                      value={relationshipDetail}
                      onChange={(e) => setRelationshipDetail(e.target.value)}
                      className="w-full text-xl py-4 px-5 rounded-xl border border-stone-300 bg-white/80 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition"
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

              <div className="mt-8 rounded-[1.5rem] border border-white/70 bg-white/60 px-6 py-6 shadow-sm backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Tribute Preview</p>
                <h2
                  className="mt-3 text-3xl leading-tight text-slate-800/85 md:text-4xl"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {name.trim() || "Jean E. White"}
                </h2>
                <p className="mt-2 text-lg font-medium text-stone-600/90">
                  {relationshipDetail || relationship || "Mother"}
                </p>
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
                              className="rounded-full border border-[#d8b8df] bg-[#f8f1fa] px-4 py-2 text-sm font-semibold text-[#43124a] transition hover:bg-[#f3e8f7]"
                            >
                              Set as Primary
                            </button>
                          ) : (
                            <span className="rounded-full border border-[#d8b8df] bg-[#f8f1fa] px-3 py-1.5 text-sm font-medium text-[#43124a]">
                              Primary Photo
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="rounded-full border border-rose-300 bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <label className="mt-8 flex items-start gap-3 rounded-[1.5rem] border border-stone-200 bg-white p-4">
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
              <div className="rounded-[28px] border border-stone-200 bg-white/88 shadow-[0_12px_40px_rgba(58,35,71,0.06)] backdrop-blur-sm">
                <div className="border-b border-stone-200 px-6 py-5 md:px-10">
                  <div className="text-sm text-stone-500">Step 3 of 4 - Add meaning</div>
                </div>

                <div className="px-6 py-8 md:px-10 md:py-10">
                  <div className="max-w-3xl">
                    <p className="mb-3 text-sm font-medium italic text-stone-500">
                      Take your time. There's no right way to do this.
                    </p>

                    <h2 className="text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                      Start with what you remember most about {personDisplayName}
                    </h2>

                    <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
                      You don't need the perfect words. Just begin with a sentence or two - you
                      can always come back and add more.
                    </p>

                    <div className="mt-8">
                      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
                        Not sure where to begin?
                      </p>

                      <div className="flex flex-wrap gap-3">
                        {STORY_PROMPTS.map((prompt) => (
                          <button
                            key={prompt}
                            type="button"
                            onClick={() => handlePromptClick(prompt)}
                            className="rounded-full border border-[#d9c5de] bg-[#faf6fb] px-4 py-2 text-sm font-medium text-[#5a2c63] transition hover:border-[#c6a6ce] hover:bg-[#f6eef8]"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8">
                      <label
                        htmlFor="tributeText"
                        className="mb-3 block text-base font-semibold text-slate-900"
                      >
                        What would you like to say?
                      </label>

                      <textarea
                        id="tributeText"
                        value={tributeText}
                        onChange={(e) => setTributeText(e.target.value)}
                        placeholder={activePlaceholder}
                        rows={10}
                        className="min-h-[280px] w-full rounded-[26px] border border-stone-200 bg-white px-5 py-5 text-lg leading-8 text-slate-900 placeholder:text-stone-400 focus:border-[#8d5a97] focus:outline-none focus:ring-4 focus:ring-[#efe3f3]"
                      />

                      <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <p className="text-sm text-stone-500">
                          Even a few words can become something meaningful.
                        </p>

                        <div className="text-sm font-medium text-[#6b3c74]">
                          {encouragementMessage}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={handleHelpMeStart}
                        disabled={isGeneratingTributeText}
                        className="inline-flex items-center gap-2 rounded-2xl border border-[#d9c5de] bg-[#faf6fb] px-5 py-3 text-base font-semibold text-[#5a2c63] transition hover:border-[#c6a6ce] hover:bg-[#f6eef8] disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        <span aria-hidden="true">*</span>
                        {isGeneratingTributeText ? "Writing..." : "Help me get started"}
                      </button>

                      <p className="text-sm text-stone-500">
                        You can edit anything the helper adds.
                      </p>
                    </div>

                    {tributeAssistError && (
                      <p className="mt-3 text-sm text-rose-700">{tributeAssistError}</p>
                    )}

                    <div className="mt-8 rounded-[24px] border border-stone-200 bg-gradient-to-br from-[#fcf9fd] via-white to-[#f6faf6] p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                        Tribute preview
                      </p>

                      <div className="mt-3">
                        <h3 className="text-2xl font-semibold text-slate-950">
                          {personDisplayName}
                        </h3>

                        {relationship && (
                          <p className="mt-1 text-sm text-stone-500">
                            {relationshipSpecific?.trim() || relationship}
                          </p>
                        )}

                        <div className="mt-4 rounded-2xl bg-white/80 p-4 text-base leading-7 text-stone-700 ring-1 ring-stone-200/70">
                          {tributeText.trim() ? (
                            <p>{tributeText}</p>
                          ) : (
                            <p className="italic text-stone-400">
                              Your words will begin to take shape here.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <MeaningfulDetailsSection highlights={highlights} setHighlights={setHighlights} />

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
                      className="w-full text-xl py-4 px-5 rounded-xl border border-stone-300 bg-white/80 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition"
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

