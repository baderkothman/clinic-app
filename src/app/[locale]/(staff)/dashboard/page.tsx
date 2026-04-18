import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { AppointmentQueue } from "@/components/dashboard/AppointmentQueue";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dashboard" });
  return { title: t("title") };
}

export default async function DashboardPage() {
  const t = await getTranslations("dashboard");

  return (
    <div className="min-h-[100dvh] bg-[#F7F5F0]">
      {/* Staff nav bar */}
      <header className="bg-[#1F2A33] text-white px-6 py-4 flex items-center gap-3">
        <div className="w-7 h-7 rounded-md bg-[#567C99] flex items-center justify-center text-xs font-bold">
          C
        </div>
        <h1 className="font-serif font-semibold text-lg">{t("title")}</h1>
      </header>

      <main className="section-container py-8">
        <AppointmentQueue />
      </main>
    </div>
  );
}
