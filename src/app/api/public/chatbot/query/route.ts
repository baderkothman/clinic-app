import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const querySchema = z.object({
  query: z.string().min(1).max(500),
  locale: z.string().optional().default("en"),
});

const FAQ_RULES = [
  {
    keywords:   ["account","register","login","sign up","signup"],
    keywordsAr: ["حساب","تسجيل","دخول"],
    en: "No account required! Book with your name and contact info. You'll receive a secure link to manage your appointment.",
    ar: "لا حاجة لإنشاء حساب! احجز باسمك ومعلومات التواصل. ستتلقى رابطاً آمناً لإدارة موعدك.",
  },
  {
    keywords:   ["reminder","notification","remind","sms","email","whatsapp"],
    keywordsAr: ["تذكير","إشعار","رسالة","واتساب","بريد"],
    en: "You'll receive reminders via email, SMS, and optionally WhatsApp — 24 hours and 2 hours before your appointment.",
    ar: "ستتلقى تذكيرات عبر البريد الإلكتروني والرسائل القصيرة وواتساب — قبل 24 ساعة وساعتين من موعدك.",
  },
  {
    keywords:   ["cancel","reschedule","change","modify"],
    keywordsAr: ["إلغاء","تغيير","إعادة","تعديل"],
    en: "Use the secure link in your confirmation email to reschedule or cancel up to 2 hours before your appointment.",
    ar: "استخدم الرابط الآمن في بريد التأكيد لإعادة الجدولة أو الإلغاء حتى ساعتين قبل موعدك.",
  },
  {
    keywords:   ["hours","open","working","time","schedule","when"],
    keywordsAr: ["ساعات","مفتوح","عمل","وقت","جدول","متى"],
    en: "We're open Saturday through Thursday, 8:00 AM to 8:00 PM. Closed on Fridays.",
    ar: "نحن مفتوحون من السبت إلى الخميس، من 8 صباحاً حتى 8 مساءً. مغلق يوم الجمعة.",
  },
  {
    keywords:   ["price","cost","fee","charge","how much"],
    keywordsAr: ["سعر","تكلفة","رسوم","كم"],
    en: "Service fees vary by specialty. Please call us at +965 1234 5678 for pricing details.",
    ar: "تختلف الرسوم حسب التخصص. يرجى الاتصال على +965 1234 5678 لتفاصيل الأسعار.",
  },
];

// POST /api/public/chatbot/query
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = querySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 422 });
  }

  const { query, locale } = parsed.data;
  const q = query.toLowerCase();
  const isAr = locale === "ar";

  // Rules-based intent matching
  for (const rule of FAQ_RULES) {
    const keywords = isAr ? rule.keywordsAr : rule.keywords;
    if (keywords.some((k) => q.includes(k))) {
      return NextResponse.json({
        answer: isAr ? rule.ar : rule.en,
        matched: true,
        intent: rule.keywords[0],
      });
    }
  }

  // Fallback
  const fallback = isAr
    ? "لست متأكداً من ذلك. يرجى الاتصال بنا على +965 1234 5678 أو حجز موعد عبر الإنترنت."
    : "I'm not sure about that. Please call us at +965 1234 5678 or book an appointment online.";

  return NextResponse.json({ answer: fallback, matched: false, intent: null });
}
