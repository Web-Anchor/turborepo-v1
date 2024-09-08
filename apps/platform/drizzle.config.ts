import type { Config } from 'drizzle-kit';

export default {
  dialect: 'sqlite', // "postgresql" | "mysql" | "sqlite"
  schema: './src/db/schema/*',
  out: './drizzle',
  driver: 'turso', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
} satisfies Config;
