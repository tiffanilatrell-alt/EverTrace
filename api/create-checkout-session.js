import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRODUCT_CONFIG = {
  grounds: {
    name: "EverTrace Grounds Care Visit",
    description: "Respectful gravesite care with photo updates after every visit.",
    unitAmount: 7900,
  },
  stories: {
    name: "EverTrace Memorial Medallion + Story Setup",
    description: "A lasting way to connect a physical marker to a digital tribute page.",
    unitAmount: 5400,
  },
};

function getOrigin(req) {
  const forwardedProto = req.headers["x-forwarded-proto"];
  const forwardedHost = req.headers["x-forwarded-host"] || req.headers.host;

  if (forwardedHost) {
    return `${forwardedProto || "https"}://${forwardedHost}`;
  }

  return process.env.APP_URL || "http://localhost:5173";
}

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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: "Missing STRIPE_SECRET_KEY" });
  }

  try {
    const payload = parseBody(req.body);

    const type = payload.type === "stories" ? "stories" : "grounds";
    const product = PRODUCT_CONFIG[type];
    const origin = getOrigin(req);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: product.unitAmount,
            product_data: {
              name: product.name,
              description: product.description,
            },
          },
        },
      ],
      customer_email: payload.email || undefined,
      metadata: {
        type,
        fullName: payload.fullName || "",
        email: payload.email || "",
        phone: payload.phone || "",
        honoreeName: payload.honoreeName || "",
        notes: payload.notes || "",
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/${type}`,
    });

    return res.status(200).json({ id: session.id, url: session.url });
  } catch (error) {
    return res.status(500).json({
      error: "Unable to create checkout session",
      message: error?.message || "Unknown error",
    });
  }
}