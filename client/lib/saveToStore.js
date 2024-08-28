import { convertList } from "./convertList";
import { store } from "../src/store";
import axios from "axios";
export async function saveToStore(entryOrId, eyeD) {
  //save the response to vue store
  let response;
  let data;
  if (entryOrId == "import") {
    response = await axios.post("http://localhost:3002/update", {link: eyeD});
    data = await response.data;
    console.log(`${data}`)
  } else if (entryOrId == "sync") {
    response = await axios.get("http://localhost:3002/get");
    data = await response.data;
  } else {
    response = await axios.get("http://localhost:3002/get?id=" + eyeD);
    data = await response.data;
  }

  //convert vue store response to sidebar variant store

  if (entryOrId == "getOne" || entryOrId == "import") {
    return await data;
  } else {
    store.newsContents = await data;
    store.newsContentsByCat = convertList(store.newsContents);
  }
}
