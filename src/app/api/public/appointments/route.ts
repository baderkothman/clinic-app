import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";

const bookingSchema = z.object({
  serviceId: z.string().min(1),
  providerId: z.string().optional().nullable(),
  scheduledAt: z.string().datetime(),
  patient: z.object({
    firstName: z.string().min(1),
    lastName:  z.string().min(1),
    email:     z.string().email(),
    phone:     z.string().min(7),
    notes:     z.string().optional().default(""),
  }),
  locale: z.string().optional().default("en"),
  idempotencyKey: z.string().optional(),
});

// POST /api/public/appointments — Book a new appointment
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 422 });
  }

  const data = parsed.data;

  // In production: check DB, create patient & appointment, schedule notifications
  // For MVP demo: return a mock confirmed appointment
  const appointmentId = `appt_${Date.now()}`;
  const secureToken = crypto.randomBytes(24).toString("hex");

  return NextResponse.json(
    {
      id: appointmentId,
      status: "requested",
      secureToken,
      scheduledAt: data.scheduledAt,
      serviceId: data.serviceId,
      providerId: data.providerId,
      patient: {
        firstName: data.patient.firstName,
        lastName:  data.patient.lastName,
        email:     data.patient.email,
        phone:     data.patient.phone,
      },
      message: "Appointment booked. Confirmation will be sent to your email and phone.",
    },
    { status: 201 }
  );
}

// PATCH /api/public/appointments — Reschedule or cancel via token
export async function PATCH(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const schema = z.object({
    action: z.enum(["reschedule", "cancel"]),
    scheduledAt: z.string().datetime().optional(),
  });

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 422 });
  }

  // In production: validate token, update appointment in DB
  return NextResponse.json({
    success: true,
    action: parsed.data.action,
    message: parsed.data.action === "cancel"
      ? "Appointment cancelled successfully."
      : "Appointment rescheduled successfully.",
  });
}
