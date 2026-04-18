import { PrismaNeon } from "@prisma/adapter-neon";

export function getAdapter() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local before running DB operations."
    );
  }
  return new PrismaNeon({ connectionString: process.env.DATABASE_URL });
}
