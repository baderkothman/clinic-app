"use client";

import { useTranslations, useLocale } from "next-intl";
import { IconStethoscope, IconEye, IconDental, IconBone, IconClock, IconArrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import type { BookingState } from "./BookingWizard";

const SERVICES = [
  { id: "general", icon: IconStethoscope, name: "General Medicine", nameAr: "الطب العام", duration: 30, color: "#567C99" },
  { id: "optometry", icon: IconEye, name: "Optometry", nameAr: "طب العيون", duration: 45, color: "#7F9B88" },
  { id: "dental", icon: IconDental, name: "Dental Care", nameAr: "طب الأسنان", duration: 60, color: "#C58A6A" },
  { id: "physio", icon: IconBone, name: "Physiotherapy", nameAr: "العلاج الطبيعي", duration: 60, color: "#3C7A57" },
];

interface ServiceStepProps {
  booking: BookingState;
  onNext: (updates: Partial<BookingState>) => void;
}

export function ServiceStep({ booking, onNext }: ServiceStepProps) {
  const t = useTranslations("booking");
  const ts = useTranslations("services");
  const locale = useLocale();

  return (
    <div className="surface-card p-6 md:p-8">
      <h2 className="font-serif text-xl font-semibold text-[#1F2A33] mb-5">
        {t("selectService")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SERVICES.map((svc) => {
          const Icon = svc.icon;
          const name = locale === "ar" ? svc.nameAr : svc.name;
          const isSelected = booking.serviceId === svc.id;

          return (
            <button
              key={svc.id}
              onClick={() => onNext({ serviceId: svc.id, serviceName: name })}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl border text-start transition-all duration-150 touch-target",
                isSelected
                  ? "border-[#567C99] bg-[#567C99]/5 shadow-sm"
                  : "border-[#D6DEE3] hover:border-[#567C99]/50 hover:bg-[#F7F5F0]"
              )}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${svc.color}18` }}
              >
                <Icon size={20} style={{ color: svc.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#1F2A33] truncate">{name}</p>
                <p className="text-xs text-[#4A5A66] flex items-center gap-1 mt-0.5">
                  <IconClock size={11} />
                  {svc.duration} {ts("duration").toLowerCase()}
                </p>
              </div>
              <IconArrowRight size={16} className="text-[#567C99] shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
