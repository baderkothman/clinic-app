import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://democlinic.kw"),
  title: {
    template: "%s | Demo Clinic",
    default: "Demo Clinic — Trusted Healthcare in Kuwait",
  },
  description:
    "Book appointments online with certified specialists in General Medicine, Optometry, Dental Care, and Physiotherapy. Open Saturday–Thursday, 8 AM–8 PM. Kuwait City.",
  keywords: [
    "clinic Kuwait",
    "doctor appointment Kuwait",
    "general medicine",
    "optometry Kuwait",
    "dental care Kuwait",
    "physiotherapy Kuwait",
    "online booking",
    "عيادة الكويت",
    "حجز موعد طبي",
  ],
  authors: [{ name: "Demo Clinic" }],
  creator: "Demo Clinic",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    siteName: "Demo Clinic",
    title: "Demo Clinic — Trusted Healthcare in Kuwait",
    description:
      "Book appointments online with certified specialists. General Medicine, Optometry, Dental Care, Physiotherapy. Saturday–Thursday, 8 AM–8 PM.",
    locale: "en_US",
    alternateLocale: ["ar_KW"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Demo Clinic — Trusted Healthcare in Kuwait",
    description:
      "Book appointments online. General Medicine, Optometry, Dental Care, Physiotherapy. Open Sat–Thu 8 AM–8 PM.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
