import { NextRequest, NextResponse } from "next/server";

// GET /api/public/clinic-profile
// Returns clinic services, team, hours, contact — locale-aware
export async function GET(req: NextRequest) {
  const locale = req.nextUrl.searchParams.get("locale") ?? "en";
  const isAr = locale === "ar";

  return NextResponse.json({
    clinic: {
      id: "clinic-demo",
      name: isAr ? "عيادة ديمو" : "Demo Clinic",
      phone: "+965 1234 5678",
      email: "info@clinic.kw",
      address: isAr
        ? "123 الحي الطبي، مدينة الكويت"
        : "123 Medical District, Kuwait City, Kuwait",
      timezone: "Asia/Kuwait",
    },
    hours: [
      { day: isAr ? "السبت – الخميس" : "Saturday – Thursday", open: "08:00", close: "20:00" },
      { day: isAr ? "الجمعة" : "Friday", closed: true },
    ],
    services: [
      { id: "general", name: isAr ? "الطب العام" : "General Medicine", durationMinutes: 30 },
      { id: "optometry", name: isAr ? "طب العيون" : "Optometry", durationMinutes: 45 },
      { id: "dental", name: isAr ? "طب الأسنان" : "Dental Care", durationMinutes: 60 },
      { id: "physio", name: isAr ? "العلاج الطبيعي" : "Physiotherapy", durationMinutes: 60 },
    ],
    team: [
      { id: "dr-sarah", name: isAr ? "د. سارة المنصوري" : "Dr. Sarah Al-Mansouri", specialty: isAr ? "الطب العام" : "General Medicine" },
      { id: "dr-ahmed", name: isAr ? "د. أحمد الراشدي" : "Dr. Ahmed Al-Rashidi", specialty: isAr ? "طب العيون" : "Optometry" },
      { id: "dr-lina",  name: isAr ? "د. لينا الفارسي" : "Dr. Lina Al-Farsi",    specialty: isAr ? "طب الأسنان" : "Dental Care" },
      { id: "dr-khalid",name: isAr ? "د. خالد العتيبي" : "Dr. Khalid Al-Otaibi", specialty: isAr ? "العلاج الطبيعي" : "Physiotherapy" },
    ],
  });
}
