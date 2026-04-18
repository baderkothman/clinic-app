import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const dispatchSchema = z.object({
  jobId: z.string(),
  channel: z.enum(["email", "sms", "whatsapp"]),
  recipient: z.object({
    name: z.string(),
    email: z.string().optional(),
    phone: z.string().optional(),
  }),
  templateKey: z.string(),
  templateData: z.record(z.string(), z.unknown()),
  idempotencyKey: z.string(),
});

// POST /api/internal/notifications/dispatch — Notification worker target
// In production: validate auth, dispatch to provider adapter, update job status
export async function POST(req: NextRequest) {
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

  const parsed = dispatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 422 });
  }

  const job = parsed.data;

  // Mock provider: simulate delivery
  const mockDelivery = {
    jobId: job.jobId,
    channel: job.channel,
    status: "sent",
    externalMessageId: `mock_${Date.now()}`,
    simulatedAt: new Date().toISOString(),
    recipient: job.recipient.name,
    template: job.templateKey,
    note: "Mock provider — delivery simulated for demo",
  };

  console.log(`[NOTIFICATION] ${job.channel.toUpperCase()} → ${job.recipient.name} | Template: ${job.templateKey}`);

  return NextResponse.json(mockDelivery, { status: 200 });
}
