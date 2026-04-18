import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const querySchema = z.object({
  serviceId: z.string().optional(),
  providerId: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  locale: z.string().optional().default("en"),
});

// GET /api/public/availability?serviceId=&providerId=&date=YYYY-MM-DD&locale=en
export async function GET(req: NextRequest) {
  const params = Object.fromEntries(req.nextUrl.searchParams);
  const parsed = querySchema.safeParse(params);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid parameters", details: parsed.error.flatten() }, { status: 400 });
  }

  const { date, providerId } = parsed.data;
  const requestedDate = new Date(date);
  const dayOfWeek = requestedDate.getDay(); // 0=Sun, 5=Fri

  // Closed on Fridays
  if (dayOfWeek === 5) {
    return NextResponse.json({ date, slots: [], message: "Clinic closed on Fridays" });
  }

  // Generate 30-minute slots 08:00–20:00, mock-removing ~20%
  const slots: string[] = [];
  for (let h = 8; h < 20; h++) {
    for (const m of [0, 30]) {
      const key = `${date}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`;
      // Deterministic mock availability based on provider + hour + date
      const seed = (providerId?.length ?? 5) + h + requestedDate.getDate();
      if (Math.sin(seed * m + h) > -0.4) {
        slots.push(key);
      }
    }
  }

  return NextResponse.json({ date, slots });
}
