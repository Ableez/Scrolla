import type { Config } from "drizzle-kit";

export default {
  schema: "./storage/sqlite/schema.ts",
  out: "./storage/drizzle",
  dialect: "sqlite",
  driver: "expo", // <--- very important
} satisfies Config;
