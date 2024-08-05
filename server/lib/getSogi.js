const puppeteer = require("puppeteer");
async function getSogi(link) {
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
    const title = document.querySelector("h1.h1").textContent;
    const entry = document.querySelector(
      "div.d-inline-block.mr-3"
    ).textContent.replace("\n", "").trim().replace(/\//g, "-");
    const author = document.querySelectorAll(
      "div.d-inline-block.mr-3"
    )[1].querySelectorAll("a")[1].textContent
    const date_source_author = entry + " / 手機王 / " + author;

    // const getContent = document
    //   .querySelector("div.bialty-container")
    //   .querySelectorAll("p");

    // var allContent = [];
    // getContent.forEach(function (a) {
    //   if (
    //     a.innerHTML.startsWith("<img") ||
    //     a.innerHTML.startsWith("▲") ||
    //     a.textContent == ""
    //   ) {
    //     return;
    //   } else {
    //     allContent.push(a.textContent.trim().replace("undefined", ""));
    //   }
    // });

    return { title, date_source_author };
  });
  await browser.close();
  return data;
}

module.exports = getSogi;
