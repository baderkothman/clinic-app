import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import {
  Source_Serif_4,
  Noto_Sans,
  Noto_Naskh_Arabic,
} from "next/font/google";
import { routing } from "@/i18n/routing";
import "../globals.css";

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["300", "400", "600", "700"],
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.hero" });
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://democlinic.kw";

  return {
    title: locale === "ar" ? "عيادة ديمو — رعاية صحية موثوقة في الكويت" : "Demo Clinic — Trusted Healthcare in Kuwait",
    description: t("subheadline"),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
      },
    },
    openGraph: {
      locale: locale === "ar" ? "ar_KW" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_KW"],
      url: `${baseUrl}/${locale}`,
    },
  };
}

const clinicJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Demo Clinic",
  alternateName: "عيادة ديمو",
  description:
    "Trusted multi-specialty clinic offering General Medicine, Optometry, Dental Care, and Physiotherapy in Kuwait City.",
  url: "https://democlinic.kw",
  telephone: "+965 1234 5678",
  email: "info@clinic.kw",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Medical District",
    addressLocality: "Kuwait City",
    addressCountry: "KW",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 29.3759,
    longitude: 47.9774,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "08:00",
      closes: "20:00",
    },
  ],
  medicalSpecialty: ["GeneralPractice", "Optometry", "Dentistry", "PhysicalTherapy"],
  availableService: [
    { "@type": "MedicalTherapy", name: "General Medicine" },
    { "@type": "MedicalTherapy", name: "Optometry" },
    { "@type": "MedicalTherapy", name: "Dental Care" },
    { "@type": "MedicalTherapy", name: "Physiotherapy" },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      className={`${sourceSerif4.variable} ${notoSans.variable} ${notoNaskhArabic.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd) }}
        />
      </head>
      <body className="min-h-[100dvh] flex flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
