import { test, expect } from "@playwright/test";
import { places } from "../src/data/mockData";

test("Start navigation button on a random place opens its /navigate screen", async ({ page }) => {
  const place = places[Math.floor(Math.random() * places.length)];
  test.info().annotations.push({ type: "place", description: `${place.id} — ${place.name}` });

  await page.goto(`/places/${place.id}`);
  await expect(page.getByRole("heading", { level: 1, name: place.name })).toBeVisible();

  const startBtn = page.getByRole("link", { name: /start navigation/i });
  await expect(startBtn).toHaveAttribute("href", `/places/${place.id}/navigate`);

  await startBtn.click();
  await expect(page).toHaveURL(new RegExp(`/places/${place.id}/navigate$`));

  // First checkpoint badge + destination headline on the navigate screen
  await expect(page.getByText(/checkpoint 01/i)).toBeVisible();
  await expect(page.getByRole("heading", { level: 1, name: place.name })).toBeVisible();
});
