export default defineEventHandler(async (event) => {
  await sequelize.drop()
  await sequelize.sync({force: true});
  console.log("sync all dbfff");
  const mockdata = ["https://www.ctee.com.tw/news/20240910700147-430804",
    "https://ec.ltn.com.tw/article/breakingnews/4795143?utm_campaign=STARK_business_DQN&utm_source=BUSINESS&utm_medium=hotnews_right",
    "https://mashdigi.com/iphone-16-pro-and-iphone-16-pro-max-add-desert-titanium-color-the-screen-becomes-larger-and-camera-buttons-are-also-added/",
    "https://mashdigi.com/iphone-16-has-a-stronger-shell-and-screen-and-it-also-adds-action-buttons-and-a-new-camera-button-to-the-body/",
   "https://www.sogi.com.tw/articles/realme_gt7_pro/6262863",
    "https://news.cnyes.com/news/id/5711693",
    "https://ec.ltn.com.tw/article/breakingnews/4794635",
    "https://mashdigi.com/xiaomi-group-president-lu-weibing-will-also-serve-as-president-of-mobile-phone-business-to-continue-to-promote-the-development-of-core-product-business/",
    "https://www.digitimes.com.tw/tech/dt/n/shwnws.asp?CnlID=9&id=0000701983_AF7LNNKD7NE8O14PF96VB&wpidx=5"
    
    ]
  const html = await getHTML((await readBody(event)).urls);
  // const html = await getHTML(mockdata);
  const scraped = await scrapeContent(html);
  // const scraped = await scrapeContent(await (await readBody(event)).urls);
  // console.log(resultList)
  console.log("ready to create");
  for (const item of scraped) {
    try {
      const [content, created] = await Content.findOrCreate({
        where: { url: item.url },
        defaults: item,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const result = await Content.findAll();
  return { result };
});
