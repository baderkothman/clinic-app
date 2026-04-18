"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { IconChevronLeft, IconChevronRight, IconClock } from "@tabler/icons-react";
import { Button } from "@/components/ui/Button";
import { cn, formatShortDate } from "@/lib/utils";
import type { BookingState } from "./BookingWizard";

const PROVIDERS = [
  { id: "any", name: "Any available provider", nameAr: "أي مزود متاح" },
  { id: "dr-sarah", name: "Dr. Sarah Al-Mansouri", nameAr: "د. سارة المنصوري" },
  { id: "dr-ahmed", name: "Dr. Ahmed Al-Rashidi", nameAr: "د. أحمد الراشدي" },
  { id: "dr-lina", name: "Dr. Lina Al-Farsi", nameAr: "د. لينا الفارسي" },
  { id: "dr-khalid", name: "Dr. Khalid Al-Otaibi", nameAr: "د. خالد العتيبي" },
];

// Generate mock time slots
function getMockSlots(date: Date): Date[] {
  const dayOfWeek = date.getDay(); // 0=Sun, 5=Fri
  if (dayOfWeek === 5) return []; // Closed Friday

  const slots: Date[] = [];
  const hours = [8, 9, 10, 11, 13, 14, 15, 16, 17];
  const minutes = [0, 30];

  for (const h of hours) {
    for (const m of minutes) {
      const slot = new Date(date);
      slot.setHours(h, m, 0, 0);
      // Mock: randomly omit ~25% slots as booked
      if (Math.sin(h * date.getDate() + m) > -0.5) {
        slots.push(slot);
      }
    }
  }
  return slots;
}

function getNext7Days(): Date[] {
  const days: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

interface ProviderSlotStepProps {
  booking: BookingState;
  onNext: (updates: Partial<BookingState>) => void;
  onBack: () => void;
}

export function ProviderSlotStep({ booking, onNext, onBack }: ProviderSlotStepProps) {
  const t = useTranslations("booking");
  const locale = useLocale();

  const days = useMemo(() => getNext7Days(), []);
  const [selectedProvider, setSelectedProvider] = useState(booking.providerId ?? "any");
  const [dateIndex, setDateIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(booking.selectedSlot);

  const visibleDays = days.slice(dateIndex, dateIndex + 7);
  const [selectedDate, setSelectedDate] = useState<Date>(days[0]);
  const slots = useMemo(() => getMockSlots(selectedDate), [selectedDate]);

  const chosenProvider = PROVIDERS.find((p) => p.id === selectedProvider);

  function handleNext() {
    if (!selectedSlot) return;
    onNext({
      providerId: selectedProvider === "any" ? null : selectedProvider,
      providerName: selectedProvider === "any"
        ? null
        : (locale === "ar" ? chosenProvider?.nameAr : chosenProvider?.name) ?? null,
      selectedDate,
      selectedSlot,
    });
  }

  return (
    <div className="surface-card p-6 md:p-8 space-y-6">
      {/* Provider select */}
      <div>
        <label className="block text-sm font-medium text-[#1F2A33] mb-2">
          {t("selectProvider")}
        </label>
        <select
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value)}
          className="input-base"
        >
          {PROVIDERS.map((p) => (
            <option key={p.id} value={p.id}>
              {locale === "ar" ? p.nameAr : p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Date picker */}
      <div>
        <label className="block text-sm font-medium text-[#1F2A33] mb-3">
          {t("selectDate")}
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDateIndex(Math.max(0, dateIndex - 7))}
            disabled={dateIndex === 0}
            className="p-1.5 rounded-lg border border-[#D6DEE3] text-[#4A5A66] hover:text-[#1F2A33] disabled:opacity-40 transition-colors touch-target"
          >
            <IconChevronLeft size={16} />
          </button>

          <div className="flex-1 grid grid-cols-7 gap-1">
            {visibleDays.map((day) => {
              const isSelected = selectedDate.toDateString() === day.toDateString();
              const isFriday = day.getDay() === 5;
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => { setSelectedDate(day); setSelectedSlot(null); }}
                  disabled={isFriday}
                  className={cn(
                    "flex flex-col items-center py-2 px-1 rounded-lg text-xs transition-all touch-target",
                    isSelected
                      ? "bg-[#567C99] text-white"
                      : isFriday
                      ? "opacity-40 cursor-not-allowed text-[#4A5A66]"
                      : "hover:bg-[#567C99]/10 text-[#4A5A66]"
                  )}
                >
                  <span className="font-medium">
                    {day.toLocaleDateString(locale === "ar" ? "ar-KW" : "en-GB", { weekday: "short" })}
                  </span>
                  <span className={cn("text-base font-semibold mt-0.5", isSelected ? "text-white" : "text-[#1F2A33]")}>
                    {day.getDate()}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setDateIndex(Math.min(days.length - 7, dateIndex + 7))}
            disabled={dateIndex >= days.length - 7}
            className="p-1.5 rounded-lg border border-[#D6DEE3] text-[#4A5A66] hover:text-[#1F2A33] disabled:opacity-40 transition-colors touch-target"
          >
            <IconChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Time slots */}
      <div>
        <label className="block text-sm font-medium text-[#1F2A33] mb-3">
          {t("selectTime")}
          <span className="ms-2 text-xs text-[#4A5A66]">
            {formatShortDate(selectedDate, locale)}
          </span>
        </label>

        {slots.length === 0 ? (
          <p className="text-sm text-[#4A5A66] py-4 text-center">{t("noSlots")}</p>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {slots.map((slot) => {
              const isSelected = selectedSlot?.getTime() === slot.getTime();
              const timeStr = slot.toLocaleTimeString(locale === "ar" ? "ar-KW" : "en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });
              return (
                <button
                  key={slot.toISOString()}
                  onClick={() => setSelectedSlot(slot)}
                  className={cn(
                    "flex items-center justify-center gap-1 py-2 px-2 rounded-lg text-xs font-medium transition-all border touch-target",
                    isSelected
                      ? "bg-[#567C99] text-white border-[#567C99]"
                      : "border-[#D6DEE3] text-[#4A5A66] hover:border-[#567C99] hover:text-[#567C99]"
                  )}
                >
                  <IconClock size={10} />
                  {timeStr}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="flex-1">
          {t("back")}
        </Button>
        <Button
          onClick={handleNext}
          disabled={!selectedSlot}
          className="flex-1"
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
}
