import * as cheerio from "cheerio";
export default function (link, html) {
  let date_source_author;
  let dateParts;
  let $ = cheerio.load(html);
  switch (true) {
    ///////ctee  、綜合外電
    // https://www.ctee.com.tw/news/20240821700211-439901
    // https://www.ctee.com.tw/news/20240821701357-430704
    case link.includes("ctee"):
      date_source_author = `${$("li.publish-date time")
        .text()
        .replace(/\./g, "-")} / 工商時報 / ${$("span.name").text().trim()}`;

      break;
    //////

    ////// ePrice
    case link.includes("eprice"):
      date_source_author = `/ ePrice / ${$("a.nickname").attr("title")}`;

      break;
    //////

    ////// cool3c iframe
    case link.includes("cool3c"):
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
      date_source_author = `${$(
        '[href="' + link + '"] > time.entry-date.published'
      ).text()} / Mashdigi / ${$("div.entry-meta span.author.vcard")
        .text()
        .replace(" (Mash Yang)", "")}`;

      break;
    //////

    //////sogi FIX
    case link.includes("sogi"):
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

      break;
    //////

    //////buzzorange
    case link.includes("buzzorange"):
      date_source_author =
        $("time").text() +
        " / BuzzOrange / " +
        $(
          "span.elementor-icon-list-text.elementor-post-info__item.elementor-post-info__item--type-author"
        )
          .text()
          .trim();

      break;
    ///////

    //////money udn jquery fragments
    case link.includes("money.udn"):
      const match = ($("div.article-body__info span").text()).match(/記者(.*?)／/);
      const result = match ? match[1] : "";
      date_source_author =
        $("time.article-body__time").text().replace(/\//g, "-").slice(0, 10) +
        " / 經濟日報 / " +
        result;
     
      break;
    //////

    /////udn
    case link.includes("udn"):

      date_source_author =
        $("time.article-content__time")
          .text()
          .replace(/\//g, "-")
          .slice(0, 10) +
        " / 經濟日報 / " +
        $("a[href^='/news/reporter/']").text();
     
      break;
    ///////

    ////digitimes
    case link.includes("digitimes"):
      date_source_author =
        $("time").text() + " / 電子時報 / " + $("font").first().text();
      break;
    /////

    /////chinatimes bug time wrong
    // https://www.chinatimes.com/realtimenews/20240820002976-260412?chdtv
    case link.includes("chinatimes"):
      date_source_author =
        $("span.date").first().text() +
        " / " +
        $("div.source").text() +
        " / " +
        $("div.author").text();

     
      break;
    //////

 
    ///////kocpc
    case link.includes("kocpc"):
      date_source_author =
        $('a[href="' + link + '"]')
          .text()
          .replace(/(\d{4}) 年 (\d{2}) 月 (\d{2}) 日/, "$1-$2-$3") +
        " / 電腦王阿達 / " +
        $("div.jeg_meta_author a").text();
  
      break;
    //////

    /////3c ltn extra headline
    case link.includes("3c.ltn"):
      date_source_author =
        $("span.time").text().split(" ").slice(0)[0].replace(/\//g, "-") +
        " / 自由時報 / " +
        $("span.author").text().split("").slice(-3).join("");
      
      break;
    //////

    /////ec ltn author prob
    case link.includes("ec.ltn"):
      date_source_author =
        $("span.time").text().split(" ").slice(0)[0].replace(/\//g, "-") +
        " / 自由時報 / " +
        $("div.text p:nth-of-type(2)").text().split("／")[0];
     

      break;
    /////

    //////XFastest
    case link.includes("xfastest"):
      const formattedDate = $('span[title^="202"]')
        .attr("title")
        .replace(
          /(\d{4})-(\d{1,2})-(\d{1,2}) .*/,
          (match, year, month, day) => {
            // Pad month and day with leading zeros if necessary
            return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
          }
        );

      date_source_author =
        formattedDate +
        " / XFastest / " +
        $("a[href^='space-uid']").last().text();
    
      break;
    //////

    case link.includes("taisounds"):
      date_source_author = "" + $("a[href^='/more/reporternews']").text();
      break;

    //technews
    case link.includes("technews"):
     
      break;
    //////technbang bug!
    case link.includes("techbang"):
      dateParts =
        $("p.post-meta-info span:nth-of-type(3)")
          .text()
          .replace("發表於 ", "")
          .split("日")[0] + "日";
      // .match(/(\d{4}) 年 (\d{2}) 月 (\d{2}) 日/);
      date_source_author =
        `${dateParts[1]}-${dateParts[2]}-${dateParts[3]}` +
        "T客邦" +
        $("a.nickname").text();

      break;
  }
  return date_source_author
}
