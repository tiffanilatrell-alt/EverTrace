// Minimal icon-only reaction button
function MinimalReactionButton({ emoji, count, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition",
        active
          ? "border-emerald-300 bg-emerald-50"
          : "border-stone-200 bg-white hover:bg-stone-50",
      ].join(" ")}
    >
      <span className="text-base">{emoji}</span>
      <span className="tabular-nums text-slate-700">{count}</span>
    </button>
  );
}
import React, { useState } from "react";

const EMOJIS = [
  { key: "candle", emoji: "\uD83D\uDD6F\uFE0F", label: "Light a Candle" },
  { key: "dove", emoji: "\uD83D\uDC26", label: "Send a Dove" },
  { key: "flower", emoji: "\uD83C\uDF38", label: "Leave a Flower" },
];

export default function PhotoGallery({ photos = [], onReact, reactionsEnabled = true }) {
  if (!Array.isArray(photos) || photos.length === 0) return null;

  const [localReactions, setLocalReactions] = useState({});

  function handleReact(photoId, type) {
    setLocalReactions((prev) => ({
      ...prev,
      [photoId]: {
        ...(prev[photoId] || {}),
        [type]: ((prev[photoId]?.[type] || 0) + 1),
      },
    }));
    if (onReact) onReact(photoId, type);
  }

  return (
    <div className="my-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {photos.map((photo, idx) => {
          const url = typeof photo === "string" ? photo : photo.url;
          const photoId = photo.id || idx;
          const reactions = photo.reactions || {};
          const local = localReactions[photoId] || {};
          return (
            <div key={photoId} className="relative transition duration-300 hover:scale-[1.02]">
              <img
                src={url}
                alt={`Tribute photo ${idx + 1}`}
                className="w-full aspect-[4/5] object-cover rounded-sm"
              />
              {reactionsEnabled && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  {EMOJIS.map(({ key, emoji }) => (
                    <MinimalReactionButton
                      key={key}
                      emoji={emoji}
                      count={(reactions[key] || 0) + (local[key] || 0)}
                      onClick={() => handleReact(photoId, key)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
