"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown, IconQuestionMark } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    q: "Do I need to create an account to book?",
    a: "No account required. Simply enter your name, email, and phone number during booking. You'll receive a secure link to manage your appointment.",
    qAr: "هل أحتاج إلى إنشاء حساب للحجز؟",
    aAr: "لا حاجة لإنشاء حساب. ما عليك سوى إدخال اسمك وبريدك الإلكتروني ورقم هاتفك أثناء الحجز. ستتلقى رابطاً آمناً لإدارة موعدك.",
  },
  {
    q: "How will I receive appointment reminders?",
    a: "You'll receive automated reminders via email and SMS — 24 hours and 2 hours before your appointment. WhatsApp reminders are also available.",
    qAr: "كيف سأتلقى تذكيرات الموعد؟",
    aAr: "ستتلقى تذكيرات آلية عبر البريد الإلكتروني والرسائل القصيرة — قبل 24 ساعة وساعتين من موعدك. تذكيرات واتساب متاحة أيضاً.",
  },
  {
    q: "Can I reschedule or cancel my appointment?",
    a: "Yes, use the secure link sent with your confirmation email to reschedule or cancel up to 2 hours before your appointment.",
    qAr: "هل يمكنني إعادة جدولة أو إلغاء موعدي؟",
    aAr: "نعم، استخدم الرابط الآمن المرسل مع بريد التأكيد لإعادة الجدولة أو الإلغاء حتى ساعتين قبل موعدك.",
  },
  {
    q: "Do you accept walk-in patients?",
    a: "We do accept walk-ins subject to provider availability. However, we recommend booking online to secure your preferred time slot.",
    qAr: "هل تقبلون المرضى دون موعد مسبق؟",
    aAr: "نعم، نقبل الحضور المباشر وفقاً لتوفر المزود. ومع ذلك، نوصي بالحجز عبر الإنترنت لتأمين وقتك المفضل.",
  },
  {
    q: "What languages are services available in?",
    a: "Our team provides services in both Arabic and English. The booking platform is fully bilingual.",
    qAr: "بأي لغات تقدمون الخدمات؟",
    aAr: "يقدم فريقنا الخدمات باللغتين العربية والإنجليزية. منصة الحجز ثنائية اللغة بالكامل.",
  },
];

export function FaqSection() {
  const t = useTranslations("home.faq");
  const locale = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-24" style={{ background: "linear-gradient(180deg, #f3f0ea 0%, #eee9e2 100%)" }}>
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-10 text-center">
            <p className="section-label mb-2">{t("label")}</p>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#1F2A33] md:text-4xl">
              {t("title")}
            </h2>
            <div className="mx-auto mt-3 section-title-line" aria-hidden />
          </div>

          <div className="relative mb-6 h-48 overflow-hidden rounded-2xl border border-white/65 shadow-lg sm:h-56">
            <Image
              src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1400&q=80"
              alt="Friendly clinic reception area ready to support patients"
              fill
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1F2A33]/55 via-[#1F2A33]/20 to-transparent" />
            <div className="absolute bottom-4 start-4 rounded-lg border border-white/30 bg-white/15 px-3 py-2 backdrop-blur-sm">
              <p className="text-xs font-semibold text-white">
                Patient support and quick answers.
              </p>
            </div>
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => {
              const question = locale === "ar" ? item.qAr : item.q;
              const answer = locale === "ar" ? item.aAr : item.a;
              const isOpen = openIndex === i;

              return (
                <div
                  key={i}
                  className={cn(
                    "panel-sharp rounded-xl transition-all duration-200",
                    isOpen
                      ? "border-[#567C99]/30 shadow-md"
                      : "border-[#D6DEE3] hover:border-[#567C99]/20"
                  )}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="touch-target flex w-full items-center justify-between gap-4 px-4 py-4 text-start sm:px-5"
                    aria-expanded={isOpen}
                  >
                    {/* Question number + text */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition-colors",
                          isOpen
                            ? "bg-[#567C99] text-white"
                            : "bg-[#EBF1F7] text-[#567C99]"
                        )}
                      >
                        {isOpen ? <IconQuestionMark size={13} /> : i + 1}
                      </div>
                      <span className="text-sm font-semibold leading-snug text-[#1F2A33]">
                        {question}
                      </span>
                    </div>
                    <IconChevronDown
                      size={18}
                      className={cn(
                        "shrink-0 text-[#567C99] transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 sm:px-5 pb-5 text-sm text-[#4A5A66] leading-relaxed ps-14 sm:ps-[3.75rem]">
                          {answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
