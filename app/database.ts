import Database from "better-sqlite3";

interface RequestRow {
  endpoint: string;
  count: number;
}

const db = new Database("stats.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS requests (
    endpoint TEXT PRIMARY KEY,
    count INTEGER DEFAULT 0
  )
`);

export function logRequest(endpoint: string): void {
  const stmt = db.prepare(`
    INSERT INTO requests (endpoint, count)
    VALUES (?, 1)
    ON CONFLICT(endpoint) DO UPDATE SET count = count + 1
  `);
  stmt.run(endpoint);
}

export function getStats(): {
  total: number;
  mostUsed: RequestRow | null;
} {
  const totalRow = db
    .prepare("SELECT SUM(count) as total FROM requests")
    .get() as { total: number | null } | undefined;
  const total = totalRow?.total ?? 0;

  const mostUsedRow = db
    .prepare("SELECT endpoint, count FROM requests ORDER BY count DESC LIMIT 1")
    .get() as RequestRow | undefined;

  return {
    total,
    mostUsed: mostUsedRow ?? null,
  };
}

export function resetStats(): void {
  db.exec("DELETE FROM requests");
}
