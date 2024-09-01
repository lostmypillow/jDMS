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
  store.Qualcomm = await (await axios.get("http://localhost:3002/get/qualcomm/0")).data
  store.MediaTek = await (await axios.get("http://localhost:3002/get/mediatek/0")).data
  store.Commu = await (await axios.get("http://localhost:3002/get/commu/0")).data
  store.Phone = await (await axios.get("http://localhost:3002/get/phone/0")).data
  store.Phone = await (await axios.get("http://localhost:3002/get/other/0")).data
 
}
