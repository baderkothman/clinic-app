"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconMessageCircle,
  IconX,
  IconSend,
  IconRobot,
  IconUser,
} from "@tabler/icons-react";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
}

const FAQ_RULES: {
  keywords: string[];
  keywordsAr: string[];
  answerEn: string;
  answerAr: string;
}[] = [
  {
    keywords: ["account", "register", "login", "sign up"],
    keywordsAr: ["حساب", "تسجيل", "دخول"],
    answerEn: "No account required! Just book with your name and contact info. You'll receive a secure link to manage your appointment.",
    answerAr: "لا حاجة لإنشاء حساب! احجز فقط باسمك ومعلومات التواصل. ستتلقى رابطاً آمناً لإدارة موعدك.",
  },
  {
    keywords: ["reminder", "notification", "remind", "sms", "email", "whatsapp"],
    keywordsAr: ["تذكير", "إشعار", "رسالة", "واتساب", "بريد"],
    answerEn: "You'll receive automated reminders via email, SMS, and optionally WhatsApp — 24 hours and 2 hours before your appointment.",
    answerAr: "ستتلقى تذكيرات آلية عبر البريد الإلكتروني والرسائل القصيرة وواتساب اختياريًا — قبل 24 ساعة وساعتين من موعدك.",
  },
  {
    keywords: ["cancel", "reschedule", "change", "modify"],
    keywordsAr: ["إلغاء", "تغيير", "إعادة", "تعديل"],
    answerEn: "Yes! Use the secure link in your confirmation email to reschedule or cancel up to 2 hours before your appointment.",
    answerAr: "نعم! استخدم الرابط الآمن في بريد التأكيد لإعادة الجدولة أو الإلغاء حتى ساعتين قبل موعدك.",
  },
  {
    keywords: ["walk-in", "walkin", "without appointment", "drop in"],
    keywordsAr: ["بدون موعد", "مباشر", "حضور"],
    answerEn: "We accept walk-ins based on provider availability. However, booking online guarantees your preferred time slot.",
    answerAr: "نقبل الحضور المباشر حسب توفر المزود. لكن الحجز عبر الإنترنت يضمن وقتك المفضل.",
  },
  {
    keywords: ["hours", "open", "working", "time", "schedule"],
    keywordsAr: ["ساعات", "مفتوح", "عمل", "وقت", "جدول"],
    answerEn: "We're open Saturday through Thursday, 8:00 AM to 8:00 PM. We're closed on Fridays.",
    answerAr: "نحن مفتوحون من السبت إلى الخميس، من 8 صباحاً حتى 8 مساءً. مغلق يوم الجمعة.",
  },
  {
    keywords: ["language", "arabic", "english", "bilingual"],
    keywordsAr: ["لغة", "عربي", "إنجليزي", "ثنائي"],
    answerEn: "Our team serves patients in both Arabic and English. The booking platform is fully bilingual.",
    answerAr: "يخدم فريقنا المرضى باللغتين العربية والإنجليزية. منصة الحجز ثنائية اللغة بالكامل.",
  },
  {
    keywords: ["price", "cost", "fee", "charge", "how much"],
    keywordsAr: ["سعر", "تكلفة", "رسوم", "كم"],
    answerEn: "Service fees vary by specialty. Please call us at +965 1234 5678 or book online to learn about pricing.",
    answerAr: "تختلف رسوم الخدمة حسب التخصص. يرجى الاتصال بنا على +965 1234 5678 أو الحجز عبر الإنترنت للاستفسار عن الأسعار.",
  },
];

function matchIntent(query: string, locale: string): string | null {
  const q = query.toLowerCase();
  for (const rule of FAQ_RULES) {
    const keywords = locale === "ar" ? rule.keywordsAr : rule.keywords;
    if (keywords.some((k) => q.includes(k))) {
      return locale === "ar" ? rule.answerAr : rule.answerEn;
    }
  }
  return null;
}

export function ChatbotWidget() {
  const t = useTranslations("chatbot");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text: locale === "ar"
        ? "مرحباً! كيف يمكنني مساعدتك اليوم؟ اسألني عن المواعيد، ساعات العمل، الخدمات، أو أي شيء آخر."
        : "Hello! How can I help you today? Ask me about appointments, hours, services, or anything else.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function handleSend() {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    // Simulate processing delay
    await new Promise((r) => setTimeout(r, 700 + Math.random() * 500));

    const answer = matchIntent(text, locale);
    const botText = answer ?? t("fallback", { phone: "+965 1234 5678" });

    setMessages((prev) => [
      ...prev,
      { id: (Date.now() + 1).toString(), role: "bot", text: botText },
    ]);
    setTyping(false);
  }

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 end-6 z-50">
        <AnimatePresence>
          {!open && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={() => setOpen(true)}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-[#567C99] to-[#3D5E78] text-white shadow-xl ring-1 ring-white/30 transition-all hover:-translate-y-0.5 hover:from-[#476E89] hover:to-[#2F4C61]"
              aria-label={t("title")}
            >
              <IconMessageCircle size={24} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Chat panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 end-0 flex w-80 flex-col overflow-hidden rounded-2xl border border-[#C9D5DD] bg-white shadow-2xl sm:w-96"
              style={{ height: "440px" }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 bg-gradient-to-r from-[#476B85] to-[#567C99] px-4 py-3 text-white">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <IconRobot size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{t("title")}</p>
                  <p className="text-xs text-white/70">
                    {locale === "ar" ? "متاح الآن" : "Online now"}
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1 transition-colors hover:bg-white/20"
                  aria-label="Close chat"
                >
                  <IconX size={18} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 space-y-3 overflow-y-auto p-4" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f9f7f3 100%)" }}>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        msg.role === "bot"
                          ? "bg-[#567C99]/12"
                          : "bg-[#7F9B88]/12"
                      }`}
                    >
                      {msg.role === "bot" ? (
                        <IconRobot size={14} className="text-[#567C99]" />
                      ) : (
                        <IconUser size={14} className="text-[#7F9B88]" />
                      )}
                    </div>
                    <div
                      className={`max-w-[75%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "rounded-tr-sm bg-[#567C99] text-white"
                          : "rounded-tl-sm border border-[#E0E6EA] bg-white text-[#1F2A33]"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {typing && (
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#567C99]/10 flex items-center justify-center">
                      <IconRobot size={14} className="text-[#567C99]" />
                    </div>
                    <div className="flex items-center gap-1 rounded-xl rounded-tl-sm border border-[#E0E6EA] bg-white px-3 py-2">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-[#4A5A66] animate-bounce"
                          style={{ animationDelay: `${i * 150}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="border-t border-[#D6DEE3] bg-white p-3">
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex gap-2"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t("placeholder")}
                    className="input-base flex-1 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || typing}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#567C99] text-white transition-colors hover:bg-[#3D5E78] disabled:opacity-50"
                    aria-label={t("send")}
                  >
                    <IconSend size={15} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
