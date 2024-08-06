const puppeteer = require("puppeteer");
async function getCtee(link) {
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
    const title = document.querySelector("h1.main-title").textContent.trim();
    const entry = document.querySelector(
      "li.publish-date"
    ).querySelector("time").textContent.replace(/\./g, "-");
    const author = document
      .querySelector("span.name").textContent.trim()
    const date_source_author = entry + " / 工商時報 / " + author;

    const getContent = document
      .querySelector("article")
      .querySelectorAll("p");

    var allContent = [];
    getContent.forEach(function (a) {
      if (
        
        a.textContent == ""
      ) {
        return;
      } else {
        allContent.push(a.textContent);
      }
    
    });

    return { title, date_source_author, allContent };
  });
  await browser.close();
  return data;
}

module.exports = getCtee