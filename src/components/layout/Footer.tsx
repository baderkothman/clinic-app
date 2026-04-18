import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconCalendarPlus,
  IconStethoscope,
  IconEye,
  IconDental,
  IconBone,
} from "@tabler/icons-react";

const HOURS = [
  { day: "Saturday – Thursday", dayAr: "السبت – الخميس", time: "8 AM – 8 PM",  open: true },
  { day: "Friday",               dayAr: "الجمعة",         time: "Closed",       open: false },
];

const SERVICES = [
  { icon: IconStethoscope, en: "General Medicine",  ar: "الطب العام",      id: "general" },
  { icon: IconEye,         en: "Optometry",         ar: "طب العيون",       id: "optometry" },
  { icon: IconDental,      en: "Dental Care",       ar: "طب الأسنان",      id: "dental" },
  { icon: IconBone,        en: "Physiotherapy",     ar: "العلاج الطبيعي",  id: "physio" },
];

export async function Footer() {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const locale = await getLocale();
  const isAr = locale === "ar";

  const navLinks = [
    { href: `/${locale}`,          label: tn("home") },
    { href: `/${locale}/services`, label: tn("services") },
    { href: `/${locale}/team`,     label: tn("team") },
    { href: `/${locale}/contact`,  label: tn("contact") },
  ];

  return (
    <footer className="mt-auto bg-[#1A2530] text-white">
      {/* Top gradient accent strip */}
      <div
        className="h-1.5 w-full"
        style={{ background: "linear-gradient(90deg, #567C99 0%, #7F9B88 35%, #C58A6A 65%, #3C7A57 100%)" }}
      />

      <div className="section-container py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* ── Brand ─────────────────────────────── */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              {/* Logo mark */}
              <div className="relative w-9 h-9 shrink-0">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#567C99] to-[#3d5e78] ring-1 ring-white/20" />
                <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold font-serif">
                  C
                </span>
              </div>
              <div>
                <span className="font-serif font-semibold text-lg leading-none block">
                  {isAr ? "عيادة ديمو" : "Clinic"}
                </span>
                <span className="text-[#7A9DB8] text-[10px] tracking-widest uppercase leading-none">
                  {isAr ? "رعاية طبية موثوقة" : "Trusted Healthcare"}
                </span>
              </div>
            </div>
            <p className="text-[#7A9DB8] text-sm leading-relaxed mb-5 max-w-xs">
              {t("tagline")}
            </p>
            {/* Social */}
            <div className="flex items-center gap-2.5">
              <a
                href="#"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/10 transition-all hover:-translate-y-0.5 hover:border-[#25D366]/50 hover:bg-[#25D366]/30"
              >
                <IconBrandWhatsapp size={16} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/10 transition-all hover:-translate-y-0.5 hover:border-[#E1306C]/50 hover:bg-[#E1306C]/30"
              >
                <IconBrandInstagram size={16} />
              </a>
            </div>
          </div>

          {/* ── Quick Links ───────────────────────── */}
          <div>
            <h3 className="font-semibold text-xs tracking-widest uppercase text-[#C58A6A] mb-5">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 text-sm text-[#D6DEE3]/72 transition-colors hover:text-white"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#567C99]/60 group-hover:bg-[#567C99] transition-colors shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services ──────────────────────────── */}
          <div>
            <h3 className="font-semibold text-xs tracking-widest uppercase text-[#C58A6A] mb-5">
              {isAr ? "خدماتنا" : "Our Services"}
            </h3>
            <ul className="space-y-2.5">
              {SERVICES.map(({ icon: Icon, en, ar, id }) => (
                <li key={id}>
                  <Link
                    href={`/${locale}/book?serviceId=${id}`}
                    className="group flex items-center gap-2 text-sm text-[#D6DEE3]/72 transition-colors hover:text-white"
                  >
                    <Icon size={13} className="text-[#567C99]/70 group-hover:text-[#7A9DB8] transition-colors shrink-0" />
                    {isAr ? ar : en}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Book CTA */}
            <Link
              href={`/${locale}/book`}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#567C99] px-4 py-2.5 text-xs font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#3D5E78] hover:shadow-lg"
            >
              <IconCalendarPlus size={14} />
              {tn("bookAppointment")}
            </Link>
          </div>

          {/* ── Contact + Hours ───────────────────── */}
          <div>
            <h3 className="font-semibold text-xs tracking-widest uppercase text-[#C58A6A] mb-5">
              {t("contact")}
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2.5 text-sm text-[#D6DEE3]/70">
                <IconMapPin size={14} className="mt-0.5 shrink-0 text-[#7A9DB8]" />
                <span className="leading-relaxed">
                  {isAr ? "١٢٣ الحي الطبي، مدينة الكويت" : "123 Medical District, Kuwait City"}
                </span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-[#D6DEE3]/70">
                <IconPhone size={14} className="shrink-0 text-[#7A9DB8]" />
                <a href="tel:+96512345678" className="hover:text-white transition-colors">
                  +965 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-[#D6DEE3]/70">
                <IconMail size={14} className="shrink-0 text-[#7A9DB8]" />
                <a href="mailto:info@clinic.kw" className="hover:text-white transition-colors">
                  info@clinic.kw
                </a>
              </li>
            </ul>

            {/* Hours */}
            <div className="space-y-2 rounded-xl border border-white/12 bg-white/6 px-4 py-3.5">
              {HOURS.map(({ day, dayAr, time, open }) => (
                <div key={day} className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-[#D6DEE3]/60">{isAr ? dayAr : day}</span>
                  <span className={open ? "text-[#7F9B88] font-semibold" : "text-[#B34A4A]/70"}>
                    {open ? time : (isAr ? "مغلق" : "Closed")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="section-container flex flex-col items-center justify-between gap-3 py-5 text-xs text-[#D6DEE3]/46 sm:flex-row">
          <span>© {new Date().getFullYear()} {isAr ? "عيادة ديمو." : "Demo Clinic."} {t("rights")}</span>
          <div className="flex items-center gap-5">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">
              {t("privacy")}
            </Link>
            <Link href={`/${locale}`} className="hover:text-white transition-colors">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
