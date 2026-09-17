import "../../setup/test-globals";
import { Database } from "bun:sqlite";
import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { type ModelId, parseModelId } from "../../../src/db/brands";

const MIGRATION_PATH = join(
  import.meta.dir,
  "../../../src/db/migrations/20260916193419_models_uuidv7_pk/migration.sql",
);

const UUID_V7_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const statementsFromMigration = (sql: string): string[] =>
  sql
    .split("--> statement-breakpoint")
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

const applyLegacyCatalog = (sqlite: Database) => {
  sqlite.exec(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE user (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL
    );
    CREATE TABLE categories (
      display_name TEXT NOT NULL,
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE
    );
    CREATE TABLE models (
      category_slug TEXT NOT NULL,
      date_added INTEGER NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      likes INTEGER DEFAULT 0 NOT NULL,
      name TEXT NOT NULL UNIQUE,
      slug TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      FOREIGN KEY (category_slug) REFERENCES categories(slug),
      FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
    );
    CREATE TABLE likes (
      created_at INTEGER NOT NULL,
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      model_slug TEXT NOT NULL,
      user_id TEXT NOT NULL,
      FOREIGN KEY (model_slug) REFERENCES models(slug) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
      UNIQUE (user_id, model_slug)
    );
    INSERT INTO user (id, name) VALUES ('user-1', 'Pat');
    INSERT INTO categories (display_name, slug) VALUES ('Art', 'art');
    INSERT INTO models (
      category_slug, date_added, description, image, likes, name, slug, user_id
    ) VALUES (
      'art',
      1678889400000,
      'A dragon',
      '/img/models/1.avif',
      4,
      'Articulated Dragon',
      'articulated-dragon',
      'user-1'
    );
    INSERT INTO likes (created_at, model_slug, user_id) VALUES (
      1678889400000,
      'articulated-dragon',
      'user-1'
    );
  `);
};

describe("models uuidv7 pk migration", () => {
  it("copies models with uuidv7 ids and keeps likes by slug", () => {
    const sqlite = new Database(":memory:");
    applyLegacyCatalog(sqlite);

    const sql = readFileSync(MIGRATION_PATH, "utf8");
    for (const statement of statementsFromMigration(sql)) {
      sqlite.exec(statement);
    }

    const model = sqlite
      .query(
        "SELECT id, slug, likes, name FROM models WHERE slug = 'articulated-dragon'",
      )
      .get() as {
      id: ModelId;
      likes: number;
      name: string;
      slug: string;
    };

    expect(model.slug).toBe("articulated-dragon");
    expect(model.name).toBe("Articulated Dragon");
    expect(model.likes).toBe(4);
    expect(model.id).toMatch(UUID_V7_REGEX);
    expect(parseModelId(model.id)).toBe(model.id);

    const likeCount = sqlite
      .query(
        "SELECT COUNT(*) AS n FROM likes WHERE model_slug = 'articulated-dragon'",
      )
      .get() as { n: number };
    expect(likeCount.n).toBe(1);

    const tableNames = sqlite
      .query(
        "SELECT name FROM sqlite_master WHERE type = 'table' AND name IN ('models', 'likes')",
      )
      .all() as { name: string }[];
    expect(tableNames.map((row) => row.name).sort()).toEqual([
      "likes",
      "models",
    ]);
  });

  it("does not drop likes when models is empty", () => {
    const sqlite = new Database(":memory:");
    sqlite.exec(`
      CREATE TABLE models (
        category_slug TEXT NOT NULL,
        date_added INTEGER NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL,
        likes INTEGER DEFAULT 0 NOT NULL,
        name TEXT NOT NULL UNIQUE,
        slug TEXT PRIMARY KEY,
        user_id TEXT NOT NULL
      );
      CREATE TABLE likes (
        created_at INTEGER NOT NULL,
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        model_slug TEXT NOT NULL,
        user_id TEXT NOT NULL
      );
    `);

    const sql = readFileSync(MIGRATION_PATH, "utf8");
    for (const statement of statementsFromMigration(sql)) {
      sqlite.exec(statement);
    }

    const likesTable = sqlite
      .query(
        "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'likes'",
      )
      .get();
    expect(likesTable).toBeDefined();

    const idColumn = sqlite.query("PRAGMA table_info(models)").all() as {
      name: string;
      pk: number;
    }[];
    expect(idColumn.find((col) => col.name === "id")?.pk).toBe(1);
  });
});
