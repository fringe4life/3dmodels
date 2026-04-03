import "server-only";

// biome-ignore lint/performance/noBarrelFile: this is a server-only module
export { ENV as env } from "varlock/env";
