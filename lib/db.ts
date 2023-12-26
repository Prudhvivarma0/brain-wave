import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
};

export const db = globalThis.prisma || new PrismaClient();

// For hot reload in development
// After development, just need 'export const db = new PrismaClient();' maybe...
if (process.env.NODE_ENV !== "production") globalThis.prisma = db