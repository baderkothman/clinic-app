import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { TeamSection } from "@/components/sections/TeamSection";
import { PageHero } from "@/components/ui/PageHero";
import {
  IconShieldCheck,
  IconAward,
  IconLanguage,
} from "@tabler/icons-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

const HIGHLIGHTS = [
  {
    icon: IconShieldCheck,
    en: { title: "Board-Certified", desc: "Every provider holds active board certification" },
    ar: { title: "معتمدون من الهيئات الطبية", desc: "كل مزود يحمل شهادة اعتماد سارية" },
  },
  {
    icon: IconAward,
    en: { title: "12+ Years Avg. Experience", desc: "Seasoned clinicians across all specialties" },
    ar: { title: "أكثر من ١٢ سنة خبرة متوسطة", desc: "أطباء متمرسون في جميع التخصصات" },
  },
  {
    icon: IconLanguage,
    en: { title: "Arabic & English", desc: "Fully bilingual care — no language barriers" },
    ar: { title: "عربي وإنجليزي", desc: "رعاية ثنائية اللغة — لا حواجز لغوية" },
  },
];

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team" });
  const isAr = locale === "ar";

  return (
    <div>
      <PageHero
        label={isAr ? "فريقنا الطبي" : "Expert Care"}
        title={t("title")}
        description={t("description")}
        accentColor="#7F9B88"
        gradient="linear-gradient(135deg, #EDF4EF 0%, #F0F5F0 50%, #F7F5F0 100%)"
      />

      {/* Why our team — 3 differentiators */}
      <div className="border-b border-[#D6DEE3]" style={{ background: "linear-gradient(180deg, #ffffff 0%, #fbfaf7 100%)" }}>
        <div className="section-container">
          <div className="grid grid-cols-1 divide-y divide-[#D6DEE3] sm:grid-cols-3 sm:divide-x sm:divide-y-0 rtl:sm:divide-x-reverse">
            {HIGHLIGHTS.map(({ icon: Icon, en, ar }) => {
              const item = isAr ? ar : en;
              return (
                <div key={en.title} className="flex items-start gap-4 px-4 py-6 sm:px-8">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDF4EF] ring-1 ring-[#D6DEE3]/40">
                    <Icon size={18} className="text-[#7F9B88]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1F2A33] text-sm leading-snug mb-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-[#4A5A66] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <TeamSection />
    </div>
  );
}
