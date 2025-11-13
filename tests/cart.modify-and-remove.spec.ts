import { test, expect } from '@playwright/test';

test.describe('Carrinho - adicionar e remover item', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://wemovies-qa.s3-website.us-east-2.amazonaws.com');

    // Adiciona o produto "Homem Aranha"
    const movieCard = page.locator('.sc-dYwGCk:has-text("Homem Aranha")');
    await movieCard.locator('button:has-text("Adicionar ao carrinho")').click();

    // Abre o carrinho
    await page.locator('button:has-text("Meu Carrinho")').click();
  });

  test('deve remover item do carrinho e exibir mensagem de vazio', async ({ page }) => {
    // Garante que o item está visível
    const cartItem = page.locator('.sc-gGKoUb:has-text("Homem Aranha")');
    await expect(cartItem).toBeVisible();

    // Clica no botão de lixeira
    await cartItem.locator('button.trash-btn').click();

    // Aguarda a mensagem de carrinho vazio
    const emptyMessage = page.locator('text=Parece que não há nada por aqui :(');
    await expect(emptyMessage).toBeVisible();

    // Confirma que o botão "Recarregar página" também aparece
    const reloadButton = page.locator('button:has-text("Recarregar página")');
    await expect(reloadButton).toBeVisible();
  });

});