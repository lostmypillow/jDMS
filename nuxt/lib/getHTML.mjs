
import puppeteer from "puppeteer";
let resultList = [];

function pushToList(link, html) {
  resultList.push({
    url: link,
    html: html,
  });
}
export async function getHTML(links) {
  //links is an array
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  for (const link of links) {
    if (
      link.includes("ctee") ||
      link.includes("chinatimes") ||
      link.includes("udn")
    ) {
      const page = await browser.newPage();
      await page.goto(link, {
        waitUntil: "domcontentloaded",
      });
      const html = await page.content();
      pushToList(link, html)
    } else {
      pushToList(link, await (await $fetch(link)).text())
    }
  }
  await browser.close();
  return resultList
}