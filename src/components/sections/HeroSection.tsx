"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  IconCalendarPlus,
  IconUsers,
  IconStethoscope,
  IconClock,
  IconShieldCheck,
} from "@tabler/icons-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] as never },
  }),
};

export function HeroSection() {
  const t = useTranslations("home.hero");
  const trust = useTranslations("home.trust");
  const locale = useLocale();

  const trustItems = [
    { icon: IconShieldCheck, label: trust("established") },
    { icon: IconUsers, label: trust("patients") },
    { icon: IconStethoscope, label: trust("providers") },
    { icon: IconClock, label: trust("availability") },
  ];

  return (
    <section
      className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-24 lg:pt-20"
      style={{
        background:
          "linear-gradient(120deg, #E8EFF5 0%, #F0F5F0 38%, #F7F5F0 66%, #FCF8F4 100%)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, #567C9958 50%, transparent 100%)" }}
      />

      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #567C99 1.2px, transparent 0)",
          backgroundSize: "30px 30px",
        }}
      />

      <div
        aria-hidden
        className="absolute -top-44 -end-36 h-[540px] w-[540px] rounded-full opacity-35"
        style={{ background: "radial-gradient(circle, #567C9930 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-6 -start-20 h-[360px] w-[360px] rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, #7F9B8840 0%, transparent 70%)" }}
      />

      <div className="section-container relative">
        <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
          <div className="order-2 md:order-1">
            <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="mb-6">
              <span className="trust-pill">
                <IconShieldCheck size={14} />
                {t("tagline")}
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-serif mb-6 max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight text-[#1F2A33] md:text-5xl lg:text-[3.5rem]"
            >
              {t("headline")}
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mb-9 max-w-lg text-[1.05rem] leading-relaxed text-[#4A5A66]"
            >
              {t("subheadline")}
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-wrap gap-3.5"
            >
              <Link
                href={`/${locale}/book`}
                className="touch-target inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-[#567C99] to-[#3D5E78] px-6 py-3.5 font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:from-[#476E89] hover:to-[#2F4C61] hover:shadow-xl"
              >
                <IconCalendarPlus size={18} />
                {t("cta")}
              </Link>
              <Link
                href={`/${locale}/team`}
                className="touch-target inline-flex items-center gap-2 rounded-xl border border-[#D6DEE3] bg-white/92 px-6 py-3.5 font-semibold text-[#567C99] shadow-sm transition-all hover:border-[#567C99]/55 hover:bg-white hover:shadow-md"
              >
                {t("ctaSecondary")}
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] as never }}
            className="relative order-1 md:order-2"
          >
            <div
              className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#567C99]/20 via-[#7F9B88]/14 to-[#C58A6A]/12 blur-sm"
              aria-hidden
            />

            <div
              className="absolute -bottom-4 -end-4 h-36 w-36 rounded-2xl opacity-65"
              style={{ background: "linear-gradient(135deg, #7F9B88 0%, #3C7A57 100%)" }}
              aria-hidden
            />
            <div
              className="absolute -start-4 -top-4 h-24 w-24 rounded-xl opacity-55"
              style={{ background: "linear-gradient(135deg, #567C99 0%, #7A9DB8 100%)" }}
              aria-hidden
            />

            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] border border-white/70 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
                alt="Doctor consulting with a patient in a modern clinic"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="scale-[1.02] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A33]/24 via-transparent to-transparent" />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute bottom-4 start-4 flex items-center gap-3 rounded-xl border border-white/70 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#567C99]/15">
                  <IconShieldCheck size={18} className="text-[#567C99]" />
                </div>
                <div>
                  <p className="mb-0.5 text-xs leading-none text-[#4A5A66]">{trust("established")}</p>
                  <p className="text-sm font-semibold leading-none text-[#1F2A33]">{trust("patients")}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} className="panel-sharp hover-lift flex items-center gap-3 px-4 py-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#567C99]/10">
                <Icon size={18} className="text-[#567C99]" />
              </div>
              <span className="text-sm font-medium leading-snug text-[#1F2A33]">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
