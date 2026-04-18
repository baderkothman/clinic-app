"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { ServiceStep } from "./ServiceStep";
import { ProviderSlotStep } from "./ProviderSlotStep";
import { PatientDetailsStep } from "./PatientDetailsStep";
import { ConfirmationStep } from "./ConfirmationStep";

export type BookingState = {
  serviceId: string | null;
  serviceName: string | null;
  providerId: string | null;
  providerName: string | null;
  selectedDate: Date | null;
  selectedSlot: Date | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
  appointmentId: string | null;
  secureToken: string | null;
};

interface BookingWizardProps {
  initialServiceId?: string;
  initialProviderId?: string;
}

export function BookingWizard({ initialServiceId, initialProviderId }: BookingWizardProps) {
  const t = useTranslations("booking");
  const locale = useLocale();

  const [step, setStep] = useState(initialServiceId ? 1 : 0);
  const [booking, setBooking] = useState<BookingState>({
    serviceId: initialServiceId ?? null,
    serviceName: null,
    providerId: initialProviderId ?? null,
    providerName: null,
    selectedDate: null,
    selectedSlot: null,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
    appointmentId: null,
    secureToken: null,
  });

  const steps = [t("step1"), t("step2"), t("step3"), t("step4")];

  function updateBooking(updates: Partial<BookingState>) {
    setBooking((prev) => ({ ...prev, ...updates }));
  }

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-[#D2DCE2] bg-gradient-to-b from-[#FFFEFC] to-[#F5F1EA] p-5 shadow-[0_18px_30px_-22px_rgba(31,42,51,0.6)] sm:p-7">
      <div className="relative mb-6 h-32 overflow-hidden rounded-xl border border-white/60 shadow-md sm:h-36">
        <Image
          src="https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&w=1200&q=80"
          alt="Healthcare professional preparing an appointment"
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F2A33]/60 via-[#1F2A33]/18 to-transparent" />
        <div className="absolute bottom-3 start-3 rounded-lg border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
          Appointment booking
        </div>
      </div>

      {/* Page title */}
      <h1 className="mb-8 text-center font-serif text-3xl font-semibold tracking-tight text-[#1F2A33]">
        {t("title")}
      </h1>

      {/* Step indicator */}
      {step < 3 && (
        <div className="mb-8 flex items-center justify-center gap-0">
          {steps.slice(0, 3).map((label, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ring-1 ring-white/70 transition-colors",
                      done
                        ? "bg-[#3C7A57] text-white"
                        : active
                        ? "bg-[#567C99] text-white"
                        : "bg-[#D6DEE3] text-[#4A5A66]"
                    )}
                  >
                    {done ? <IconCheck size={15} /> : i + 1}
                  </div>
                  <span
                    className={cn(
                      "mt-1 hidden text-xs sm:block",
                      active ? "text-[#567C99] font-medium" : "text-[#4A5A66]"
                    )}
                  >
                    {label}
                  </span>
                </div>
                {i < 2 && (
                  <div
                    className={cn(
                      "mx-1 h-0.5 w-12 transition-colors sm:w-20",
                      done ? "bg-[#3C7A57]" : "bg-[#D6DEE3]"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: locale === "ar" ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: locale === "ar" ? 20 : -20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {step === 0 && (
            <ServiceStep
              booking={booking}
              onNext={(updates) => { updateBooking(updates); setStep(1); }}
            />
          )}
          {step === 1 && (
            <ProviderSlotStep
              booking={booking}
              onNext={(updates) => { updateBooking(updates); setStep(2); }}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <PatientDetailsStep
              booking={booking}
              onNext={(updates) => { updateBooking(updates); setStep(3); }}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <ConfirmationStep booking={booking} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
