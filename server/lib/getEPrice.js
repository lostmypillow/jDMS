const puppeteer = require("puppeteer");
async function getEPrice(link) {
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
    const title = document.querySelector("h1.title").textContent.trim();
    const entry = document.querySelector(
      "span.date"
    ).textContent.match(/\d{4}-\d{2}-\d{2}/)[0];
    const author = document
      .querySelector("a.nickname").getAttribute("title")
    const date_source_author = entry + " / ePrice / " + author;

    const getContent = document.querySelector("div.user-comment-block").innerHTML;

    // let para = getContent.split(/<br\s*\/?>/i);

    // var allContent = [];
    // para.forEach(function (a) {
    //   let ax = a?.trim();
    //   if (
    //     ax.startsWith("<") ||
    //     ax.startsWith("▲") ||
    //     ax == "" ||
    //     ax.startsWith("來源：") ||
    //     ax.startsWith("&nbsp") ||
    //     ax.startsWith("引用來源：") ||
    //     ax.startsWith("消息來源：")
    //   ) {
    //     return;
    //   } else {
    //     allContent.push(ax.trim().replace(/<[^>]*>/g, ""));
    //   }
    // });

    return { title, date_source_author, getContent };
  });
  await browser.close();
  return data;
}



module.exports = getEPrice