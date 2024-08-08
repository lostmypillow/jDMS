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
    //////

    //////sogi
    case link.includes("sogi"):
      title = $("h1.h1").text().trim();

      date_source_author = `${$("div.d-inline-block.mr-3")
        .first()
        .text()
        .replace("\n", "")
        .trim()
        .replace(/\//g, "-")} / 手機王 / ${$("div.d-inline-block.mr-3")
        .eq(1)
        .find("a")
        .eq(1)
        .text()
        .trim()}`;

      let textArray = [];

      $("div.editable.my-2")
        .html()
        .split(/<br\s*\/?>/i)
        .forEach((part) => {
          textArray.push($(part).text().trim());
        });

      textArray = textArray.filter(
        (text) =>
          text.length > 0 &&
          !text.startsWith("googletag") &&
          !text.startsWith("▲") &&
          !text.startsWith("訂閱手機王，快速掌握") &&
          !text.startsWith("現在，你也可以同步追蹤")
      );
      content = textArray;
      break;
    //////

    //////buzzorange
    case link.includes("buzzorange"):
      title = $("h1.elementor-heading-title.elementor-size-default").text();

      date_source_author =
        $("time").text() +
        " / BuzzOrange / " +
        $(
          "span.elementor-icon-list-text.elementor-post-info__item.elementor-post-info__item--type-author"
        )
          .text()
          .trim();
      let newarray = [];

      $("div.elementor-widget-container > p").each((index, element) => {
        if (
          !$(element).text().trim().startsWith("還在靠社群媒體") &&
          !$(element).text().trim().startsWith("訂閱即同意") &&
          !$(element).text().trim().startsWith("＊本文開放")
        ) {
          newarray.push($(element).text().trim());
        }
      });
      content = newarray;
      console.log(content);
      break;
    ///////

    //////money udn
    case link.includes("money.udn"):
      title = $("h1#story_art_title").text();
      const text = $("div.article-body__info span").text();
      const match = text.match(/記者(.*?)／/);
      const result = match ? match[1] : "";

      date_source_author =
        $("time.article-body__time").text().replace(/\//g, "-").slice(0, 10) +
        " / 經濟日報 / " +
        result;
      content = [];
      $("section.article-body__editor p").each((index, element) => {
        if (!$(element).text().trim() == "") {
          content.push($(element).text().trim());
        }
      });
      break;
    //////

    /////udn
    case link.includes("udn"):
      title = $("h1.article-content__title").text();
      const udntext = $("div.article-body__info span").text();
      const udnmatch = udntext.match(/記者(.*?)／/);
      const udnresult = udnmatch ? udnmatch[1] : "";

      date_source_author =
        $("time.article-content__time").text().replace(/\//g, "-").slice(0, 10) +
        " / 經濟日報 / " +
        $("a[href^='/news/reporter/']").text();
      content = [];
      $("section.article-content__editor  p").each((index, element) => {
        if (!$(element).text().trim() == "") {
          content.push($(element).text().trim());
        }
      });
      break;
///////



    case link.includes("chinatimes"):
      break;
    case link.includes("ctimes"):
      break;
    case link.includes("kocpc"):
      break;
    case link.includes("3c.ltn"):
      break;
    case link.includes("ec.ltn"):
      break;
    case link.includes("ltn"):
      break;
    case link.includes("xfastest"):
      break;
    case link.includes("cnyes"):
      break;
    case link.includes("moneydj"):
        break;
    case link.includes("investor"):
      break;

  }

  return { title, date_source_author, link, content };
}

module.exports = scrapeContent;
