import { dmsScrape } from "dms-scrape";
export default defineEventHandler(async (event) => {
  return await dmsScrape("link", await (await readBody(event)).url);
});
