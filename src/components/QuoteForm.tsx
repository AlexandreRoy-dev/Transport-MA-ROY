"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function QuoteForm() {
  const t = useTranslations("contact");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [draft, setDraft] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const size = String(data.get("size") ?? "");
    const intent = String(data.get("intent") ?? "");
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setError(t("errorRequired"));
      return;
    }
    if (!emailOk.test(email)) {
      setError(t("errorEmail"));
      return;
    }

    const body = [
      `${t("name")}: ${name}`,
      `${t("emailField")}: ${email}`,
      `${t("phoneField")}: ${phone || "—"}`,
      `${t("size")}: ${size}`,
      `${t("intent")}: ${intent}`,
      "",
      message,
    ].join("\n");

    setDraft(body);
    setError("");
    setSent(true);

    const mailto = `mailto:${t("email")}?subject=${encodeURIComponent(
      t("subject"),
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  if (sent) {
    return (
      <div className="border border-line bg-ink-soft p-6 sm:p-8">
        <h3 className="font-display text-3xl uppercase text-paper">{t("sentTitle")}</h3>
        <p className="measure mt-4 text-dust">
          {t("sentBody", { email: t("email") })}
        </p>
        <pre className="mt-6 overflow-auto whitespace-pre-wrap border border-line bg-ink p-4 text-sm text-paper">
          {draft}
        </pre>
      </div>
    );
  }

  const field = "mt-2 min-h-12 w-full border border-line bg-ink px-3 text-paper placeholder:text-steel";

  return (
    <form onSubmit={onSubmit} className="border border-line bg-ink-soft p-6 sm:p-8" noValidate>
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
          <select name="size" className={field} defaultValue={t("sizeUnsure")}>
            <option>{t("size20")}</option>
            <option>{t("size40")}</option>
            <option>{t("sizeHc")}</option>
            <option>{t("sizeUnsure")}</option>
          </select>
        </label>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm text-dust">{t("intent")}</legend>
        <div className="mt-3 flex flex-wrap gap-4">
          <label className="inline-flex min-h-11 items-center gap-2 text-paper">
            <input type="radio" name="intent" value={t("intentSale")} defaultChecked />
            {t("intentSale")}
          </label>
          <label className="inline-flex min-h-11 items-center gap-2 text-paper">
            <input type="radio" name="intent" value={t("intentRent")} />
            {t("intentRent")}
          </label>
        </div>
      </fieldset>

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

      {error ? (
        <p className="mt-4 text-sm text-[#f0b4a0]" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="mt-6 inline-flex min-h-12 items-center bg-corten px-6 text-[0.8rem] font-semibold tracking-[0.14em] uppercase text-paper-hot transition-colors duration-200 hover:bg-corten-deep"
      >
        {t("submit")}
      </button>
    </form>
  );
}
