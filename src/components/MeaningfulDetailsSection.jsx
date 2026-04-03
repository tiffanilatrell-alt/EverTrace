import { useMemo, useState } from "react";

const DETAIL_OPTIONS = [
  {
    category: "Favorite Song",
    icon: "🎵",
    placeholder: "What song reminds people of them?",
  },
  {
    category: "Favorite Saying",
    icon: "🗣️",
    placeholder: "What did they always say?",
  },
  {
    category: "Favorite Meal",
    icon: "🍽️",
    placeholder: "What meal did they love?",
  },
  {
    category: "Known For",
    icon: "✨",
    placeholder: "What were they known for?",
  },
  {
    category: "Favorite Place",
    icon: "📍",
    placeholder: "What place meant a lot to them?",
  },
  {
    category: "Always Loved",
    icon: "💛",
    placeholder: "What did they always love?",
  },
];

function getOption(category) {
  return DETAIL_OPTIONS.find((item) => item.category === category);
}

export default function MeaningfulDetailsSection({ highlights = [], setHighlights }) {
  const [activeCategory, setActiveCategory] = useState("Favorite Song");
  const [detailValue, setDetailValue] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [customCategory, setCustomCategory] = useState("");

  const activeOption = useMemo(() => {
    if (showCustom) {
      return {
        category: customCategory || "Custom",
        icon: "✍️",
        placeholder: "Add a meaningful detail",
      };
    }

    return (
      getOption(activeCategory) || {
        category: "Meaningful Detail",
        icon: "✍️",
        placeholder: "Add a meaningful detail",
      }
    );
  }, [activeCategory, showCustom, customCategory]);

  function selectPreset(category) {
    setActiveCategory(category);
    setShowCustom(false);
    setCustomCategory("");
    setDetailValue("");
  }

  function selectCustom() {
    setShowCustom(true);
    setDetailValue("");
  }

  function addDetail() {
    const trimmedValue = detailValue.trim();
    const trimmedCategory = customCategory.trim();

    if (!trimmedValue) return;

    const finalCategory = showCustom
      ? trimmedCategory || "Meaningful Detail"
      : activeOption.category;

    const finalIcon = showCustom ? "✍️" : activeOption.icon;

    // Functional update prevents dropped additions on fast repeated taps.
    setHighlights((prev) => [
      ...prev,
      {
        category: finalCategory,
        value: trimmedValue,
        icon: finalIcon,
      },
    ]);

    setDetailValue("");
    if (showCustom) {
      setCustomCategory("");
    }
  }

  function removeDetail(indexToRemove) {
    setHighlights((prev) => prev.filter((_, index) => index !== indexToRemove));
  }

  return (
    <div className="mt-8 rounded-2xl border border-stone-200 bg-stone-50/60 p-5 md:p-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">A few personal touches</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          Optional, but these little details can make the tribute feel instantly more like them.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {DETAIL_OPTIONS.map((item) => {
          const isActive = !showCustom && activeCategory === item.category;

          return (
            <button
              key={item.category}
              type="button"
              onClick={() => selectPreset(item.category)}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-emerald-700 bg-emerald-50 text-emerald-900"
                  : "border-stone-300 bg-white text-slate-700 hover:bg-stone-50"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.category}</span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={selectCustom}
          className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition ${
            showCustom
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-stone-300 bg-white text-slate-700 hover:bg-stone-50"
          }`}
        >
          <span>+</span>
          <span>Custom</span>
        </button>
      </div>

      <div className="mt-4 rounded-xl border border-stone-200 bg-white p-4">
        {showCustom && (
          <div className="mb-3">
            <label className="text-sm font-medium text-slate-700">Category</label>
            <input
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="Example: Sunday tradition"
              className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        )}

        <label className="text-sm font-medium text-slate-700">
          {showCustom ? "Detail" : `${activeOption.icon} ${activeOption.category}`}
        </label>

        <input
          type="text"
          value={detailValue}
          onChange={(e) => setDetailValue(e.target.value)}
          placeholder={activeOption.placeholder}
          className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
        />

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={addDetail}
            disabled={!detailValue.trim()}
            className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              detailValue.trim()
                ? "bg-emerald-700 text-white hover:bg-emerald-800"
                : "cursor-not-allowed bg-stone-200 text-stone-500"
            }`}
          >
            Add detail
          </button>

          <span className="text-sm text-slate-500">
            Think: a phrase, favorite, habit, or small thing people remember.
          </span>
        </div>
      </div>

      {highlights.length > 0 && (
        <div className="mt-4">
          <div className="mb-2 text-sm font-medium text-slate-700">Added details</div>

          <div className="flex flex-wrap gap-2">
            {highlights.map((item, index) => (
              <div
                key={`${item.category}-${item.value}-${index}`}
                className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-2 text-sm text-slate-700"
              >
                <span>{item.icon || "✦"}</span>
                <span className="font-medium">{item.category}:</span>
                <span>{item.value}</span>
                <button
                  type="button"
                  onClick={() => removeDetail(index)}
                  className="ml-1 text-slate-400 transition hover:text-slate-700"
                  aria-label={`Remove ${item.category}`}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
