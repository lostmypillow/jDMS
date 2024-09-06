import puppeteer from "puppeteer";
let resultList1 = [];

function pushToList(link, html) {
  resultList1.push({
    url: link,
    html: html,
  });
}
function filterArray(arr) {
  var puppeteerLinks = arr.filter(
    (link) =>
      link.includes("ctee") ||
      link.includes("chinatimes") ||
      link.includes("udn")
  );
  const fetchLinks = arr.filter(
    (link) =>
      !link.includes("ctee") &&
      !link.includes("chinatimes") &&
      !link.includes("udn")
  );
}

// splits single array into two
// fetch first
// then puppeteer
//then push to list
//return list
async function processLinks(listy) {
  let resultList2;
  const { fetchLinks, puppeteerLinks } = filterArray(listy);
  
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
      pushToList(link, html);
    } else {
      pushToList(link, await getWithFetch(link));
    }
  }
  await browser.close();
  return resultList1;
}
