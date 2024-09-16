import * as cheerio from "cheerio";

let resultList = [];

export default async function(url, html) {
  var title = getTitle(url, html);
  var date_source_author = getDSA(url, html);
  var content = [];
  var category = assignCategory(title);
  let $ = cheerio.load(html);
  let link = url
  switch (true) {
    ///////ctee  、綜合外電
    // https://www.ctee.com.tw/news/20240821700211-439901
    // https://www.ctee.com.tw/news/20240821701357-430704
    case link.includes("ctee"):
      $("article p").each((i, element) => {
        const text = $(element).text().trim();
        if (text) {
          content.push(text);
        }
      });
      break;
    //////

    ////// ePrice bug related links css comments
    case link.includes("eprice"):
 
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

     
      break;
    //////

    ////// mashdigi
    case link.includes("mashdigi"):

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
      date_source_author =
        $("time").text() + " / 電子時報 / " + $("font").first().text();
      content = [];
      break;
    /////

    /////chinatimes bug time wrong
    // https://www.chinatimes.com/realtimenews/20240820002976-260412?chdtv
    case link.includes("chinatimes"):
      content = [];
      $("div.article-body p").each((index, element) => {
        if (!$(element).text().trim() == "") {
          content.push($(element).text().trim());
        }
      });
      break;
    //////

    case link.includes("ctimes"):
  
      date_source_author = "";
      break;

    ///////kocpc
    case link.includes("kocpc"):
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
  content = content.join("\n\n");

  return { title, date_source_author, category, url, content };
}

// export default async function (listOfLinkObjects) {
//   for (const linkObject of listOfLinkObjects) {
//     const data = await scrapeWithCheerio(linkObject.url, linkObject.html);
//     resultList.push(data);
//   }
//   return resultList;
// }
