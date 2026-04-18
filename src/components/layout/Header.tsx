"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import {
  IconMenu2,
  IconX,
  IconCalendarPlus,
  IconPhone,
  IconClock,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`,          label: t("home") },
    { href: `/${locale}/services`, label: t("services") },
    { href: `/${locale}/team`,     label: t("team") },
    { href: `/${locale}/contact`,  label: t("contact") },
  ];

  const otherLocale = locale === "en" ? "ar" : "en";
  const otherLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <>
      {/* ── Announcement bar ──────────────────── */}
      <div className="bg-[#162029] text-white text-xs shadow-[inset_0_-1px_0_rgb(255_255_255_/0.08)]">
        <div className="section-container flex h-9 items-center justify-between gap-4">
          <div className="flex items-center gap-4 overflow-hidden">
            <span className="hidden items-center gap-1.5 text-[#8FAFCA] sm:flex">
              <IconClock size={12} />
              <span>{locale === "ar" ? "السبت–الخميس، ٨ص–٨م" : "Sat–Thu, 8 AM – 8 PM"}</span>
            </span>
            <span className="hidden items-center gap-1.5 text-[#D6DEE3]/70 md:flex">
              <span className="w-px h-3 bg-white/20" />
              <IconPhone size={12} className="text-[#7A9DB8]" />
              <a href="tel:+96512345678" className="text-[#D6DEE3]/70 transition-colors hover:text-white">
                +965 1234 5678
              </a>
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* Active indicator */}
            <span className="flex items-center gap-1.5 text-[#7F9B88]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7F9B88] animate-pulse" />
              <span>{locale === "ar" ? "مفتوح الآن" : "Open Now"}</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Main header ───────────────────────── */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-[#C7D2DA] bg-white/96 shadow-[0_10px_30px_-22px_rgba(22,32,41,0.55)] backdrop-blur-lg"
            : "bg-[#F7F5F0]/88 backdrop-blur-sm"
        )}
      >
        <nav className="section-container flex h-[4.35rem] items-center justify-between">

          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative w-9 h-9 shrink-0">
              {/* Gradient logo mark */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#567C99] to-[#3D5E78] shadow-md ring-1 ring-white/30 transition-shadow group-hover:shadow-lg" />
              <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold font-serif">
                C
              </span>
            </div>
            <div>
              <span className="block font-serif text-lg font-semibold leading-none text-[#1F2A33] transition-colors group-hover:text-[#567C99]">
                {locale === "ar" ? "عيادة ديمو" : "Clinic"}
              </span>
              <span className="text-[#4A5A66] text-[9px] tracking-widest uppercase leading-none hidden sm:block">
                {locale === "ar" ? "رعاية موثوقة" : "Trusted Care"}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ href, label }) => {
              const isActive =
                pathname === href ||
                (href !== `/${locale}` && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative rounded-lg px-4 py-2 text-sm font-semibold transition-all",
                    isActive
                      ? "bg-[#EBF1F7] text-[#3D5E78]"
                      : "text-[#4A5A66] hover:bg-white/65 hover:text-[#1F2A33]"
                  )}
                >
                  {label}
                  {isActive && (
                    <span className="absolute bottom-1 start-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-[#567C99] rtl:translate-x-1/2" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Locale switcher */}
            <Link
              href={otherLocalePath}
              className="rounded-lg border border-[#D6DEE3] px-3 py-1.5 text-xs font-semibold tracking-wide text-[#4A5A66] transition-colors hover:border-[#567C99]/50 hover:text-[#567C99]"
            >
              {otherLocale === "ar" ? "عربي" : "EN"}
            </Link>
            <Link
              href={`/${locale}/book`}
              className="touch-target inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-b from-[#567C99] to-[#3D5E78] px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:from-[#3D5E78] hover:to-[#2c4558] hover:shadow-lg"
            >
              <IconCalendarPlus size={15} />
              {t("bookAppointment")}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="touch-target rounded-lg p-2 text-[#4A5A66] transition-colors hover:bg-[#567C99]/8 hover:text-[#1F2A33] md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="border-t border-[#D6DEE3] bg-white/98 backdrop-blur-md md:hidden">
            <div className="section-container py-4 flex flex-col gap-1">
              {navLinks.map(({ href, label }) => {
                const isActive =
                  pathname === href ||
                  (href !== `/${locale}` && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
                      isActive
                        ? "bg-[#EBF1F7] text-[#3D5E78]"
                        : "text-[#1F2A33] hover:bg-[#F7F5F0]"
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
              <div className="mt-3 pt-3 border-t border-[#D6DEE3] flex items-center gap-3">
                <Link
                  href={otherLocalePath}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg border border-[#D6DEE3] px-3 py-2 text-sm font-semibold text-[#4A5A66]"
                >
                  {otherLocale === "ar" ? "عربي" : "EN"}
                </Link>
                <Link
                  href={`/${locale}/book`}
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-b from-[#567C99] to-[#3D5E78] px-4 py-2.5 text-sm font-semibold text-white"
                >
                  <IconCalendarPlus size={15} />
                  {t("bookAppointment")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
