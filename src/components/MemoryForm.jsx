import { useMemo, useState } from "react";

export default function MemoryForm({
  honoreeName = "them",
  onSubmit,
  onCancel,
  isSaving = false,
}) {
  const [contributorName, setContributorName] = useState("");
  const [memoryText, setMemoryText] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState("");
  const [error, setError] = useState("");

  const firstName = useMemo(() => {
    return honoreeName?.split(" ")[0] || "them";
  }, [honoreeName]);

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    const maxSizeMb = 8;
    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`Please choose an image under ${maxSizeMb}MB.`);
      return;
    }

    setError("");
    setPhotoFile(file);

    const previewUrl = URL.createObjectURL(file);
    setPhotoPreviewUrl(previewUrl);
  }

  function removePhoto() {
    if (photoPreviewUrl) {
      URL.revokeObjectURL(photoPreviewUrl);
    }
    setPhotoFile(null);
    setPhotoPreviewUrl("");
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!memoryText.trim()) {
      setError("Please share a memory before submitting.");
      return;
    }

    setError("");

    await onSubmit({
      contributorName: contributorName.trim(),
      memoryText: memoryText.trim(),
      photoFile,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm"
    >
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
          Share a memory
        </p>

        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
          What will you always remember about {firstName}?
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
          Share a story, a moment, or something that captures who they were.
        </p>
      </div>

      <div className="mt-6 grid gap-6">
        <div>
          <label className="mb-3 block text-sm font-semibold text-slate-800">
            Your name <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <input
            type="text"
            value={contributorName}
            onChange={(e) => setContributorName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-4 text-base text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label className="mb-3 block text-sm font-semibold text-slate-800">
            Your memory
          </label>
          <textarea
            value={memoryText}
            onChange={(e) => setMemoryText(e.target.value)}
            rows={6}
            placeholder={`Share your favorite memory of ${firstName}...`}
            className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-4 text-base leading-7 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label className="mb-3 block text-sm font-semibold text-slate-800">
            Add a photo <span className="font-normal text-slate-500">(optional)</span>
          </label>

          {!photoPreviewUrl ? (
            <label className="flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-4 py-8 text-center transition hover:border-stone-400 hover:bg-stone-100">
              <div>
                <p className="text-sm font-medium text-slate-700">Choose one photo</p>
                <p className="mt-1 text-xs text-slate-500">JPG, PNG, or WEBP up to 8MB</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <img
                src={photoPreviewUrl}
                alt="Memory preview"
                className="mx-auto aspect-[4/5] w-full max-w-xs rounded-xl object-cover"
              />

              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={removePhoto}
                  className="rounded-full border border-stone-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-white"
                >
                  Remove photo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-full bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Share this memory"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="rounded-full border border-stone-300 px-6 py-3 text-slate-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}