import { db } from "@/db";
import { categories, models } from "@/db/schema";
import { categoriesData } from "@/db/seed-data/categories";
import { modelsData } from "@/db/seed-data/models";

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    // Clear existing data to avoid foreign key constraint issues
    console.log("🗑️ Clearing existing data...");
    await db.delete(models);
    await db.delete(categories);

    // Insert categories first
    console.log("📂 Seeding categories...");
    const categoriesResult = await db.insert(categories).values(categoriesData);
    console.log(`✅ Successfully seeded ${categoriesData.length} categories`);

    // Insert models after categories
    console.log("🎨 Seeding models...");
    const modelsResult = await db.insert(models).values(modelsData);
    console.log(`✅ Successfully seeded ${modelsData.length} models`);

    return { categoriesResult, modelsResult };
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seed()
    .then(() => {
      console.log("🎉 Seeding completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Seeding failed:", error);
      process.exit(1);
    });
}

export { seed };
