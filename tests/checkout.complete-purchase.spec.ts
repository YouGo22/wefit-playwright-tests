import { test, expect } from '@playwright/test';

test.describe('Checkout -> completar compra', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://wemovies-qa.s3-website.us-east-2.amazonaws.com');

    // Adiciona um filme (Homem Aranha) ao carrinho
    const movieCard = page.locator('.sc-dYwGCk:has-text("Homem Aranha")');
    await movieCard.locator('button:has-text("Adicionar ao carrinho")').click();

    // Abre o carrinho
    await page.locator('button:has-text("Meu Carrinho")').click();
  });

  test('deve completar a compra e mostrar confirmação', async ({ page }) => {
    // Garante que o botão de finalizar está visível
    const finalizeButton = page.locator('button:has-text("Finalizar pedido")');
    await expect(finalizeButton).toBeVisible();

    // Clica em "Finalizar pedido"
    await finalizeButton.click();

    // Aguarda a mensagem de sucesso
    const successMessage = page.locator('text=Compra realizada com sucesso!');
    await expect(successMessage).toBeVisible();

    // Valida que há botão "Voltar"
    const backButton = page.locator('button:has-text("Voltar")');
    await expect(backButton).toBeVisible();

    // Clica em "Voltar" para retornar à home
    await backButton.click();

    // Verifica se o carrinho está vazio
    await page.locator('button:has-text("Meu Carrinho")').click();
    const emptyMessage = page.locator('text=Parece que não há nada por aqui :(');
    await expect(emptyMessage).toBeVisible();
  });

});
