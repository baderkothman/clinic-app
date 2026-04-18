"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { IconCircleCheck, IconCalendar, IconPhone, IconMail } from "@tabler/icons-react";
import type { BookingState } from "./BookingWizard";

interface ConfirmationStepProps {
  booking: BookingState;
}

export function ConfirmationStep({ booking }: ConfirmationStepProps) {
  const t = useTranslations("booking");
  const locale = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="surface-card p-8 text-center"
    >
      {/* Success icon */}
      <div className="w-16 h-16 rounded-full bg-[#3C7A57]/10 flex items-center justify-center mx-auto mb-5">
        <IconCircleCheck size={36} className="text-[#3C7A57]" />
      </div>

      <h2 className="font-serif text-2xl font-semibold text-[#1F2A33] mb-2">
        {t("confirmationTitle")}
      </h2>
      <p className="text-[#4A5A66] mb-6 max-w-sm mx-auto">
        {t("confirmationMessage")}
      </p>

      {/* Appointment summary */}
      <div className="bg-[#F7F5F0] rounded-xl p-5 text-start space-y-3 mb-7">
        {booking.serviceName && (
          <div className="flex items-center gap-3 text-sm">
            <IconCalendar size={16} className="text-[#567C99] shrink-0" />
            <div>
              <p className="font-medium text-[#1F2A33]">{booking.serviceName}</p>
              {booking.selectedSlot && (
                <p className="text-[#4A5A66] text-xs mt-0.5">
                  {booking.selectedSlot.toLocaleDateString("en-GB", {
                    weekday: "long", day: "numeric", month: "long", year: "numeric",
                  })}{" "}
                  at{" "}
                  {booking.selectedSlot.toLocaleTimeString("en-GB", {
                    hour: "2-digit", minute: "2-digit", hour12: true,
                  })}
                </p>
              )}
            </div>
          </div>
        )}

        {booking.email && (
          <div className="flex items-center gap-3 text-sm">
            <IconMail size={16} className="text-[#567C99] shrink-0" />
            <p className="text-[#4A5A66]">{booking.email}</p>
          </div>
        )}

        {booking.phone && (
          <div className="flex items-center gap-3 text-sm">
            <IconPhone size={16} className="text-[#567C99] shrink-0" />
            <p className="text-[#4A5A66]">{booking.phone}</p>
          </div>
        )}
      </div>

      {/* Reminders note */}
      <p className="text-xs text-[#4A5A66] mb-6">
        {locale === "ar"
          ? "ستتلقى تذكيرات قبل 24 ساعة وساعتين من موعدك."
          : "You'll receive reminders 24 hours and 2 hours before your appointment."}
      </p>

      <Link
        href={`/${locale}`}
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#567C99] text-white text-sm font-medium rounded-lg hover:bg-[#3D5E78] transition-colors touch-target"
      >
        {locale === "ar" ? "العودة للرئيسية" : "Back to Home"}
      </Link>
    </motion.div>
  );
}
