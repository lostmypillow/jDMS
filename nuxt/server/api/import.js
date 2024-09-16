import { chromium } from "playwright";
import { launch as chromeLauncher } from "chrome-launcher";

export default defineEventHandler(async (event) => {
  // Specify the path to the locally installed Chrome
  const chromePath = {
    win32: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe ",
    darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    linux: "/usr/bin/google-chrome",
  }[process.platform];
let html;
  async function launchRealChrome(link) {
    const browser = await chromium.launch({
      executablePath: chromePath, // Use the real Chrome browser
      headless: false, // Set to false for full browser mode
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-blink-features=AutomationControlled",
        "--user-data-dir=%userprofile%\\AppData\\Local\\Google\\Chrome\\User Data" // Optional for bot detection evasion
      ],
    });

    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 }, // Realistic viewport
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36", // Realistic user agent
    });

    const page = await context.newPage();

    // Navigate to the website
    await page.goto(link);

    // Wait for some time to simulate reading the page
    await page.waitForTimeout(Math.random() * 5000 + 2000);

    // Get the HTML content of the page
    const x = await page.content();

    // Close the browser
    await browser.close();
    return x;
  }
const url = await (await readBody(event)).url

if (await url.includes("ctee")) {
  html = await launchRealChrome(url).catch((err) => console.error(err));
} else  {
  html = await $fetch(url)
}
const processedContent = await scrapeContent(url, html)

  // await sequelize.drop()
  // await sequelize.sync({force: true});
  // console.log("sync all dbfff");
  const mockdata = [
    "https://www.ctee.com.tw/news/20240910700147-430804",
    "https://ec.ltn.com.tw/article/breakingnews/4795143?utm_campaign=STARK_business_DQN&utm_source=BUSINESS&utm_medium=hotnews_right",
    "https://mashdigi.com/iphone-16-pro-and-iphone-16-pro-max-add-desert-titanium-color-the-screen-becomes-larger-and-camera-buttons-are-also-added/",
    "https://mashdigi.com/iphone-16-has-a-stronger-shell-and-screen-and-it-also-adds-action-buttons-and-a-new-camera-button-to-the-body/",
    "https://www.sogi.com.tw/articles/realme_gt7_pro/6262863",
    "https://news.cnyes.com/news/id/5711693",
    "https://ec.ltn.com.tw/article/breakingnews/4794635",
    "https://mashdigi.com/xiaomi-group-president-lu-weibing-will-also-serve-as-president-of-mobile-phone-business-to-continue-to-promote-the-development-of-core-product-business/",
    "https://www.digitimes.com.tw/tech/dt/n/shwnws.asp?CnlID=9&id=0000701983_AF7LNNKD7NE8O14PF96VB&wpidx=5",
  ];
  // const html = await getHTML((await readBody(event)).urls);

  // const scraped = await scrapeContent(html);
  // const scraped = await scrapeContent(await (await readBody(event)).urls);
  // console.log(resultList)
  // console.log("ready to create");
  // for (const item of scraped) {
  //   try {
  //     const [content, created] = await Content.findOrCreate({
  //       where: { url: item.url },
  //       defaults: item,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const result = await Content.findAll();
  return { html: processedContent };
});
