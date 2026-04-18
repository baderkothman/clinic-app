import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PageHero } from "@/components/ui/PageHero";
import {
  IconStethoscope,
  IconEye,
  IconDental,
  IconBone,
} from "@tabler/icons-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

const STATS = [
  { icon: IconStethoscope, value: "4",   label: "Specialties" },
  { icon: IconEye,         value: "30+", label: "Min sessions" },
  { icon: IconDental,      value: "Sat–Thu", label: "Open Days" },
  { icon: IconBone,        value: "8 AM–8 PM", label: "Hours" },
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const isAr = locale === "ar";

  return (
    <div>
      <PageHero
        label={isAr ? "ما نقدمه" : "What We Offer"}
        title={t("title")}
        description={t("description")}
        accentColor="#567C99"
        gradient="linear-gradient(135deg, #EBF1F7 0%, #F0F5F0 50%, #F7F5F0 100%)"
      />

      {/* Stats strip */}
      <div className="border-b border-[#D6DEE3]" style={{ background: "linear-gradient(180deg, #ffffff 0%, #fbfaf7 100%)" }}>
        <div className="section-container">
          <div className="grid grid-cols-2 divide-x divide-[#D6DEE3] sm:grid-cols-4 rtl:divide-x-reverse">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-5 sm:px-6">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EBF1F7] ring-1 ring-[#D6DEE3]/40">
                  <Icon size={16} className="text-[#567C99]" />
                </div>
                <div>
                  <p className="font-serif font-semibold text-[#1F2A33] leading-none text-lg">
                    {value}
                  </p>
                  <p className="text-xs text-[#4A5A66] mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ServicesSection />
    </div>
  );
}
