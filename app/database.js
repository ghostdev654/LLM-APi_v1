import Database from "better-sqlite3";

const db = new Database("stats.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS requests (
    endpoint TEXT PRIMARY KEY,
    count INTEGER DEFAULT 0
  )
`);

export function logRequest(endpoint) {
  const stmt = db.prepare(`
    INSERT INTO requests (endpoint, count)
    VALUES (?, 1)
    ON CONFLICT(endpoint) DO UPDATE SET count = count + 1
  `);
  stmt.run(endpoint);
}

export function getStats() {
  const totalRow = db
    .prepare("SELECT SUM(count) as total FROM requests")
    .get();
  const total = totalRow?.total ?? 0;

  const mostUsedRow = db
    .prepare("SELECT endpoint, count FROM requests ORDER BY count DESC LIMIT 1")
    .get();

  return {
    total,
    mostUsed: mostUsedRow ?? null,
  };
}

export function resetStats() {
  db.exec("DELETE FROM requests");
}
