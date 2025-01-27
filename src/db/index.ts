import { drizzle } from "drizzle-orm/postgres-js";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let db: PostgresJsDatabase<typeof schema> | null = null;

const setup = () => {
  if (db) return db;

  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

  const queryClient = postgres(process.env.DATABASE_URL);
  db = drizzle(queryClient, { schema });

  return db;
};

export default setup();
