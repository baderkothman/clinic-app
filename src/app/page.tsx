import { redirect } from "next/navigation";

// Root route redirects to default locale
export default function RootPage() {
  redirect("/en");
}
