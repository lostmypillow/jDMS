import puppeteer from "puppeteer";
let resultList1 = [];

function pushToList(link, html) {
  resultList1.push({
    url: link,
    html: html,
  });
}


export default async function (links) {
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
      const response = await $fetch(link)
      pushToList(link, await response)
      // console.log(await response)
    }
  }
  await browser.close();
  return resultList1
}


