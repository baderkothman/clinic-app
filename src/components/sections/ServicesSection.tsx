"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  IconStethoscope,
  IconEye,
  IconDental,
  IconBone,
  IconCalendarPlus,
  IconClock,
  IconArrowRight,
} from "@tabler/icons-react";

const DEMO_SERVICES = [
  {
    id: "general",
    icon: IconStethoscope,
    name: "General Medicine",
    nameAr: "الطب العام",
    description: "Comprehensive primary care for adults and children, preventive screenings, and chronic disease management.",
    descriptionAr: "رعاية أولية شاملة للبالغين والأطفال، وفحوصات وقائية، وإدارة الأمراض المزمنة.",
    duration: 30,
    color: "#567C99",
    lightColor: "#EBF1F7",
    gradient: "linear-gradient(135deg, #567C99 0%, #7A9DB8 100%)",
  },
  {
    id: "optometry",
    icon: IconEye,
    name: "Optometry",
    nameAr: "طب العيون",
    description: "Full eye exams, vision correction, contact lens fittings, and ocular health assessments.",
    descriptionAr: "فحوصات العين الكاملة، وتصحيح الرؤية، وتركيب العدسات اللاصقة، وتقييمات صحة العين.",
    duration: 45,
    color: "#7F9B88",
    lightColor: "#EDF4EF",
    gradient: "linear-gradient(135deg, #7F9B88 0%, #A8C4B0 100%)",
  },
  {
    id: "dental",
    icon: IconDental,
    name: "Dental Care",
    nameAr: "طب الأسنان",
    description: "Preventive, restorative, and cosmetic dental services for the whole family.",
    descriptionAr: "خدمات طب الأسنان الوقائية والترميمية والتجميلية للعائلة بأكملها.",
    duration: 60,
    color: "#C58A6A",
    lightColor: "#FBF2EC",
    gradient: "linear-gradient(135deg, #C58A6A 0%, #D9AB8E 100%)",
  },
  {
    id: "physio",
    icon: IconBone,
    name: "Physiotherapy",
    nameAr: "العلاج الطبيعي",
    description: "Rehabilitation programs, pain management, sports injury recovery, and mobility improvement.",
    descriptionAr: "برامج إعادة التأهيل، وإدارة الألم، والتعافي من إصابات الرياضة، وتحسين الحركة.",
    duration: 60,
    color: "#3C7A57",
    lightColor: "#EAF4EE",
    gradient: "linear-gradient(135deg, #3C7A57 0%, #5FA076 100%)",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as never } },
};

export function ServicesSection() {
  const t = useTranslations("home.services");
  const ts = useTranslations("services");
  const locale = useLocale();

  return (
    <section className="py-20 md:py-24" style={{ background: "linear-gradient(180deg, #f2f6f9 0%, #f3f0ea 100%)" }}>
      <div className="section-container">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-label mb-2">{t("label")}</p>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#1F2A33] md:text-4xl">
              {t("title")}
            </h2>
            <div className="section-title-line mt-3" aria-hidden />
          </div>
          <Link
            href={`/${locale}/services`}
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#567C99] transition-colors hover:text-[#3D5E78]"
          >
            {locale === "ar" ? "عرض جميع الخدمات" : "View all services"}
            <IconArrowRight size={15} className={locale === "ar" ? "rotate-180" : ""} />
          </Link>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative h-56 overflow-hidden rounded-2xl border border-white/65 shadow-lg sm:h-64">
            <Image
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80"
              alt="Clinic treatment room prepared for patients"
              fill
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1F2A33]/58 via-[#1F2A33]/26 to-transparent" />
            <div className="absolute bottom-4 start-4 rounded-xl border border-white/35 bg-white/15 px-4 py-3 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#CFE0EC]">{t("label")}</p>
              <p className="mt-1 text-lg font-semibold text-white">{t("title")}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="relative h-56 overflow-hidden rounded-2xl border border-white/65 shadow-lg sm:h-64 lg:h-[9.5rem]">
              <Image
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80"
                alt="Dental and optical diagnostic equipment in clinic"
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A33]/52 to-transparent" />
            </div>
            <div className="panel-sharp flex h-full flex-col justify-between p-5 lg:min-h-[9.5rem]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.11em] text-[#A46B4D]">{ts("title")}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#4A5A66]">
                  Rapid booking, trusted providers, and modern clinic workflows.
                </p>
              </div>
              <Link
                href={`/${locale}/book`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#567C99] transition-colors hover:text-[#3D5E78]"
              >
                <IconCalendarPlus size={15} />
                {ts("bookNow")}
              </Link>
            </div>
          </div>
        </div>

        {/* Service grid */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {DEMO_SERVICES.map((svc) => {
            const Icon = svc.icon;
            const name = locale === "ar" ? svc.nameAr : svc.name;
            const description = locale === "ar" ? svc.descriptionAr : svc.description;

            return (
              <motion.div
                key={svc.id}
                variants={itemVariant}
                className="panel-sharp hover-lift group relative overflow-hidden"
              >
                {/* Colored gradient header */}
                <div
                  className="relative flex h-28 items-center justify-center overflow-hidden"
                  style={{ background: svc.lightColor }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ background: svc.gradient }}
                  />
                  {/* Large faded icon as background */}
                  <Icon
                    size={72}
                    className="absolute opacity-[0.07] -bottom-2 -end-2"
                    style={{ color: svc.color }}
                    aria-hidden
                  />
                  {/* Colored icon box */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md relative z-10"
                    style={{ background: svc.gradient }}
                  >
                    <Icon size={26} className="text-white" />
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="mb-2 font-serif text-lg font-semibold text-[#1F2A33]">
                    {name}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-[#4A5A66]">
                    {description}
                  </p>

                  {/* Duration */}
                  <div
                    className="mb-5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{ backgroundColor: svc.lightColor, color: svc.color }}
                  >
                    <IconClock size={12} />
                    <span>{svc.duration} min</span>
                  </div>

                  {/* Book link */}
                  <div>
                    <Link
                      href={`/${locale}/book?serviceId=${svc.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
                      style={{ color: svc.color }}
                    >
                      <IconCalendarPlus size={15} />
                      {ts("bookNow")}
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
