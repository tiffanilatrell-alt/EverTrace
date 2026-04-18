import process from "node:process";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

function parseBody(body) {
  if (!body) return {};
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body;
}

function cleanInput(value) {
  if (typeof value !== "string") return "";
  return value.trim();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Missing OPENAI_API_KEY" });
  }

  try {
    const payload = parseBody(req.body);

    const name = cleanInput(payload.name);
    const relationship = cleanInput(payload.relationship);
    const relationshipDetail = cleanInput(payload.relationshipDetail);
    const existingText = cleanInput(payload.existingText);
    const highlights = Array.isArray(payload.highlights)
      ? payload.highlights
          .map((item) => `${cleanInput(item?.category)}: ${cleanInput(item?.value)}`.trim())
          .filter((item) => item && item !== ":")
          .slice(0, 8)
      : [];

    const personDisplayName = name || "their loved one";
    const relationDisplay = relationshipDetail || relationship || "someone deeply loved";

    const userPrompt = [
      `Write a warm, tasteful memorial starter paragraph (4-6 sentences) for ${personDisplayName}.`,
      `Relationship context: ${relationDisplay}.`,
      "Tone requirements: compassionate, timeless, emotionally clear, and simple.",
      "Do not be dramatic or poetic-heavy. No cliches. No religious assumptions.",
      "Focus on character, love, memory, and togetherness.",
      existingText
        ? `If this text exists, write a distinct additional suggestion that complements it without repeating wording: ${existingText}`
        : "",
      highlights.length > 0 ? `Optional details to weave in naturally: ${highlights.join("; ")}` : "",
      "Return plain text only.",
    ]
      .filter(Boolean)
      .join("\n");

    const aiResponse = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        temperature: 0.8,
        max_tokens: 260,
        messages: [
          {
            role: "system",
            content:
              "You write memorial tribute text for families. Keep language calm, humane, and emotionally grounded.",
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
      }),
    });

    const data = await aiResponse.json().catch(() => ({}));
    const text = data?.choices?.[0]?.message?.content?.trim();

    if (!aiResponse.ok || !text) {
      return res.status(502).json({
        error: data?.error?.message || "AI generation failed",
      });
    }

    return res.status(200).json({ text });
  } catch (error) {
    return res.status(500).json({
      error: "Unable to generate tribute text",
      message: error?.message || "Unknown error",
    });
  }
}
