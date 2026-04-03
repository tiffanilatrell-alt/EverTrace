
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { getTributeById, updateTribute } from "../lib/tribute";

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

export default function EditTribute() {
  const { tributeId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Form state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [passingYear, setPassingYear] = useState("");
  const [relationship, setRelationship] = useState("Parent");
  const [relationshipDetail, setRelationshipDetail] = useState("");
  const [memoryText, setMemoryText] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [email, setEmail] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [theme, setTheme] = useState("light");
  const [highlightCategory, setHighlightCategory] = useState("Favorite Song");
  const [highlightValue, setHighlightValue] = useState("");
  const [highlights, setHighlights] = useState([]);

  // Prefill from Firestore
  useEffect(() => {
    async function fetchTribute() {
      setLoading(true);
      setError("");
      try {
        const tribute = await getTributeById(tributeId);
        if (!tribute) {
          setError("Tribute not found.");
          setLoading(false);
          return;
        }
        setName(tribute.name || "");
        setBirthYear(tribute.birthYear || "");
        setPassingYear(tribute.passingYear || "");
        setRelationship(tribute.relationship || "Parent");
        setRelationshipDetail(tribute.relationshipDetail || "");
        setMemoryText(tribute.message || "");
        setCreatorName(tribute.creatorName || "");
        setEmail(tribute.ownerEmail || tribute.email || "");
        setVisibility(tribute.visibility || "public");
        setTheme(tribute.theme || "light");
        setHighlights(Array.isArray(tribute.highlights) ? tribute.highlights : []);
      } catch (e) {
        setError("Failed to load tribute.");
      } finally {
        setLoading(false);
      }
    }
    fetchTribute();
  }, [tributeId]);

  function addHighlightDetail() {
    if (highlightValue.trim() === "") return;
    setHighlights((prev) => [
      ...prev,
      {
        category: highlightCategory,
        value: highlightValue.trim(),
      },
    ]);
    setHighlightValue("");
  }

  function removeHighlightDetail(indexToRemove) {
    setHighlights((prev) => prev.filter((_, index) => index !== indexToRemove));
  }

  const canSave = name.trim() && creatorName.trim() && email.trim() && !saving;

  async function handleSave(e) {
    e.preventDefault();
    if (!canSave) return;
    setSaving(true);
    setError("");
    try {
      await updateTribute(tributeId, {
        name: name.trim(),
        birthYear: birthYear.trim(),
        passingYear: passingYear.trim(),
        relationship: relationship.trim(),
        relationshipDetail: relationshipDetail.trim(),
        highlights,
        message: memoryText.trim(),
        creatorName: creatorName.trim(),
        ownerEmail: email.trim().toLowerCase(),
        visibility,
        theme,
      });
      navigate(`/tribute/${tributeId}`);
    } catch (err) {
      setError("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-stone-50 text-slate-900">
        <div className="text-lg">Loading tribute...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
        <h1 className="text-4xl font-semibold tracking-tight">Edit Tribute</h1>
        <p className="mt-3 text-slate-600">Update your tribute below. Changes are saved to the cloud.</p>
        {error && <div className="mt-4 rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-rose-700">{error}</div>}
        <form className="mt-8 space-y-8" onSubmit={handleSave}>
          <div>
            <label className="mb-3 block text-base font-semibold text-slate-800">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-5 text-lg text-slate-800 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              placeholder="Their full name"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="mb-3 block text-base font-semibold text-slate-800">Birth Year</label>
              <input
                type="text"
                value={birthYear}
                onChange={e => setBirthYear(e.target.value)}
                className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-5 text-lg text-slate-800 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                placeholder="e.g. 1942"
              />
            </div>
            <div>
              <label className="mb-3 block text-base font-semibold text-slate-800">Passing Year</label>
              <input
                type="text"
                value={passingYear}
                onChange={e => setPassingYear(e.target.value)}
                className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-5 text-lg text-slate-800 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                placeholder="e.g. 2023"
              />
            </div>
          </div>
          <div>
            <label className="mb-3 block text-base font-semibold text-slate-800">Relationship</label>
            <select
              value={relationship}
              onChange={e => {
                setRelationship(e.target.value);
                setRelationshipDetail("");
              }}
              className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-5 text-lg text-slate-800 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            >
              <option>Parent</option>
              <option>Grandparent</option>
              <option>Sibling</option>
              <option>Child</option>
              <option>Partner</option>
              <option>Friend</option>
              <option>Cousin</option>
              <option>Other</option>
            </select>
          </div>
          {getRelationshipDetailOptions(relationship).length > 0 && (
            <div>
              <label className="mb-3 block text-base font-semibold text-slate-800">More specifically</label>
              <select
                value={relationshipDetail}
                onChange={e => setRelationshipDetail(e.target.value)}
                className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-5 text-lg text-slate-800 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              >
                <option value="">Select one</option>
                {getRelationshipDetailOptions(relationship).map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          )}
          <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-6">
            <div>
              <h3 className="text-base font-semibold text-slate-800">A few meaningful details</h3>
              <p className="mt-1 text-sm leading-6 text-stone-600">Add a few small details that made them special.</p>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-3 block text-base font-semibold text-slate-800">Category</label>
                <select
                  value={highlightCategory}
                  onChange={e => setHighlightCategory(e.target.value)}
                  className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-5 text-lg text-slate-800 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                >
                  <option>Favorite Song</option>
                  <option>Favorite Recipe</option>
                  <option>Nickname</option>
                  <option>Occupation</option>
                  <option>Favorite Saying</option>
                  <option>Favorite Hobby</option>
                </select>
              </div>
              <div>
                <label className="mb-3 block text-base font-semibold text-slate-800">Detail</label>
                <input
                  value={highlightValue}
                  onChange={e => setHighlightValue(e.target.value)}
                  placeholder="Enter a detail"
                  className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-5 text-lg text-slate-800 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={addHighlightDetail}
                className="inline-flex items-center justify-center rounded-2xl border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-stone-100"
              >
                Add Detail
              </button>
            </div>
            {highlights.length > 0 && (
              <div className="mt-4 space-y-3">
                {highlights.map((item, index) => (
                  <div
                    key={`${item.category}-${index}`}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-white px-4 py-3"
                  >
                    <div className="text-sm text-slate-700">
                      <span className="font-medium">{item.category}:</span> {item.value}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeHighlightDetail(index)}
                      className="text-sm font-medium text-rose-600 transition hover:text-rose-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="mb-3 block text-base font-semibold text-slate-800">Tribute text</label>
            <textarea
              value={memoryText}
              onChange={e => setMemoryText(e.target.value)}
              placeholder="Write a few words about who they were, what you want others to remember, etc."
              rows={8}
              className="w-full rounded-[1.5rem] border border-stone-300 bg-white px-5 py-5 text-lg leading-7 text-slate-800 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />
          </div>
          <div>
            <label className="mb-3 block text-base font-semibold text-slate-800">Your name</label>
            <input
              type="text"
              value={creatorName}
              onChange={e => setCreatorName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-5 text-lg text-slate-800 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />
          </div>
          <div>
            <label className="mb-3 block text-base font-semibold text-slate-800">Your email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-5 text-lg text-slate-800 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />
          </div>
          <div>
            <label className="mb-3 block text-base font-semibold text-slate-800">Visibility</label>
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
                  Anyone with the link can view and share this tribute. This is best for family sharing and required for QR plaque use.
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
                  Save this tribute as a draft before sharing it with others.
                </p>
              </button>
            </div>
          </div>
          <div>
            <label className="mb-3 block text-base font-semibold text-slate-800">Theme</label>
            <div className="mt-3 grid gap-4 md:grid-cols-3">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`rounded-[1.5rem] border p-5 text-left transition ${
                  theme === "light"
                    ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100"
                    : "border-stone-300 bg-white hover:border-stone-400"
                }`}
              >
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                  <div className="h-20 rounded-lg bg-white shadow-sm" />
                  <div className="mt-3 space-y-2">
                    <div className="h-3 w-2/3 rounded bg-stone-300" />
                    <div className="h-2 w-1/3 rounded bg-stone-200" />
                    <div className="h-2 w-1/2 rounded bg-stone-200" />
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">Light</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Soft, airy, and warm. Gentle and approachable.</p>
              </button>
              <button
                type="button"
                onClick={() => setTheme("black_tie")}
                className={`rounded-[1.5rem] border p-5 text-left transition ${
                  theme === "black_tie"
                    ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100"
                    : "border-stone-300 bg-white hover:border-stone-400"
                }`}
              >
                <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
                  <div className="h-20 rounded-lg bg-neutral-900" />
                  <div className="mt-3 space-y-2">
                    <div className="h-3 w-2/3 rounded bg-neutral-500" />
                    <div className="h-2 w-1/3 rounded bg-neutral-700" />
                    <div className="h-2 w-1/2 rounded bg-neutral-700" />
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">Black Tie</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Elegant, formal, and timeless. A refined memorial feel.</p>
              </button>
              <button
                type="button"
                onClick={() => setTheme("nature")}
                className={`rounded-[1.5rem] border p-5 text-left transition ${
                  theme === "nature"
                    ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100"
                    : "border-stone-300 bg-white hover:border-stone-400"
                }`}
              >
                <div className="rounded-xl border border-[#d7e2d3] bg-[#eef3ec] p-4">
                  <div className="h-20 rounded-lg bg-white/80" />
                  <div className="mt-3 space-y-2">
                    <div className="h-3 w-2/3 rounded bg-[#a8b8a4]" />
                    <div className="h-2 w-1/3 rounded bg-[#c7d3c3]" />
                    <div className="h-2 w-1/2 rounded bg-[#c7d3c3]" />
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">Nature</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Calm, earthy, and reflective. Soft greens and natural tones.</p>
              </button>
            </div>
          </div>
          <div className="pt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={!canSave}
              className={`inline-flex items-center justify-center rounded-2xl px-8 py-4 text-lg font-medium shadow transition ${
                canSave
                  ? "bg-emerald-700 text-white hover:bg-emerald-800"
                  : "cursor-not-allowed bg-stone-200 text-stone-500 shadow-none"
              }`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/tribute/${tributeId}`)}
              className="text-sm font-medium text-stone-500 transition hover:text-stone-800"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
