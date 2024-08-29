import axios from "axios";
import { syncDbToStore } from "./syncDbToStore";
export async function importToDb(data) {
  //send data to update endpoint
  const response = await axios.post(import.meta.env.VITE_UPDATE, {
    link: data,
  });
  await syncDbToStore();
}
