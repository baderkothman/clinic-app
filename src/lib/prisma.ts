import { PrismaClient } from "@/generated/prisma/client";

// Prisma v7 requires a driver adapter.
// At runtime, provide DATABASE_URL and the adapter of your choice.
// For Neon Postgres (production), install:
//   npm install @prisma/adapter-neon @neondatabase/serverless

function createPrismaClient() {
  // Lazy import so the app builds without the adapter package in dev
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const adapter = require("./prismaAdapter").getAdapter();
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
