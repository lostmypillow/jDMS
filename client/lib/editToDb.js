import { syncDbToStore } from "./syncDbToStore";

export async function editToDb(edit) {
  response = await axios.post(import.meta.env.VITE_UPDATE, edit);
  data = await response.data;
  await syncDbToStore();
}
