export default defineEventHandler(async (event) => {
  await sequelize.sync({ force: true });
  console.log("sync all dbfff");
  const html = await getHTML(await (await readBody(event)).urls);
  const scraped = await scrapeContent(html);
  // const result = await scrapeContent(await (await readBody(event)).urls);
  // console.log(resultList)
  console.log("ready to create");
 for (const item of scraped) {
  await Content.create(item)
 }
  
  const result = await Content.findAll();
  return { result };
});
