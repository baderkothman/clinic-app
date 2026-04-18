import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/sections/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import {
  IconMapPin,
  IconPhone,
  IconMail,
  IconClock,
  IconBrandWhatsapp,
  IconBrandInstagram,
} from "@tabler/icons-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    description: "Get in touch with Demo Clinic. We're open Saturday–Thursday, 8 AM–8 PM.",
  };
}

const HOURS = [
  { day: "Saturday",  dayAr: "السبت",    time: "8:00 AM – 8:00 PM" },
  { day: "Sunday",    dayAr: "الأحد",    time: "8:00 AM – 8:00 PM" },
  { day: "Monday",    dayAr: "الاثنين",  time: "8:00 AM – 8:00 PM" },
  { day: "Tuesday",   dayAr: "الثلاثاء", time: "8:00 AM – 8:00 PM" },
  { day: "Wednesday", dayAr: "الأربعاء", time: "8:00 AM – 8:00 PM" },
  { day: "Thursday",  dayAr: "الخميس",   time: "8:00 AM – 8:00 PM" },
  { day: "Friday",    dayAr: "الجمعة",   time: "Closed" },
];

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const isAr = locale === "ar";

  const contactDetails = [
    {
      icon: IconMapPin,
      label: t("address"),
      value: isAr
        ? "١٢٣ الحي الطبي، مدينة الكويت، الكويت"
        : "123 Medical District, Kuwait City, Kuwait",
      href: undefined,
    },
    {
      icon: IconPhone,
      label: t("phone"),
      value: "+965 1234 5678",
      href: "tel:+96512345678",
    },
    {
      icon: IconMail,
      label: t("email"),
      value: "info@clinic.kw",
      href: "mailto:info@clinic.kw",
    },
  ];

  return (
    <div>
      <PageHero
        label={isAr ? "تواصل معنا" : "Reach Out"}
        title={t("title")}
        description={
          isAr
            ? "يسعدنا الرد على استفساراتك. تواصل معنا عبر النموذج أو من خلال معلومات الاتصال أدناه."
            : "We're happy to answer your questions. Reach us through the form or using the contact details below."
        }
        accentColor="#C58A6A"
        gradient="linear-gradient(135deg, #FDF8F4 0%, #F7F5F0 50%, #F0F5F0 100%)"
      />

      <div className="py-14 md:py-20" style={{ background: "linear-gradient(180deg, #f8f6f1 0%, #f3f1ec 100%)" }}>
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">

            {/* ── Left: Info card ────────────────────── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Clinic photo */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/60 shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80"
                  alt="Demo Clinic reception"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A33]/50 to-transparent" />
                <div className="absolute bottom-4 start-4">
                  <span className="inline-flex items-center gap-1.5 bg-[#3C7A57]/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    {isAr ? "مفتوح الآن" : "Open Now"}
                  </span>
                </div>
              </div>

              {/* Contact details card */}
              <div className="space-y-5 rounded-2xl border border-[#2D3C49] bg-gradient-to-b from-[#1F2A33] to-[#19232D] p-6 shadow-xl">
                {contactDetails.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-[#7A9DB8]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#C58A6A] mb-1">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm text-[#D6DEE3]/90 hover:text-white transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-[#D6DEE3]/90 leading-relaxed">{value}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Divider */}
                <div className="border-t border-white/10 pt-5">
                  <div className="flex items-center gap-2 mb-4">
                    <IconClock size={14} className="text-[#7A9DB8]" />
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#C58A6A]">
                      {t("hours")}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    {HOURS.map(({ day, dayAr, time }) => (
                      <div key={day} className="flex items-center justify-between text-xs">
                        <span className={`text-[#D6DEE3]/70 ${time === "Closed" ? "opacity-50" : ""}`}>
                          {isAr ? dayAr : day}
                        </span>
                        <span
                          className={`font-medium ${
                            time === "Closed"
                              ? "text-[#B34A4A]/80"
                              : "text-[#7F9B88]"
                          }`}
                        >
                          {time === "Closed" ? (isAr ? "مغلق" : "Closed") : time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social */}
                <div className="flex items-center gap-3 pt-1">
                  <a
                    href="#"
                    aria-label="WhatsApp"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-[#25D366]/20 text-white text-xs font-medium transition-colors"
                  >
                    <IconBrandWhatsapp size={15} />
                    WhatsApp
                  </a>
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-[#E1306C]/20 text-white text-xs font-medium transition-colors"
                  >
                    <IconBrandInstagram size={15} />
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* ── Right: Form ──────────────────────────── */}
            <div className="lg:col-span-3">
              <div className="panel-sharp rounded-2xl p-6 sm:p-8">
                <h2 className="font-serif text-2xl font-semibold text-[#1F2A33] mb-1">
                  {t("sendMessage")}
                </h2>
                <p className="text-sm text-[#4A5A66] mb-7 leading-relaxed">
                  {isAr
                    ? "سنرد عليك في غضون يوم عمل واحد."
                    : "We'll respond within one business day."}
                </p>
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
