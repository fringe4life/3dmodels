import Database from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

export type TestDb = ReturnType<typeof drizzle>;

let _db: TestDb | null = null;

export function createTestDb(): TestDb {
  const sqlite = new Database(":memory:");
  const db = drizzle({ client: sqlite });
  _db = db;
  return db;
}

export function getTestDb(): TestDb {
  if (!_db) {
    throw new Error("Test DB not initialized. Call createTestDb() first.");
  }
  return _db;
}

// biome-ignore lint/suspicious/useAwait: test
export async function applySchema(db: TestDb) {
  // Define minimal tables required for model detail integration tests
  // Using raw SQL for speed and isolation
  db.run?.(`CREATE TABLE IF NOT EXISTS models (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    imageUrl TEXT,
    description TEXT,
    category TEXT
  );`);

  // likes and users tables can be added later if needed
}

// biome-ignore lint/suspicious/useAwait: test
export async function seedTestDb(db: TestDb) {
  db.run?.(`INSERT INTO models (id, name, slug, imageUrl, description, category) VALUES
    ('1', 'Test Model One', 'test-model-one', '/placeholder.png', 'First test model', 'props'),
    ('2', 'Test Model Two', 'test-model-two', '/placeholder.png', 'Second test model', 'props')
  ;`);
}

// biome-ignore lint/suspicious/useAwait: test
export async function resetDb(db: TestDb) {
  db.run?.("DROP TABLE IF EXISTS models;");
}
