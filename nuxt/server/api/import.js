export default defineEventHandler(async (event) => {
  await sequelize.sync({force: true});
  console.log("sync all dbfff");
  const html = await getHTML((await readBody(event)).urls);
  const scraped = await scrapeContent(html);
  // const result = await scrapeContent(await (await readBody(event)).urls);
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
