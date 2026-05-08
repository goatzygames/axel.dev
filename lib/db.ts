import { createClient, type Client } from "@libsql/client";

let client: Client | null = null;

export function getDb() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    return null;
  }

  if (!client) {
    client = createClient({
      url,
      authToken
    });
  }

  return client;
}
