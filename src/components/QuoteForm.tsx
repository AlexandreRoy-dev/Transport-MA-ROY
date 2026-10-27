"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TIMEOUT_MS = 10_000;

const TAILLE_FR = {
  "20": "20 pieds",
  "40": "40 pieds",
  side: "40 pieds à portes latérales",
  reefer: "Réfrigéré ou isolé",
  unsure: "À déterminer",
} as const;

const TRANSACTION_FR = {
  sale: "Achat",
  rent: "Location",
  modify: "Modification",
  advice: "Conseil",
} as const;

type TailleKey = keyof typeof TAILLE_FR;
type TransactionKey = keyof typeof TRANSACTION_FR;

type LeadPayload = {
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string;
  taille_pieds: (typeof TAILLE_FR)[TailleKey];
  transaction: (typeof TRANSACTION_FR)[TransactionKey];
  ville: string;
  message: string;
  source: "transportmar.ca";
  page_url: string;
};

function isTaille(value: string): value is TailleKey {
  return Object.prototype.hasOwnProperty.call(TAILLE_FR, value);
}

function isTransaction(value: string): value is TransactionKey {
  return Object.prototype.hasOwnProperty.call(TRANSACTION_FR, value);
}

function splitName(name: string) {
  const full_name = name.trim();
  const [first_name = "", ...rest] = full_name.split(/\s+/);
  return { first_name, last_name: rest.join(" "), full_name };
}

function statusIsError(data: unknown) {
  if (!data || typeof data !== "object" || !("status" in data)) return false;
  const status = (data as { status?: unknown }).status;
  return typeof status === "string" && status.startsWith("Error");
}

async function postSoumission(endpoint: string, payload: LeadPayload) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!response.ok) throw new Error(String(response.status));

  const text = await response.text();
  if (!text.trim()) return;

  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return;
  }
  if (statusIsError(data)) throw new Error("rejected");
}

export function QuoteForm() {
  const t = useTranslations("contact");
  const [error, setError] = useState("");
  const [sendFailed, setSendFailed] = useState(false);
  const [fallbackMail, setFallbackMail] = useState("");
  const [phase, setPhase] = useState<"edit" | "sending" | "sent" | "mailed">("edit");
  const [draft, setDraft] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phase === "sending") return;

    const data = new FormData(event.currentTarget);
    const website = String(data.get("website") ?? "").trim();
    if (website) {
      setError("");
      setSendFailed(false);
      setPhase("sent");
      return;
    }

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const size = String(data.get("size") ?? "");
    const intent = String(data.get("intent") ?? "");
    const city = String(data.get("city") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setSendFailed(false);
      setError(t("errorRequired"));
      return;
    }
    if (!emailOk.test(email)) {
      setSendFailed(false);
      setError(t("errorEmail"));
      return;
    }
    if (!isTaille(size) || !isTransaction(intent)) {
      setSendFailed(false);
      setError(t("errorRequired"));
      return;
    }

    const taille = TAILLE_FR[size];
    const transaction = TRANSACTION_FR[intent];
    const sizeLabel = {
      "20": t("size20"),
      "40": t("size40"),
      side: t("sizeSide"),
      reefer: t("sizeReefer"),
      unsure: t("sizeUnsure"),
    }[size];
    const intentLabel = {
      sale: t("intentSale"),
      rent: t("intentRent"),
      modify: t("intentModify"),
      advice: t("intentAdvice"),
    }[intent];
    const body = [
      `${t("name")}: ${name}`,
      `${t("emailField")}: ${email}`,
      `${t("phoneField")}: ${phone || "-"}`,
      `${t("size")}: ${sizeLabel}`,
      `${t("intent")}: ${intentLabel}`,
      `${t("city")}: ${city || "-"}`,
      "",
      message,
    ].join("\n");

    const mailto = `mailto:${t("email")}?subject=${encodeURIComponent(
      t("subject"),
    )}&body=${encodeURIComponent(body)}`;

    const endpoint = process.env.NEXT_PUBLIC_SOUMISSION_ENDPOINT?.trim() ?? "";
    if (!endpoint) {
      setDraft(body);
      setError("");
      setSendFailed(false);
      setPhase("mailed");
      window.location.href = mailto;
      return;
    }

    const { first_name, last_name, full_name } = splitName(name);
    const payload: LeadPayload = {
      first_name,
      last_name,
      full_name,
      email,
      phone,
      taille_pieds: taille,
      transaction,
      ville: city,
      message,
      source: "transportmar.ca",
      page_url: window.location.href,
    };

    setError("");
    setSendFailed(false);
    setPhase("sending");

    try {
      await postSoumission(endpoint, payload);
      setPhase("sent");
    } catch {
      setFallbackMail(mailto);
      setSendFailed(true);
      setPhase("edit");
    }
  }

  if (phase === "sent" || phase === "mailed") {
    const mailed = phase === "mailed";
    return (
      <div className="border border-line bg-ink-soft p-6 sm:p-8">
        <h3 className="font-display text-3xl uppercase text-paper">
          {mailed ? t("sentTitle") : t("sendSuccessTitle")}
        </h3>
        <p className="measure mt-4 text-dust">
          {mailed ? t("sentBody", { email: t("email") }) : t("sendSuccessBody")}
        </p>
        {mailed ? (
          <pre className="mt-6 overflow-auto whitespace-pre-wrap border border-line bg-ink p-4 text-sm text-paper">
            {draft}
          </pre>
        ) : null}
      </div>
    );
  }

  const field = "mt-2 min-h-12 w-full border border-line bg-ink px-3 text-paper placeholder:text-steel";
  const sending = phase === "sending";

  return (
    <form
      onSubmit={onSubmit}
      className="border border-line bg-ink-soft p-6 sm:p-8"
      noValidate
      aria-busy={sending}
    >
      <h2 className="font-display text-3xl uppercase tracking-tight text-paper">
        {t("formTitle")}
      </h2>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <label className="block text-sm text-dust">
          {t("name")}
          <input
            name="name"
            autoComplete="name"
            required
            className={field}
            placeholder={t("namePlaceholder")}
          />
        </label>
        <label className="block text-sm text-dust">
          {t("emailField")}
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className={field}
            placeholder={t("emailPlaceholder")}
          />
        </label>
        <label className="block text-sm text-dust">
          {t("phoneField")}
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className={field}
            placeholder={t("phonePlaceholder")}
          />
        </label>
        <label className="block text-sm text-dust">
          {t("size")}
          <select name="size" className={field} defaultValue="unsure">
            <option value="20">{t("size20")}</option>
            <option value="40">{t("size40")}</option>
            <option value="side">{t("sizeSide")}</option>
            <option value="reefer">{t("sizeReefer")}</option>
            <option value="unsure">{t("sizeUnsure")}</option>
          </select>
        </label>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm text-dust">{t("intent")}</legend>
        <div className="mt-3 flex flex-wrap gap-4">
          <label className="inline-flex min-h-11 items-center gap-2 text-paper">
            <input type="radio" name="intent" value="sale" defaultChecked />
            {t("intentSale")}
          </label>
          <label className="inline-flex min-h-11 items-center gap-2 text-paper">
            <input type="radio" name="intent" value="rent" />
            {t("intentRent")}
          </label>
          <label className="inline-flex min-h-11 items-center gap-2 text-paper">
            <input type="radio" name="intent" value="modify" />
            {t("intentModify")}
          </label>
          <label className="inline-flex min-h-11 items-center gap-2 text-paper">
            <input type="radio" name="intent" value="advice" />
            {t("intentAdvice")}
          </label>
        </div>
      </fieldset>

      <label className="mt-6 block text-sm text-dust">
        {t("city")}
        <input name="city" autoComplete="address-level2" className={field} placeholder={t("cityPlaceholder")} />
      </label>

      <label className="mt-6 block text-sm text-dust">
        {t("message")}
        <textarea
          name="message"
          required
          rows={5}
          className={`${field} min-h-32 py-3`}
          placeholder={t("messagePlaceholder")}
        />
      </label>

      <div className="sr-only" aria-hidden="true">
        <label>
          Site web
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      {sendFailed ? (
        <p className="mt-4 text-sm text-[#f0b4a0]" role="alert">
          {t("sendError")}{" "}
          <a href={fallbackMail} className="underline">
            {t("sendErrorLink")}
          </a>
        </p>
      ) : error ? (
        <p className="mt-4 text-sm text-[#f0b4a0]" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={sending}
        className="mt-6 inline-flex min-h-12 items-center bg-corten px-6 text-[0.8rem] font-semibold tracking-[0.14em] uppercase text-white transition-colors duration-200 hover:bg-corten-deep disabled:opacity-60"
      >
        {sending ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
