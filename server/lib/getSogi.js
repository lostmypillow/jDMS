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
    const entry = document
      .querySelector("div.d-inline-block.mr-3")
      .textContent.replace("\n", "")
      .trim()
      .replace(/\//g, "-");
    const author = document
      .querySelectorAll("div.d-inline-block.mr-3")[1]
      .querySelectorAll("a")[1].textContent;
    const date_source_author = entry + " / 手機王 / " + author;

    const getContent = document.querySelector("div.editable.my-2").innerHTML;
    let para = getContent.split(/<br\s*\/?>/i);

    var allContent = [];
    para.forEach(function (a) {
      let ax = a.trim();
      if (
        ax.startsWith("<") ||
        ax.startsWith("▲") ||
        ax == "" ||
        ax.startsWith("資料來源")
      ) {
        return;
      } else {
        allContent.push(ax.trim().replace(/<[^>]*>/g, ""));
      }
    });
    // getContent.forEach (function (a) {
    //  console.log(a)
    // });

    return { title, date_source_author, allContent };
  });
  await browser.close();
  return data;
}

module.exports = getSogi;
