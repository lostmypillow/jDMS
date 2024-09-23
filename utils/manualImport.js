import { store } from "~/store";
import { dmsScrape } from "dms-scrape";
export default async function (link) {
  store.isImporting = true;
  try {
    if (store.data.find((x) => x.url == link) == undefined) {
      const response = await dmsScrape("link", link);
      response.error == undefined
        ? store.addItem(response)
        : store.addUnsupported(response);
    } else {
      store.errorMsg = "link already imported";
    }
  } catch (error) {
    store.errorMsg = error;
  }
  store.isImporting = false;
}
