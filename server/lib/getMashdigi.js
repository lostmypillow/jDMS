const puppeteer = require("puppeteer");
async function getMashdigi(link) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto(link, {
    waitUntil: "domcontentloaded",
  });

  const data = await page.evaluate((link) => {
    const fullHTML = document.querySelector("*").outerHTML;
    const title = document.querySelector("h1.entry-title").textContent;
    const entry = document.querySelector(
      "time.entry-date.published"
    ).textContent;
    const author = document
      .querySelector("a.url.fn.n")
      .textContent.replace(" (Mash Yang)", "");
    const date_source_author = entry + " / Mashdigi / " + author;

    const getContent = document
      .querySelector("div.bialty-container")
      .querySelectorAll("p");

    var allContent = [];
    getContent.forEach(function (a) {
      if (
        a.innerHTML.startsWith("<img") ||
        a.innerHTML.startsWith("▲") ||
        a.textContent == ""
      ) {
        return;
      } else {
        allContent.push(a.textContent.trim().replace("undefined", ""));
      }
    });

    return { title, date_source_author, allContent };
  });
  await browser.close();
  return data;
}

module.exports = getMashdigi;
