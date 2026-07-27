import initSqlJs from "sql.js";
import fs from "node:fs";
import path from "node:path";

const DB_PATH = path.resolve("stats.db");

let db;

async function getDb() {
  if (db) return db;

  const SQL = await initSqlJs();
  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS requests (
      endpoint TEXT PRIMARY KEY,
      count INTEGER DEFAULT 0
    )
  `);
  save();

  return db;
}

function save() {
  if (!db) return;
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

export async function logRequest(endpoint) {
  const d = await getDb();
  const existing = d.exec(
    `SELECT count FROM requests WHERE endpoint = ?`,
    [endpoint]
  );

  if (existing.length > 0 && existing[0].values.length > 0) {
    const currentCount = existing[0].values[0][0];
    d.run(
      `UPDATE requests SET count = ? WHERE endpoint = ?`,
      [currentCount + 1, endpoint]
    );
  } else {
    d.run(
      `INSERT INTO requests (endpoint, count) VALUES (?, 1)`,
      [endpoint]
    );
  }
  save();
}

export async function getStats() {
  const d = await getDb();
  const totalResult = d.exec(`SELECT SUM(count) as total FROM requests`);
  const total = totalResult.length > 0 && totalResult[0].values.length > 0
    ? totalResult[0].values[0][0]
    : 0;

  const mostUsedResult = d.exec(
    `SELECT endpoint, count FROM requests ORDER BY count DESC LIMIT 1`
  );
  const mostUsed = mostUsedResult.length > 0 && mostUsedResult[0].values.length > 0
    ? { endpoint: mostUsedResult[0].values[0][0], count: mostUsedResult[0].values[0][1] }
    : null;

  return { total, mostUsed };
}

export async function resetStats() {
  const d = await getDb();
  d.run(`DELETE FROM requests`);
  save();
}
