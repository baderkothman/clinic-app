"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { IconCalendarPlus, IconSearch, IconCheck, IconClock } from "@tabler/icons-react";

const steps = [
  { icon: IconSearch,      en: "Choose a service & provider", ar: "اختر خدمة ومزوداً" },
  { icon: IconCalendarPlus,en: "Pick a date and time",        ar: "اختر تاريخاً ووقتاً" },
  { icon: IconCheck,       en: "Receive instant confirmation", ar: "استلم تأكيداً فورياً" },
];

export function BookingCTASection() {
  const t = useTranslations("home.booking");
  const locale = useLocale();

  return (
    <section className="py-16 md:py-20" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f7f5f0 100%)" }}>
      <div className="section-container">
        <div
          className="relative overflow-hidden rounded-[1.75rem] border border-white/35 px-6 py-10 shadow-2xl sm:px-10 sm:py-14 md:px-14 md:py-16"
          style={{
            background: "linear-gradient(135deg, #2F4C61 0%, #486F8A 48%, #668AA3 100%)",
          }}
        >
          {/* Background pattern */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1.5px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />
          {/* Decorative blobs */}
          <div
            aria-hidden
            className="absolute -top-24 -end-20 h-72 w-72 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)" }}
          />
          <div
            aria-hidden
            className="absolute -bottom-20 -start-16 h-56 w-56 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(197,138,106,0.25) 0%, transparent 70%)" }}
          />

          <div className="relative grid items-center gap-8 md:grid-cols-2 md:gap-10">
            {/* Left */}
            <div>
              <p className="text-[#C58A6A] text-xs font-semibold tracking-widest uppercase mb-3 flex items-center gap-2">
                <IconClock size={14} />
                {t("label")}
              </p>
              <h2 className="mb-4 font-serif text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl md:text-4xl">
                {t("title")}
              </h2>
              <p className="mb-8 max-w-sm text-base leading-relaxed text-white/80">
                {t("description")}
              </p>
              <Link
                href={`/${locale}/book`}
                className="touch-target inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-[#567C99] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#F7F5F0] hover:shadow-xl"
              >
                <IconCalendarPlus size={18} />
                {locale === "ar" ? "احجز موعداً" : "Book an Appointment"}
              </Link>
            </div>

            {/* Right - Steps */}
            <div className="space-y-3.5">
              {steps.map(({ icon: Icon, en, ar }, i) => (
                <motion.div
                  key={en}
                  initial={{ opacity: 0, x: locale === "ar" ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.45 }}
                  className="flex items-center gap-4 rounded-xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-sm sm:px-5"
                >
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-white" />
                  </div>
                  <span className="text-white font-medium text-sm sm:text-base flex-1 leading-snug">
                    {locale === "ar" ? ar : en}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
