import dotenv from "dotenv";
dotenv.config();

import { expect, test } from "@playwright/test";

test("бекенд дає 200, час відповіді ≤ 1 секунда, і всі ключі data заповнені", async ({
  request,
}) => {
  const token = process.env.API_TOKEN;
  const url = process.env.API_URL;

  if (!token) throw new Error("API_TOKEN is not defined");
  if (!url) throw new Error("API_URL is not defined");

  const start = Date.now();

  const response = await request.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const duration = Date.now() - start;

  expect(response.status()).toBe(200);
  expect(duration).toBeLessThanOrEqual(3000);

  const body = await response.json();
  const data = body.data;

  expect(data).toBeTruthy();
  expect(typeof data).toBe("object");

  for (const [key, value] of Object.entries(data)) {
    expect(value).toBeTruthy();
    expect(`${value}`.trim()).not.toBe("");
  }
});
