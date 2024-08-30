import { store } from "../src/store";
import axios from "axios";
async function convertList(storeData) {
  return storeData.reduce((acc, article) => {
    if (!article.category) return acc;

    const category = article.category;
    const item = {
      id: article.id,
      title: article.title || "No Title",
      category: category,
      link: article.link,
    };

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(item);

    return acc;
  }, {});
}
export async function syncDbToStore() {
    const response = await axios.get(import.meta.env.VITE_GET);
    store.newsContents = await response.data;
    console.log("syncDbtoStore")
    console.log(store.newsContents)
  // store.newsContentsByCat = await convertList(store.newsContents);
 
}
