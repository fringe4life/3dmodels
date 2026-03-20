import { mock } from "bun:test";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

mock.module("server-only", () => ({}));

GlobalRegistrator.register({
  url: "http://localhost:3000",
});

process.env.NODE_ENV = "test";
process.env.NEXT_PUBLIC_APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
