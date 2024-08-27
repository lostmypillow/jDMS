const fetch = require("node-fetch-commonjs");
const puppeteer = require("puppeteer");

async function usingNodeFetch(link) {
  return await (await fetch(link)).text();
}

async function usingPuppeteer(link) {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
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

async function getHTML(link) {
  return link.includes("ctee") || link.includes("chinatimes")
    ? await usingPuppeteer(link)
    : await usingNodeFetch(link);
}

module.exports = getHTML;
