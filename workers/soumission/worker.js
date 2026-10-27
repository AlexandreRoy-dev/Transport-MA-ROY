const ALLOWED_ORIGINS = new Set([
  "https://transportmar.ca",
  "https://www.transportmar.ca",
]);

const TAILLES = new Set([
  "20 pieds",
  "40 pieds",
  "40 pieds à portes latérales",
  "Réfrigéré ou isolé",
  "À déterminer",
]);

const TRANSACTIONS = new Set(["Achat", "Location", "Modification", "Conseil"]);

const LIMITS = {
  first_name: 80,
  last_name: 80,
  full_name: 160,
  email: 200,
  phone: 40,
  ville: 120,
  message: 4000,
  page_url: 2000,
};

const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname !== "/api/soumission") {
      return new Response("Introuvable", { status: 404 });
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    const headers = corsHeaders(request);

    if (request.method !== "POST") {
      return json({ error: "Méthode refusée" }, 405, headers);
    }

    const origin = request.headers.get("Origin");
    if (!origin || !ALLOWED_ORIGINS.has(origin)) {
      return json({ error: "Origine refusée" }, 403, headers);
    }

    const raw = await request.text();
    if (raw.length > 20_000) {
      return json({ error: "Message trop long" }, 413, headers);
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      return json({ error: "JSON invalide" }, 400, headers);
    }

    const payload = validate(data);
    if (!payload) {
      return json({ error: "Champs invalides" }, 400, headers);
    }

    const webhook = env.GHL_WEBHOOK_URL;
    if (!webhook) {
      return json({ error: "Configuration manquante" }, 500, headers);
    }

    let upstream;
    try {
      upstream = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      return json({ error: "Transmission impossible" }, 502, headers);
    }

    if (!upstream.ok) {
      return json({ error: "Transmission refusée" }, 502, headers);
    }

    return json({ ok: true }, 200, headers);
  },
};

function validate(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;

  const payload = {
    first_name: data.first_name,
    last_name: data.last_name,
    full_name: data.full_name,
    email: data.email,
    phone: data.phone,
    taille_pieds: data.taille_pieds,
    transaction: data.transaction,
    ville: data.ville,
    message: data.message,
    source: data.source,
    page_url: data.page_url,
  };

  for (const key of Object.keys(payload)) {
    if (typeof payload[key] !== "string") return null;
  }

  for (const [key, max] of Object.entries(LIMITS)) {
    if (payload[key].length > max) return null;
  }

  if (!payload.first_name.trim() || !payload.full_name.trim() || !payload.message.trim()) {
    return null;
  }
  if (!emailOk.test(payload.email)) return null;
  if (!TAILLES.has(payload.taille_pieds)) return null;
  if (!TRANSACTIONS.has(payload.transaction)) return null;
  if (payload.source !== "transportmar.ca") return null;
  if (!/^https?:\/\//.test(payload.page_url)) return null;

  return payload;
}

function corsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  const headers = {
    Vary: "Origin",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
  if (ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

function json(body, status, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...headers,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
