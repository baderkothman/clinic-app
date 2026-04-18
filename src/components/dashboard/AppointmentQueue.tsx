"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconCheck,
  IconX,
  IconUserX,
  IconBell,
  IconCalendar,
  IconUser,
  IconStethoscope,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn, getAppointmentStatusColor } from "@/lib/utils";

type AppointmentStatus =
  | "requested"
  | "confirmed"
  | "rescheduled"
  | "cancelled"
  | "completed"
  | "no_show";

interface MockAppointment {
  id: string;
  patientName: string;
  serviceName: string;
  providerName: string;
  scheduledAt: Date;
  status: AppointmentStatus;
  phone: string;
}

// Demo data
const MOCK_APPOINTMENTS: MockAppointment[] = [
  {
    id: "1",
    patientName: "Ali Hassan Al-Mutairi",
    serviceName: "General Medicine",
    providerName: "Dr. Sarah Al-Mansouri",
    scheduledAt: new Date(Date.now() + 1000 * 60 * 90),
    status: "confirmed",
    phone: "+965 9123 4567",
  },
  {
    id: "2",
    patientName: "Fatima Al-Rashidi",
    serviceName: "Optometry",
    providerName: "Dr. Ahmed Al-Rashidi",
    scheduledAt: new Date(Date.now() + 1000 * 60 * 150),
    status: "requested",
    phone: "+965 9234 5678",
  },
  {
    id: "3",
    patientName: "Mohammed Al-Farsi",
    serviceName: "Dental Care",
    providerName: "Dr. Lina Al-Farsi",
    scheduledAt: new Date(Date.now() + 1000 * 60 * 210),
    status: "confirmed",
    phone: "+965 9345 6789",
  },
  {
    id: "4",
    patientName: "Sara Al-Otaibi",
    serviceName: "Physiotherapy",
    providerName: "Dr. Khalid Al-Otaibi",
    scheduledAt: new Date(Date.now() - 1000 * 60 * 30),
    status: "completed",
    phone: "+965 9456 7890",
  },
  {
    id: "5",
    patientName: "Khalid Al-Enezi",
    serviceName: "General Medicine",
    providerName: "Dr. Sarah Al-Mansouri",
    scheduledAt: new Date(Date.now() - 1000 * 60 * 120),
    status: "no_show",
    phone: "+965 9567 8901",
  },
];

const STATUS_FILTERS = ["all", "requested", "confirmed", "completed"] as const;

function getStatusBadgeVariant(status: AppointmentStatus) {
  const map: Record<AppointmentStatus, "default" | "success" | "warning" | "error" | "info" | "muted"> = {
    requested:   "warning",
    confirmed:   "default",
    rescheduled: "info",
    cancelled:   "error",
    completed:   "success",
    no_show:     "muted",
  };
  return map[status];
}

export function AppointmentQueue() {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const [filter, setFilter] = useState<"all" | AppointmentStatus>("all");
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const filtered = appointments.filter(
    (a) => filter === "all" || a.status === filter
  );

  async function handleAction(id: string, newStatus: AppointmentStatus) {
    setProcessingId(id);
    await new Promise((r) => setTimeout(r, 600));
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    setProcessingId(null);
  }

  function formatTime(date: Date) {
    return date.toLocaleTimeString(locale === "ar" ? "ar-KW" : "en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  return (
    <div>
      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {(["requested", "confirmed", "completed", "no_show"] as const).map((s) => {
          const count = appointments.filter((a) => a.status === s).length;
          return (
            <div key={s} className="bg-white rounded-xl border border-[#D6DEE3] p-4">
              <p className="text-xs text-[#4A5A66] uppercase tracking-wide mb-1">
                {t(`status.${s}`)}
              </p>
              <p className="text-2xl font-semibold text-[#1F2A33]">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors touch-target",
              filter === f
                ? "bg-[#567C99] text-white"
                : "bg-white border border-[#D6DEE3] text-[#4A5A66] hover:border-[#567C99]"
            )}
          >
            {f === "all" ? t("filters.all") : t(`status.${f}`)}
          </button>
        ))}
      </div>

      {/* Appointment list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[#4A5A66]">{t("noAppointments")}</div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((appt) => (
              <motion.div
                key={appt.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-xl border border-[#D6DEE3] p-4 sm:p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Main info */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-[#1F2A33]">{appt.patientName}</span>
                      <Badge variant={getStatusBadgeVariant(appt.status)}>
                        {t(`status.${appt.status}`)}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#4A5A66]">
                      <span className="flex items-center gap-1">
                        <IconStethoscope size={12} />
                        {appt.serviceName}
                      </span>
                      <span className="flex items-center gap-1">
                        <IconUser size={12} />
                        {appt.providerName}
                      </span>
                      <span className="flex items-center gap-1">
                        <IconCalendar size={12} />
                        {formatTime(appt.scheduledAt)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  {(appt.status === "requested" || appt.status === "confirmed") && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {appt.status === "requested" && (
                        <Button
                          size="sm"
                          loading={processingId === appt.id}
                          onClick={() => handleAction(appt.id, "confirmed")}
                          className="gap-1.5"
                        >
                          <IconCheck size={14} />
                          {t("actions.confirm")}
                        </Button>
                      )}
                      {appt.status === "confirmed" && (
                        <>
                          <Button
                            size="sm"
                            variant="secondary"
                            loading={processingId === appt.id}
                            onClick={() => handleAction(appt.id, "completed")}
                            className="gap-1.5"
                          >
                            <IconCheck size={14} />
                            {t("actions.complete")}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            loading={processingId === appt.id}
                            onClick={() => handleAction(appt.id, "no_show")}
                            className="gap-1.5"
                          >
                            <IconUserX size={14} />
                            {t("actions.noShow")}
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {/* resend reminder */}}
                        className="gap-1.5 text-[#567C99]"
                        title={t("actions.resendReminder")}
                      >
                        <IconBell size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        loading={processingId === appt.id}
                        onClick={() => handleAction(appt.id, "cancelled")}
                        className="gap-1.5 text-[#B34A4A]"
                        title={t("actions.cancel")}
                      >
                        <IconX size={14} />
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
