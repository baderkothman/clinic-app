import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#F7F5F0]">{children}</main>
      <Footer />
    </>
  );
}
