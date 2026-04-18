import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { BookingWizard } from "@/components/booking/BookingWizard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "booking" });
  return { title: t("title") };
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ serviceId?: string; providerId?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="py-10 md:py-14" style={{ background: "linear-gradient(180deg, #eef3f6 0%, #f2eee7 100%)" }}>
      <div className="section-container">
        <BookingWizard
          initialServiceId={params.serviceId}
          initialProviderId={params.providerId}
        />
      </div>
    </div>
  );
}
