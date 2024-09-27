import { store } from "~/stores/store";
import { dmsScrape } from "dms-scrape";
export default async function (link) {
  store.isImporting = true;
  console.log(1)
  try {
    if (
      hasMatchingURLs(store.data, [link]) ||
      hasMatchingURLs(store.unsupportedLinks, [link])
    ) {
      console.log(2)
      store.errorMsg = "link already imported";
    } else {
      console.log(3)
      const response = await dmsScrape("link", link);
      console.log(4)
      response.error !== "unsupported"
        ? store.addItem(response)
        : store.addUnsupported(response);
        console.log(5)
    }
  } catch (error) {
    console.log(6)
    store.errorMsg = error;
  }
  console.log(7)
  store.isImporting = false;
}
