import "happy-dom/global";

process.env.NODE_ENV = "test";
process.env.NEXT_PUBLIC_APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
