import { test, expect } from '@playwright/test';

test.describe('Home -> Adicionar ao carrinho', () => {
  test('deve adicionar um filme ao carrinho e verificar subtotal', async ({ page }) => {
    await page.goto('http://wemovies-qa.s3-website.us-east-2.amazonaws.com', { timeout: 30000 });

    await page.waitForLoadState('networkidle');

    // Clica no botão do card "Homem Aranha"
    await page.locator('section div:has(h3:has-text("Homem Aranha")) button:has-text("Adicionar ao carrinho")').click();

    // Abre o carrinho
    await page.locator('button:has-text("Meu carrinho")').click();

    // Verifica se o item "Homem Aranha" está no carrinho
    await expect(page.locator('p:has-text("Homem Aranha")')).toBeVisible({ timeout: 10000 });

    // Verifica subtotal
    const subtotalText = await page.locator('p[variant="subHead"]').last().innerText();
    const subtotal = parseFloat(subtotalText.replace(/[^\d,]/g, '').replace(',', '.'));
    expect(subtotal).toBeCloseTo(29.9, 1);
  });
});



