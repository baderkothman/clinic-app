"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { IconCalendarPlus, IconArrowRight } from "@tabler/icons-react";

const DEMO_PROVIDERS = [
  {
    id: "dr-sarah",
    name: "Dr. Sarah Al-Mansouri",
    nameAr: "د. سارة المنصوري",
    specialty: "General Medicine",
    specialtyAr: "الطب العام",
    bio: "Board-certified family physician with 12 years of experience in primary care and preventive medicine.",
    bioAr: "طبيبة عائلية معتمدة بخبرة 12 عاماً في الرعاية الأولية والطب الوقائي.",
    initials: "SA",
    color: "#567C99",
    lightColor: "#EBF1F7",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "dr-ahmed",
    name: "Dr. Ahmed Al-Rashidi",
    nameAr: "د. أحمد الراشدي",
    specialty: "Optometry",
    specialtyAr: "طب العيون",
    bio: "Fellowship-trained optometrist specializing in pediatric eye care and advanced contact lens fittings.",
    bioAr: "طبيب عيون متخصص في رعاية عيون الأطفال وتركيب العدسات اللاصقة المتقدمة.",
    initials: "AR",
    color: "#7F9B88",
    lightColor: "#EDF4EF",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "dr-lina",
    name: "Dr. Lina Al-Farsi",
    nameAr: "د. لينا الفارسي",
    specialty: "Dental Care",
    specialtyAr: "طب الأسنان",
    bio: "Cosmetic and restorative dentist with expertise in smile design and minimally invasive procedures.",
    bioAr: "طبيبة أسنان تجميلية وترميمية متخصصة في تصميم الابتسامة والإجراءات طفيفة التوغل.",
    initials: "LF",
    color: "#C58A6A",
    lightColor: "#FBF2EC",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "dr-khalid",
    name: "Dr. Khalid Al-Otaibi",
    nameAr: "د. خالد العتيبي",
    specialty: "Physiotherapy",
    specialtyAr: "العلاج الطبيعي",
    bio: "Sports physiotherapist with expertise in musculoskeletal rehabilitation and injury prevention.",
    bioAr: "معالج طبيعي رياضي متخصص في إعادة تأهيل الجهاز العضلي الهيكلي والوقاية من الإصابات.",
    initials: "KO",
    color: "#3C7A57",
    lightColor: "#EAF4EE",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as never } },
};

export function TeamSection() {
  const t = useTranslations("home.team");
  const tt = useTranslations("team");
  const locale = useLocale();

  return (
    <section className="py-20 md:py-24" style={{ background: "linear-gradient(180deg, #f8f6f1 0%, #f5f3ee 100%)" }}>
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
            href={`/${locale}/team`}
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#567C99] transition-colors hover:text-[#3D5E78]"
          >
            {locale === "ar" ? "تعرف على فريقنا" : "Meet our full team"}
            <IconArrowRight size={15} className={locale === "ar" ? "rotate-180" : ""} />
          </Link>
        </div>

        {/* Team grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {DEMO_PROVIDERS.map((provider) => {
            const name = locale === "ar" ? provider.nameAr : provider.name;
            const specialty = locale === "ar" ? provider.specialtyAr : provider.specialty;
            const bio = locale === "ar" ? provider.bioAr : provider.bio;

            return (
              <motion.div
                key={provider.id}
                variants={itemVariant}
                className="panel-sharp hover-lift group overflow-hidden"
              >
                {/* Photo area */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={provider.photo}
                    alt={`${provider.name} — ${provider.specialty}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A33]/42 via-transparent to-transparent" />

                  {/* Specialty badge on photo */}
                  <div
                    className="absolute bottom-3 start-3 rounded-full border border-white/30 px-2.5 py-1 text-xs font-semibold text-white shadow-sm"
                    style={{ backgroundColor: provider.color }}
                  >
                    {specialty}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  {/* Color accent line */}
                  <div
                    className="w-8 h-1 rounded-full mb-3"
                    style={{ backgroundColor: provider.color }}
                  />
                  <h3 className="mb-2 font-serif font-semibold leading-snug text-[#1F2A33]">
                    {name}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-[#4A5A66]">
                    {bio}
                  </p>
                  <Link
                    href={`/${locale}/book?providerId=${provider.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                    style={{ color: provider.color }}
                  >
                    <IconCalendarPlus size={14} />
                    {tt("bookWith", { name: name.split(" ")[0] + " " + name.split(" ")[1] })}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
