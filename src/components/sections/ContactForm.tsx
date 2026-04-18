"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    // Simulated submission — real implementation will call an API route
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-[#1F2A33]">
          {t("name")}
        </label>
        <input
          type="text"
          required
          placeholder={t("namePlaceholder")}
          className="input-base"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-[#1F2A33]">
          {t("emailField")}
        </label>
        <input
          type="email"
          required
          placeholder={t("emailPlaceholder")}
          className="input-base"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-[#1F2A33]">
          {t("message")}
        </label>
        <textarea
          required
          rows={5}
          placeholder={t("messagePlaceholder")}
          className="input-base resize-none"
        />
      </div>

      {status === "success" ? (
        <div className="rounded-lg border border-[#3C7A57]/25 bg-[#3C7A57]/10 p-4 text-sm font-semibold text-[#3C7A57]">
          {t("successMessage")}
        </div>
      ) : status === "error" ? (
        <div className="rounded-lg border border-[#B34A4A]/25 bg-[#B34A4A]/10 p-4 text-sm font-semibold text-[#B34A4A]">
          {t("errorMessage")}
        </div>
      ) : null}

      {status !== "success" && (
        <Button type="submit" loading={status === "loading"} className="w-full">
          {t("submit")}
        </Button>
      )}
    </form>
  );
}
