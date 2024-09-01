import { syncDbToStore } from "./syncDbToStore";
import axios from "axios";
// update/qualcomm/1/title
export async function editToDb(editCat, id, editField, editContent) {
  const url = (response = await axios.post(
    import.meta.env.VITE_UPDATE + "/" + editCat + "/" + id + "/" + editField,
    editContent
  ));
  data = await response.data;
  await syncDbToStore();
}
