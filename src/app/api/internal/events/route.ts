import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const eventSchema = z.object({
  type: z.enum([
    "appointment.created",
    "appointment.confirmed",
    "appointment.rescheduled",
    "appointment.cancelled",
    "appointment.completed",
    "appointment.no_show",
  ]),
  appointmentId: z.string(),
  clinicId: z.string(),
  payload: z.record(z.string(), z.unknown()).optional(),
  idempotencyKey: z.string().optional(),
});

// POST /api/internal/events — Domain event ingestion
// In production: validate internal auth, write to event store, trigger handlers
export async function POST(req: NextRequest) {
  // Internal auth check placeholder
  const authHeader = req.headers.get("x-internal-key");
  if (authHeader !== process.env.INTERNAL_API_KEY && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 422 });
  }

  const event = parsed.data;

  // In production: dispatch to appropriate handlers
  // - appointment.created  → schedule confirmation + reminder_24h + reminder_2h
  // - appointment.cancelled → cancel pending notification jobs
  // - appointment.rescheduled → reschedule notification jobs
  // - appointment.completed → schedule follow_up_24h
  console.log(`[EVENT] ${event.type} for appointment ${event.appointmentId}`);

  return NextResponse.json({ received: true, type: event.type }, { status: 200 });
}
