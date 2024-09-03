import axios from "axios";
import { syncDbToStore } from "./syncDbToStore";
export async function importToDb(data) {
  let response
  try {
    response = await axios.post(import.meta.env.VITE_IMPORT, {
      links: data,
    });
    await syncDbToStore();
  } catch (error) {
    console.log(error);
  }
  return response
}
