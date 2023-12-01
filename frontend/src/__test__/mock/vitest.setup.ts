import { afterAll, afterEach, beforeAll } from "vitest";
import { getServer } from "./mockServer";
import "@testing-library/jest-dom/vitest";

beforeAll(() => getServer.listen({ onUnhandledRequest: "error" }));
afterEach(() => getServer.resetHandlers());
afterAll(() => getServer.close());
