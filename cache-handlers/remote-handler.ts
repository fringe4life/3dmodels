import { RedisClient } from "bun";
import { env } from "../src/utils/env";

interface CacheEntry {
  value: ReadableStream<Uint8Array>;
  tags: string[];
  stale: number;
  timestamp: number;
  expire: number;
  revalidate: number;
}
const client = new RedisClient(env.REDIS_API_KEY);
export const cacheHandler = {
  async get(cacheKey: string, _: string[]): Promise<CacheEntry | undefined> {
    // Retrieve from Redis
    const stored = await client.get(cacheKey);
    if (!stored) {
      return undefined;
    }

    // Deserialize the entry
    const data = JSON.parse(stored);

    // Reconstruct the ReadableStream from stored data
    return {
      value: new ReadableStream({
        start(controller) {
          controller.enqueue(Buffer.from(data.value, "base64"));
          controller.close();
        },
      }),
      tags: data.tags,
      stale: data.stale,
      timestamp: data.timestamp,
      expire: data.expire,
      revalidate: data.revalidate,
    };
  },

  async set(cacheKey: string, pendingEntry: Promise<CacheEntry>) {
    const entry = await pendingEntry;

    // Read the stream to get the data
    const reader = entry.value.getReader();
    const chunks: Uint8Array[] = [];
    let done = false;

    while (!done) {
      const { value, done: streamDone } = await reader.read();
      done = streamDone;
      if (value) {
        chunks.push(value);
      }
    }

    // Convert stream chunks to base64
    const buffer = Buffer.concat(chunks);
    const base64Value = buffer.toString("base64");

    // Serialize the entry with base64-encoded stream
    const serializedEntry = {
      value: base64Value,
      tags: entry.tags,
      stale: entry.stale,
      timestamp: entry.timestamp,
      expire: entry.expire,
      revalidate: entry.revalidate,
    };

    // Use correct Redis API: set(key, value, "EX", seconds)
    await client.set(
      cacheKey,
      JSON.stringify(serializedEntry),
      "EX",
      entry.expire,
    );
  },

  async refreshTags() {
    // No-op for basic Redis implementation
    // Could sync with external tag service if needed
  },

  async getExpiration(tags: string[]): Promise<number> {
    // Look up each tag's revalidation timestamp from Redis
    const tagTimestamps = await Promise.all(
      tags.map(async (tag) => {
        const tagKey = `tag:${tag}`;
        const timestamp = await client.get(tagKey);
        return timestamp ? Number.parseInt(timestamp, 10) : 0;
      }),
    );

    // Return the most recent revalidation timestamp
    return Math.max(...tagTimestamps);
  },

  async updateTags(tags: string[], durations: { expire?: number }) {
    // Update each tag's revalidation timestamp in Redis
    const timestamp = Date.now();
    const expire = durations.expire ?? 86_400; // Default to 1 day if not specified

    await Promise.all(
      tags.map(async (tag) => {
        const tagKey = `tag:${tag}`;
        // Store the current timestamp for the tag
        await client.set(tagKey, String(timestamp), "EX", expire);
      }),
    );
  },
};
