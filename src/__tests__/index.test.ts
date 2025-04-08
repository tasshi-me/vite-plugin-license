import { describe, it, expect } from "vitest";

const skel = async () => true;

describe("skeleton fn", () => {
  it("must return true", async () => {
    await expect(skel()).resolves.toBeTruthy();
  });
});
