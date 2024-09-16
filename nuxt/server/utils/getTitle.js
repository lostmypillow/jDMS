import * as cheerio from 'cheerio'
export default function (link, html) {
  let title;
  let $ = cheerio.load(html);
  switch (true) {
    ///////ctee  、綜合外電
    // https://www.ctee.com.tw/news/20240821700211-439901
    // https://www.ctee.com.tw/news/20240821701357-430704
    case link.includes("ctee"):
      title = $("h1.main-title").text().trim();
      break;
    //////

    ////// ePrice bug related links css comments
    case link.includes("eprice"):
      title = $("h1.title").text().trim();

      break;
    //////

    ////// cool3c iframe
    case link.includes("cool3c"):
      title = $("li.breadcrumb-item.active").text().trim().replace("\n", "");
      break;
    //////

    ////// mashdigi
    case link.includes("mashdigi"):
      title = $("h1.entry-title").text().trim();
      break;
    //////

    //////sogi FIX
    case link.includes("sogi"):
      title = $("h1.h1").text().trim();
      break;
    //////

    //////buzzorange
    case link.includes("buzzorange"):
      title = $("h1.elementor-heading-title.elementor-size-default").text();

      break;
    ///////

    //////money udn jquery fragments
    case link.includes("money.udn"):
      title = $("h1#story_art_title").text();
      break;
    //////

    /////udn
    case link.includes("udn"):
      title = $("h1.article-content__title").text();

      break;
    ///////

    ////digitimes
    case link.includes("digitimes"):
      title = $("h1.news-title").text();

      break;
    /////

    /////chinatimes bug time wrong
    // https://www.chinatimes.com/realtimenews/20240820002976-260412?chdtv
    case link.includes("chinatimes"):
      title = $("h1.article-title").text();

      break;
    //////

    case link.includes("ctimes"):
      title = "";
      break;

    ///////kocpc
    case link.includes("kocpc"):
      title = $("h1.jeg_post_title").text();

      break;
    //////

    /////3c ltn extra headline
    case link.includes("3c.ltn"):
      title = $("div.whitecon.borderline.boxTitle.boxText h1").text();

      break;
    //////

    /////ec ltn author prob
    case link.includes("ec.ltn"):
      title = $("div.whitecon.boxTitle.boxText h1").text();

      break;
    /////

    //////XFastest
    case link.includes("xfastest"):
      title = $("span#thread_subject").text();

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
      break;

    //ctwant

    //technews
    case link.includes("technews"):
      title = $("h1.entry-title").text();
      break;
    //////technbang bug!
    case link.includes("techbang"):
      title = $("h1.post-title").text();
      break;
      default:
        title='';
        break;
      
  }
  return title
}
