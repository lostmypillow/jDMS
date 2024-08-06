const puppeteer = require("puppeteer");
async function getCool3C(link) {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto(link, {
    waitUntil: "domcontentloaded",
  });

  const data = await page.evaluate((link) => {
    const fullHTML = document.querySelector("*").outerHTML;
    console.log(fullHTML);
    const getAuthor = document.querySelector("div.author").querySelector("a");
    const getDate = document
      .querySelector("div.created.slacken")
      .querySelectorAll("span")[1];
    const getContent = document
      .querySelector("div.row.content")
      .querySelector("div")
      .querySelectorAll("p");

    var allContent = [];

    getContent.forEach(function (a) {
      if (a.innerHTML.startsWith("<img") || a.innerHTML.startsWith("▲")) {
        return;
      } else {
        allContent.push(a.textContent.trim().replace("undefined", ""));
      }
    });

    const title = document
      .querySelector("li.breadcrumb-item.active")
      .textContent.trim()
      .replace("\n", "");
    const date_source_author =
      getDate.textContent.split(" ")[0].replace(/\./g, "-") +
      " / Cool3c / " +
      getAuthor.textContent;

    return { title, date_source_author, link, allContent };
  });
  await browser.close();
  return data;
}

module.exports = getCool3C;
