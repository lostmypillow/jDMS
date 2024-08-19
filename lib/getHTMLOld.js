const puppeteer = require("puppeteer");
async function getHTMLOld(link) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto(link, {
    waitUntil: "domcontentloaded",
  });

  const html = await page.content();
  await browser.close();
  return html;
}



module.exports = getHTMLOld