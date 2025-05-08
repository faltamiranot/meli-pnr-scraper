
import { chromium } from 'playwright';
import fs from 'fs/promises';

const MELI_URL = 'https://envios.adminml.com/logistics/case-center/cases';

async function run() {
  const browser = await chromium.launch({ headless: false }); // Visible browser
  const context = await browser.newContext({
    acceptDownloads: true // Necesario para capturar el archivo CSV
  });
  const page = await context.newPage();

  console.log("🔐 Abriendo Mercado Libre para login manual...");
  await page.goto(MELI_URL);

  // Esperar a que el usuario complete login con OTP manualmente
  console.log("🕐 Esperando que completes el login y elijas el rango de fechas...");
  await page.waitForSelector('text=Descargar listado', { timeout: 300000 }); // esperar hasta 5 minutos

  // Hacer clic en "Descargar listado"
  const [ download ] = await Promise.all([
    page.waitForEvent('download'),
    page.click('text=Descargar listado')
  ]);

  const filePath = './pnr.csv';
  await download.saveAs(filePath);
  console.log(`✅ Archivo CSV descargado como: ${filePath}`);

  await browser.close();
}

run().catch(e => {
  console.error("❌ Error en el script:", e);
});
