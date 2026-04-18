import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(date: Date, locale: string = "en"): string {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-KW" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kuwait",
  }).format(date);
}

export function formatDate(date: Date, locale: string = "en"): string {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-KW" : "en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Kuwait",
  }).format(date);
}

export function formatShortDate(date: Date, locale: string = "en"): string {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-KW" : "en-GB", {
    month: "short",
    day: "numeric",
    timeZone: "Asia/Kuwait",
  }).format(date);
}

/** Generate 30-minute slots between start and end times */
export function generateTimeSlots(
  date: Date,
  startHour: number,
  endHour: number,
  intervalMinutes: number = 30
): Date[] {
  const slots: Date[] = [];
  const current = new Date(date);
  current.setHours(startHour, 0, 0, 0);
  const end = new Date(date);
  end.setHours(endHour, 0, 0, 0);

  while (current < end) {
    slots.push(new Date(current));
    current.setMinutes(current.getMinutes() + intervalMinutes);
  }

  return slots;
}

export function getAppointmentStatusColor(status: string): string {
  const colors: Record<string, string> = {
    requested:   "bg-[#A06A2C]/10 text-[#A06A2C]",
    confirmed:   "bg-[#567C99]/10 text-[#567C99]",
    rescheduled: "bg-[#7F9B88]/10 text-[#7F9B88]",
    cancelled:   "bg-[#B34A4A]/10 text-[#B34A4A]",
    completed:   "bg-[#3C7A57]/10 text-[#3C7A57]",
    no_show:     "bg-[#4A5A66]/10 text-[#4A5A66]",
  };
  return colors[status] ?? "bg-gray-100 text-gray-600";
}
