import { store } from "~/store";
export default function (changedData) {
  store.unsupportedLinks = store.unsupportedLinks.filter(
    (item) => item.url !== changedData.url
  );
  store.data.push(changedData);
  console.log(
    "unsupported link cleared, deleting from unsupported list and moved to main data"
  );
}
