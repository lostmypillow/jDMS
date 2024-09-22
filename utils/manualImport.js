import { store } from "~/store";
import { dmsScrape } from "dms-scrape";
export default async function (link) {
  try {
    if (store.data.find((x) => x.url == link) == undefined) {
      const response = await dmsScrape("link", link);
      if (response.error == undefined) {
        const inputCategory = await response.category;
        response["priority"] =
          store.data.filter((x) => x.category == inputCategory).length + 1;
        store.addItem(response);
      } else {
        store.addUnsupported(response);
      }
    }
  } catch (error) {
    store.errorMsg = error;
  }
}
