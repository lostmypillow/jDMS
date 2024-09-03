import * as cheerio from "cheerio";
import { getHTML } from "./getHTML.mjs";

function appendCat(title) {
  switch (true) {
    case title.includes("高通"):
      return "Qualcomm相關新聞";

    case title.includes("聯發科"):
      return "MediaTek相關新聞";

    case title.includes("5G"):
      return "無線通訊市場";

    case title.includes("OPPO") || title.includes("PC"):
      return "智慧型手機/消費性電子產品";

    default:
      return "其他業界重要訊息";
  }
}
let resultList = [];

async function scrapeWithCheerio(url, html) {
  var title = "";
  var date_source_author = "";
  var content = [];
  let dateParts;
  var category = "";
  let link = url
  const $ = cheerio.load(html);

  switch (true) {
    ///////ctee  、綜合外電
    // https://www.ctee.com.tw/news/20240821700211-439901
    // https://www.ctee.com.tw/news/20240821701357-430704
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

    ////// ePrice bug related links css comments
    case link.includes("eprice"):
      title = $("h1.title").text().trim();
      // const entry = $("span.date")
      //   .text()
      //   .match(/\d{4}-\d{2}-\d{2}/)[0];
      const author = $("a.nickname").attr("title");
      date_source_author = `/ ePrice / ${author}`;
      content = $("div.user-comment-block")
        .text()
        .split("來源：")[0]
        .split(/\n+/)
        .filter((item) => item.trim() !== "")
        .map((item) => item.trim());

      break;
    //////

    ////// cool3c iframe
    case link.includes("cool3c"):
      const allContent = [];

      $("div.row.content div p").each(function () {
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

    //////sogi FIX
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
      // content = $("div.editable.my-2")
      //         .html()
      content = [];
      //       let textArray = [];

      //
      //         .split(/<br\s*\/?>/i)
      //         .forEach((part) => {
      //           textArray.push($(part).text().trim());
      //         });

      // textArray = textArray.filter(
      //   (text) =>
      //     text.length > 0 &&
      //     !text.startsWith("googletag") &&
      //     !text.startsWith("▲") &&
      //     !text.startsWith("訂閱手機王，快速掌握") &&
      //     !text.startsWith("現在，你也可以同步追蹤") &&
      //     !text.includes("訂閱追蹤") &&
      //     !text.includes("手機王網友")
      // );
      // content = textArray;
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
    
      break;
    ///////

    //////money udn jquery fragments
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
        $("time.article-content__time")
          .text()
          .replace(/\//g, "-")
          .slice(0, 10) +
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

    ////digitimes
    case link.includes("digitimes"):
      title = $("h1.news-title").text();
      date_source_author =
        $("time").text() + " / 電子時報 / " + $("font").first().text();
      content = [];
      break;
    /////

    /////chinatimes bug time wrong
    // https://www.chinatimes.com/realtimenews/20240820002976-260412?chdtv
    case link.includes("chinatimes"):
      title = $("h1.article-title").text();
      date_source_author =
        $("span.date").first().text() +
        " / " +
        $("div.source").text() +
        " / " +
        $("div.author").text();

      content = [];
      $("div.article-body p").each((index, element) => {
        if (!$(element).text().trim() == "") {
          content.push($(element).text().trim());
        }
      });
      break;
    //////

    case link.includes("ctimes"):
      title = "";
      date_source_author = "";
      break;

    ///////kocpc
    case link.includes("kocpc"):
      title = $("h1.jeg_post_title").text();
      date_source_author =
        $('a[href="' + link + '"]')
          .text()
          .replace(/(\d{4}) 年 (\d{2}) 月 (\d{2}) 日/, "$1-$2-$3") +
        " / 電腦王阿達 / " +
        $("div.jeg_meta_author a").text();
      //Zi_ad_ar_iR
      content = [];
      $("div.Zi_ad_ar_iR p").each((index, element) => {
        if (
          !$(element).text().trim() == "" &&
          !$(element).text().startsWith("<img")
        ) {
          content.push(
            $(element)
              .text()
              .trim()
              .replace(/<[^>]*>/g, "")
          );
        }
      });
      content = content.filter((item) => !item.startsWith("資料來源："));

      break;
    //////

    /////3c ltn extra headline
    case link.includes("3c.ltn"):
      title = $("div.whitecon.borderline.boxTitle.boxText h1").text();
      date_source_author =
        $("span.time").text().split(" ").slice(0)[0].replace(/\//g, "-") +
        " / 自由時報 / " +
        $("span.author").text().split("").slice(-3).join("");
      let incontent = [];
      content = [];
      $("div.text p").each((inex, element) => {
        if (
          !$(element).html().startsWith("<span") &&
          !$(element).html().startsWith("<strong")
        ) {
          incontent.push($(element).text().trim());
        }
      });
      content = incontent
        .filter((item) => item !== "")
        .filter((item) => item !== "請繼續往下閱讀...")
        .filter((item) => item !== "《你可能還想看》")
        .filter((item) => !item.includes("點我下載APP"))
        .filter((item) => !item.startsWith("("))
        .filter((item) => !item.startsWith("不用抽"))
        .filter((item) => item !== "");

      break;
    //////

    /////ec ltn author prob
    case link.includes("ec.ltn"):
      title = $("div.whitecon.boxTitle.boxText h1").text();
      date_source_author =
        $("span.time").text().split(" ").slice(0)[0].replace(/\//g, "-") +
        " / 自由時報 / " +
        $("div.text p:nth-of-type(2)").text().split("／")[0];
      const paragraphs = $("div.text p");
      const ttextArray = [];
      paragraphs.slice(2).each((index, element) => {
        if (!$(element).html().includes("span")) {
          ttextArray.push(
            $(element)
              .text()
              .trim()
              .replace(/〔.*?〕/g, "")
          );
        }
      });

      content = ttextArray
        .filter((item) => item !== "")
        .filter((item) => !item.startsWith("一手掌握經濟脈動"))
        .filter((item) => !item.includes("《你可能還想看》"))
        .filter((item) => !item.includes("請繼續往下閱讀..."))
        .filter((item) => !item.startsWith("("))
        .filter((item) => !item.startsWith("不用抽"))
        .filter((item) => item !== "");

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
      title = $("span#thread_subject").text();
      date_source_author =
        formattedDate +
        " / XFastest / " +
        $("a[href^='space-uid']").last().text();
      content = [];
      $('td[id^="post"]').each((index, element) => {
        // Get innerHTML of the selected <td> element
        const innerHTML = $(element).html();

        // Split the innerHTML by <br></br> tag
        content = innerHTML
          .split(/<\/?[^>]+>/)
          .map((item) => item.trim()) // Trim all elements
          .filter((item) => item !== "")
          .filter((item) => !item.includes("&nbsp;"))
          .filter((item) => item !== "上傳")
          .filter((item) => item !== "消息來源")
          .filter((item) => !item.includes("jpg"))
          .filter((item) => !item.startsWith("("))
          .filter((item) => item !== "下載附件")
          .filter((item) => item !== "保存到相冊");
      });

      break;
    //////

    case link.includes("cnyes"):
      break;

    case link.includes("moneydj"):
      break;

    case link.includes("investor"):
      break;
    case link.includes("taisounds"):
      title = $("div.news-box h1").text();
      date_source_author = "" + $("a[href^='/more/reporternews']").text();
      content = [];

      // $("div.news-box-text.border")
      //   .text()
      //   .split(/<br\s*\/?>/i)

      //forEach((element) => {
      //   element.trim()
      // })



      break;

    //ctwant
    //technews
    case link.includes("technews"):
      title = $("h1.entry-title").text();
      content = [];
      dateParts = $("span.body:nth-of-type(4)")
        .text()
        .match(/(\d{4}) 年 (\d{2}) 月 (\d{2}) 日/);
      date_source_author =
        `${dateParts[1]}-${dateParts[2]}-${dateParts[3]}` +
        " / 科技新報 / " +
        $("[rel=author]").text().replace(" ", "");
      $("div.indent p").each((i, element) => {
        content.push($(element).text().trim());
      });
      content = content
        .filter((item) => item.trim() !== "")
        .filter((item) => !item.startsWith("（"));

      break;
    //////technbang bug!
    case link.includes("techbang"):
      title = $("h1.post-title").text();

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
      content = [];
      break;
    //nextapple
    //cna
    //setn
    //bnext
    //saydigi
    //inside
    //lpcomment
    //techudnc
    //2cm
  }
  category = appendCat(title);
  content = content.join("<br><br>");

  return { title, date_source_author, category, url, content };
}


export async function scrapeContent(listOfLinkObjects) {
  for (const linkObject of listOfLinkObjects) {
    const data = await scrapeWithCheerio(linkObject.url, linkObject.html);
    resultList.push(data);
    console.log(data)
  }
  return resultList;
}