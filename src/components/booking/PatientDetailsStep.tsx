"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import type { BookingState } from "./BookingWizard";

interface PatientDetailsStepProps {
  booking: BookingState;
  onNext: (updates: Partial<BookingState>) => void;
  onBack: () => void;
}

export function PatientDetailsStep({ booking, onNext, onBack }: PatientDetailsStepProps) {
  const t = useTranslations("booking");

  const [form, setForm] = useState({
    firstName: booking.firstName,
    lastName: booking.lastName,
    email: booking.email,
    phone: booking.phone,
    notes: booking.notes,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Call booking API
      const res = await fetch("/api/public/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: booking.serviceId,
          providerId: booking.providerId,
          scheduledAt: booking.selectedSlot?.toISOString(),
          patient: form,
          locale: document.documentElement.lang,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Booking failed");
      }

      const data = await res.json();
      onNext({
        ...form,
        appointmentId: data.id,
        secureToken: data.secureToken,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="surface-card p-6 md:p-8 space-y-5">
      {/* Summary */}
      <div className="bg-[#567C99]/8 rounded-xl p-4 text-sm text-[#1F2A33] space-y-1">
        <p><span className="font-medium">{booking.serviceName}</span></p>
        {booking.providerName && <p className="text-[#4A5A66]">{booking.providerName}</p>}
        {booking.selectedSlot && (
          <p className="text-[#4A5A66]">
            {booking.selectedSlot.toLocaleDateString("en-GB", {
              weekday: "long", day: "numeric", month: "long",
            })}{" "}
            at{" "}
            {booking.selectedSlot.toLocaleTimeString("en-GB", {
              hour: "2-digit", minute: "2-digit", hour12: true,
            })}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1F2A33] mb-1.5">
            {t("firstName")} *
          </label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            className="input-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1F2A33] mb-1.5">
            {t("lastName")} *
          </label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            className="input-base"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1F2A33] mb-1.5">
          {t("email")} *
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="input-base"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1F2A33] mb-1.5">
          {t("phone")} *
        </label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="input-base"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1F2A33] mb-1.5">
          {t("notes")}
        </label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          placeholder={t("notesPlaceholder")}
          className="input-base resize-none"
        />
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-[#B34A4A]/10 text-[#B34A4A] text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1" disabled={loading}>
          {t("back")}
        </Button>
        <Button type="submit" loading={loading} className="flex-1">
          {t("confirm")}
        </Button>
      </div>
    </form>
  );
}
