import { PrismaClient, DayOfWeek } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import "dotenv/config";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding demo clinic data...");

  // ─── Clinic ───────────────────────────────
  const clinic = await prisma.clinic.upsert({
    where: { slug: "demo-clinic" },
    update: {},
    create: {
      name:      "Demo Clinic",
      nameAr:    "عيادة ديمو",
      slug:      "demo-clinic",
      phone:     "+965 1234 5678",
      email:     "info@clinic.kw",
      address:   "123 Medical District, Kuwait City, Kuwait",
      addressAr: "123 الحي الطبي، مدينة الكويت، الكويت",
      timezone:  "Asia/Kuwait",
    },
  });
  console.log("✓ Clinic:", clinic.name);

  // ─── Services ─────────────────────────────
  const serviceData = [
    { id: "svc-general",   name: "General Medicine",  nameAr: "الطب العام",        duration: 30, order: 1 },
    { id: "svc-optometry", name: "Optometry",          nameAr: "طب العيون",          duration: 45, order: 2 },
    { id: "svc-dental",    name: "Dental Care",        nameAr: "طب الأسنان",         duration: 60, order: 3 },
    { id: "svc-physio",    name: "Physiotherapy",      nameAr: "العلاج الطبيعي",     duration: 60, order: 4 },
  ];

  const services = await Promise.all(
    serviceData.map((s) =>
      prisma.service.upsert({
        where: { id: s.id },
        update: {},
        create: {
          id:              s.id,
          clinicId:        clinic.id,
          name:            s.name,
          nameAr:          s.nameAr,
          durationMinutes: s.duration,
          sortOrder:       s.order,
        },
      })
    )
  );
  console.log("✓ Services:", services.length);

  // ─── Providers ────────────────────────────
  const providerData = [
    {
      id: "prov-sarah",
      name: "Dr. Sarah Al-Mansouri", nameAr: "د. سارة المنصوري",
      specialty: "General Medicine",   specialtyAr: "الطب العام",
      email: "sarah@clinic.kw",
      bio: "Board-certified family physician with 12 years of experience.",
      bioAr: "طبيبة عائلية معتمدة بخبرة 12 عاماً.",
      serviceIds: ["svc-general"],
    },
    {
      id: "prov-ahmed",
      name: "Dr. Ahmed Al-Rashidi", nameAr: "د. أحمد الراشدي",
      specialty: "Optometry",         specialtyAr: "طب العيون",
      email: "ahmed@clinic.kw",
      bio: "Fellowship-trained optometrist specializing in pediatric eye care.",
      bioAr: "طبيب عيون متخصص في رعاية عيون الأطفال.",
      serviceIds: ["svc-optometry"],
    },
    {
      id: "prov-lina",
      name: "Dr. Lina Al-Farsi",    nameAr: "د. لينا الفارسي",
      specialty: "Dental Care",       specialtyAr: "طب الأسنان",
      email: "lina@clinic.kw",
      bio: "Cosmetic and restorative dentist with expertise in smile design.",
      bioAr: "طبيبة أسنان تجميلية وترميمية متخصصة في تصميم الابتسامة.",
      serviceIds: ["svc-dental"],
    },
    {
      id: "prov-khalid",
      name: "Dr. Khalid Al-Otaibi", nameAr: "د. خالد العتيبي",
      specialty: "Physiotherapy",     specialtyAr: "العلاج الطبيعي",
      email: "khalid@clinic.kw",
      bio: "Sports physiotherapist with expertise in musculoskeletal rehabilitation.",
      bioAr: "معالج طبيعي رياضي متخصص في إعادة تأهيل الجهاز العضلي الهيكلي.",
      serviceIds: ["svc-physio"],
    },
  ];

  const workDays: DayOfWeek[] = [
    DayOfWeek.saturday,
    DayOfWeek.sunday,
    DayOfWeek.monday,
    DayOfWeek.tuesday,
    DayOfWeek.wednesday,
    DayOfWeek.thursday,
  ];

  for (const p of providerData) {
    const provider = await prisma.provider.upsert({
      where:  { id: p.id },
      update: {},
      create: {
        id:          p.id,
        clinicId:    clinic.id,
        name:        p.name,
        nameAr:      p.nameAr,
        specialty:   p.specialty,
        specialtyAr: p.specialtyAr,
        email:       p.email,
        bio:         p.bio,
        bioAr:       p.bioAr,
      },
    });

    // Availability rules
    for (const day of workDays) {
      await prisma.providerAvailabilityRule.upsert({
        where: { id: `${provider.id}-${day}` },
        update: {},
        create: {
          id:            `${provider.id}-${day}`,
          providerId:    provider.id,
          dayOfWeek:     day,
          startTime:     "08:00",
          endTime:       "20:00",
          breakStartTime:"13:00",
          breakEndTime:  "14:00",
          effectiveFrom: new Date("2024-01-01"),
        },
      });
    }

    // Provider ↔ Service links
    for (const serviceId of p.serviceIds) {
      await prisma.providerService.upsert({
        where: { providerId_serviceId: { providerId: provider.id, serviceId } },
        update: {},
        create: { providerId: provider.id, serviceId },
      });
    }

    console.log("✓ Provider:", provider.name);
  }

  // ─── FAQ Intents ──────────────────────────
  const faqData = [
    {
      key: "booking_account",
      keywords: ["account", "register", "sign up"],
      answers: {
        en: "No account required! Book with your name and contact info. You'll receive a secure link to manage your appointment.",
        ar: "لا حاجة لإنشاء حساب! احجز باسمك ومعلومات التواصل. ستتلقى رابطاً آمناً لإدارة موعدك.",
      },
    },
    {
      key: "reminders",
      keywords: ["reminder", "notification", "sms", "whatsapp"],
      answers: {
        en: "You'll receive reminders 24 hours and 2 hours before your appointment via email and SMS.",
        ar: "ستتلقى تذكيرات قبل 24 ساعة وساعتين من موعدك عبر البريد الإلكتروني والرسائل القصيرة.",
      },
    },
    {
      key: "cancel_reschedule",
      keywords: ["cancel", "reschedule", "change"],
      answers: {
        en: "Use the secure link in your confirmation email to reschedule or cancel up to 2 hours before your appointment.",
        ar: "استخدم الرابط الآمن في بريد التأكيد لإعادة الجدولة أو الإلغاء حتى ساعتين قبل موعدك.",
      },
    },
    {
      key: "clinic_hours",
      keywords: ["hours", "open", "working", "time"],
      answers: {
        en: "We're open Saturday through Thursday, 8:00 AM to 8:00 PM. Closed on Fridays.",
        ar: "نحن مفتوحون من السبت إلى الخميس من 8 صباحاً حتى 8 مساءً. مغلق يوم الجمعة.",
      },
    },
  ];

  for (const faq of faqData) {
    const intent = await prisma.faqIntent.upsert({
      where: { clinicId_intentKey: { clinicId: clinic.id, intentKey: faq.key } },
      update: {},
      create: {
        clinicId:  clinic.id,
        intentKey: faq.key,
        keywords:  faq.keywords,
      },
    });

    for (const [locale, answer] of Object.entries(faq.answers)) {
      await prisma.faqAnswer.upsert({
        where: { intentId_locale: { intentId: intent.id, locale } },
        update: {},
        create: { intentId: intent.id, locale, answer },
      });
    }
  }
  console.log("✓ FAQ intents:", faqData.length);

  console.log("✅ Seed complete!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
