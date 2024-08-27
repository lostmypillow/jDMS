import { convertList } from "./convertList";
import { store } from "../src/store";
export function saveToStore(data) {
  store.newsContents = data
  store.newsContentsByCat = convertList(data);
}
