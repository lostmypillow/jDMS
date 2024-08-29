import fetch from "node-fetch";
import puppeteer from "puppeteer";

async function usingNodeFetch(link) {
  return await (await fetch(link)).text();
}

async function usingPuppeteer(link) {
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

export async function getHTML(link) {
  return link.includes("ctee") || link.includes("chinatimes") || link.includes("udn")
    ? await usingPuppeteer(link)
    : await usingNodeFetch(link);
}

