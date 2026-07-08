/** biome-ignore-all lint/suspicious/noConsole: seed file for dummy data */
import { sql } from "drizzle-orm";
import { EMPTY_LIST_LENGTH } from "@/constants";
import { db } from "@/db";
import { toCategorySlug } from "@/db/brands";
import { CATEGORIES } from "@/db/categories";
import { likes, type NewLike } from "@/db/schema/likes";
import { categories, models } from "@/db/schema/models";
import { modelsData } from "@/db/seed-data/models";

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    // Clear existing data (DO NOT clear auth tables - user, session, account, verification are manually managed)
    console.log("🗑️ Clearing existing data...");
    await db.delete(likes);
    await db.delete(models);
    await db.delete(categories);

    // Fetch all existing users
    console.log("👥 Fetching existing users...");
    const existingUsers = await db.query.user.findMany();
    if (existingUsers.length === EMPTY_LIST_LENGTH) {
      throw new Error(
        "No users found in database. Please create users manually before running seed.",
      );
    }
    console.log(`✅ Found ${existingUsers.length} users`);

    // Insert categories first
    console.log("📂 Seeding categories...");
    const categoriesResult = await db.insert(categories).values(
      CATEGORIES.map(({ slug, ...rest }) => ({
        slug: toCategorySlug(slug),
        ...rest,
      })),
    );
    console.log(`✅ Successfully seeded ${CATEGORIES.length} categories`);

    // Randomly assign each model to a user
    console.log("🎨 Seeding models with random user assignments...");
    const modelsWithUsers = modelsData.map(({ categorySlug, ...rest }) => {
      const randomUser =
        existingUsers[Math.floor(Math.random() * existingUsers.length)];
      return {
        ...rest,
        categorySlug: toCategorySlug(categorySlug),
        userId: randomUser.id,
      };
    });

    const modelsResult = await db.insert(models).values(modelsWithUsers);
    console.log(`✅ Successfully seeded ${modelsData.length} models`);

    // Create random likes (33% probability per user-model pair)
    console.log("❤️ Creating random likes...");
    const likesToInsert: NewLike[] = [];

    for (const userItem of existingUsers) {
      for (const model of modelsWithUsers) {
        // 30% chance to create a like
        if (Math.random() < 0.33) {
          likesToInsert.push({
            modelSlug: model.slug,
            userId: userItem.id,
          });
        }
      }
    }

    if (likesToInsert.length > EMPTY_LIST_LENGTH) {
      await db.insert(likes).values(likesToInsert);
      console.log(`✅ Successfully created ${likesToInsert.length} likes`);
    } else {
      console.log("ℹ️ No likes created (random chance)");
    }

    // Update every model's likes count in a single statement. A correlated
    // subquery avoids both an awaited loop and Promise.all fan-out, keeping
    // this to one round-trip (gentle on Neon free-tier connection limits) and
    // correctly sets 0 for models with no likes.
    console.log("🔢 Updating likes counts...");
    await db.update(models).set({
      likes: sql`(
        SELECT COUNT(*)::int
        FROM ${likes}
        WHERE ${likes.modelSlug} = ${models.slug}
      )`,
    });
    console.log("✅ Updated likes counts for all models");

    return { categoriesResult, modelsResult };
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run the seed function if this file is executed directly

seed()
  .then(() => {
    console.log("🎉 Seeding completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Seeding failed:", error);
    process.exit(1);
  });

export { seed };
