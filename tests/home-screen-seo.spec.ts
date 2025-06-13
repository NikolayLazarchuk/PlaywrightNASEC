import { expect, test } from "@playwright/test";

test("Check home screen: title, description, h1, h2, h3", async ({ page }) => {
  await page.goto("https://www.nasec.fr/");

  await test.step("Home page title check", async () => {
    await expect(page).toHaveTitle(
      /^services de cybersécurité par des spécialistes qualifiés | nasec$/i
    );
  });

  await test.step("Home page description check", async () => {
    expect(
      await page.locator('meta[name="description"]').getAttribute("content")
    ).toBe(
      "Un spécialiste en cybersécurité disposant de plus de 10 ans d'expérience accompagne aujourd'hui les TPE/PME pour relever les défis du monde numérique, après avoir conseillé de grands comptes dans les secteurs du luxe, de la finance, du transport ou de l'énergie."
    );
  });

  await test.step("Home page has only 1 h1 and has text", async () => {
    expect(await page.locator("h1").count()).toBe(1);
    await expect(page.locator("h1")).toContainText(
      "La Cybersécurité"
    );
  });

  await test.step("Home page has h2 and contain text", async () => {
    await expect(page.locator("h2")).toContainText([
      "votre entreprise est protégée",
      "Quelques chiffres",
      "SERVICES",
      "SOFT SKILLS",
      "HARD SKILLS",
      "Contactez-moi",
      "À PROPOS",
    ]);
  });

  await test.step("Home page has h2 and contain text", async () => {
    await expect(page.locator("h3")).toContainText([
      "Diagnostic",
      "questionnaires SSI",
      "opérations de cybersécurité",
      "Simulation",
      "Audit/Pentest",
    ]);
  });
});
