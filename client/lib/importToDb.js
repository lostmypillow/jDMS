import axios from "axios";
import { syncDbToStore } from "./syncDbToStore";
export async function importToDb(data) {
  try {
    const response = await axios.post(import.meta.env.VITE_IMPORT, {
      links: data,
    });
    await syncDbToStore();
  } catch (error) {
    console.log(error);
  }
}
