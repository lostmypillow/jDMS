const getHTML = require("./getHTML");

const cheerio = require("cheerio");

async function scrapeContent(link) {
  var title = "";
  var date_source_author = "";
  var content;
  const $ = cheerio.load(await getHTML(link));

  switch (true) {
    ///////ctee
    case link.includes("ctee"):
      title = $("h1.main-title").text().trim();
      date_source_author = `${$("li.publish-date time")
        .text()
        .replace(/\./g, "-")} / 工商時報 / ${$("span.name").text().trim()}`;
      content = [];
      // content?.push($('blockquote p').text())
      $("article p").each((i, element) => {
        const text = $(element).text().trim();
        if (text) {
          content?.push(text);
        }
      });
      break;
    //////

    ////// ePrice
    case link.includes("eprice"):
      title = $("h1.title").text().trim();
      const entry = $("span.date")
        .text()
        .match(/\d{4}-\d{2}-\d{2}/)[0];
      const author = $("a.nickname").attr("title");
      date_source_author = `${entry} / ePrice / ${author}`;
      content = $("div.user-comment-block")
        .text()
        .split("來源：")[0]
        .split(/\n+/)
        .filter((item) => item.trim() !== "")
        .map((item) => item.trim());

      break;
    //////

    ////// cool3c
    case link.includes("cool3c"):
      const getContent = $("div.row.content div p");

      const allContent = [];

      getContent.each(function () {
        const text = $(this).html().trim();
        if (text.startsWith("<img") || text.startsWith("▲")) {
          return;
        } else {
          allContent.push(text.replace("undefined", "").trim());
        }
      });
      content = allContent;
      title = $("li.breadcrumb-item.active").text().trim().replace("\n", "");
      date_source_author = `${$("div.created.slacken span")
        .eq(1)
        .text()
        .trim()
        .split(" ")[0]
        .replace(/\./g, "-")} / Cool3c / ${$("div.author a").text().trim()}`;
      break;
    //////

    ////// mashdigi
    case link.includes("mashdigi"):
      title = $("h1.entry-title").text().trim();

      date_source_author = `${$(
        '[href="' + link + '"] > time.entry-date.published'
      ).text()} / Mashdigi / ${$("div.entry-meta span.author.vcard")
        .text()
        .replace(" (Mash Yang)", "")}`;
      //////

      content = [];

      $("div.bialty-container p").each(function () {
        const htmlContent = $(this).html().trim();
        const textContent = $(this).text().trim();

        if (
          htmlContent.includes("<img") ||
          textContent.startsWith("▲") ||
          textContent === ""
        ) {
          return;
        } else {
          content.push(textContent.replace("undefined", "").trim());
        }
      });

      break;

    case link.includes("sogi"):
      const title = $("h1.h1").text().trim();

      date_source_author = `${$("div.d-inline-block.mr-3").first().text().replace("\n", "").trim().replace(/\//g, "-")} / 手機王 / ${$("div.d-inline-block.mr-3").eq(1).find("a").eq(1).text().trim()}`;

const getContent = $("div.editable.my-2").html();
let para = getContent.split(/<br\s*\/?>/i);

const allContent = [];
para.forEach(function (a) {
    let ax = a.trim();
    if (
        ax.startsWith("<") ||
        ax.startsWith("▲") ||
        ax === "" ||
        ax.startsWith("資料來源")
    ) {
        return;
    } else {
        allContent.push(ax.replace(/<[^>]*>/g, "").trim());
    }
});
      break;
  }

  return { title, date_source_author, link, content };
}

module.exports = scrapeContent;
