/**
 * This file is part of the LLM-API project, solely developed and maintained by GhostDev.
 * https://github.com/ghostdev654/LLM-APi_v1
 *
 * All rights reserved.
 *
 * - You are NOT allowed to copy, rewrite, modify, redistribute, or reuse this file in any form.
 * - You are NOT allowed to claim this file or any part of this project as your own.
 * - This credit notice must NOT be removed or altered.
 * - This file may ONLY be used within the LLM-API v1 project.
 */

import Database from "better-sqlite3";

const db = new Database("stats.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS requests (
    endpoint TEXT PRIMARY KEY,
    count INTEGER DEFAULT 0
  )
`);

export function logRequest(endpoint: string) {
  const stmt = db.prepare(`
    INSERT INTO requests (endpoint, count)
    VALUES (?, 1)
    ON CONFLICT(endpoint) DO UPDATE SET count = count + 1
  `);
  stmt.run(endpoint);
}

export function getStats() {
  const totalRow = db.prepare("SELECT SUM(count) as total FROM requests").get();
  const total = totalRow?.total || 0;

  const mostUsedRow = db.prepare(
    "SELECT endpoint, count FROM requests ORDER BY count DESC LIMIT 1"
  ).get();

  return {
    total,
    mostUsed: mostUsedRow || null
  };
}

export function resetStats() {
  db.exec("DELETE FROM requests");
}