import { store } from "../src/store";
import axios from "axios";
import { saveToStore } from "./saveToStore";
let response;
let responseData;
export async function syncToNormal(type, id) {
  if (type == "fetch") {
    response = await axios.get("http://localhost:3002/news/get");
  } else if (type == "fetchOne") {
    response = await axios.get("http://localhost:3002/news/get?id="+ id);
    saveToStore(response.data)
    return response.data;
  } else if (type == "updateOne") {
  }
}
