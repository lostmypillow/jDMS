import { store } from "../src/store"
import axios from "axios"
export async function importFromStore(category, id) {
    const response = await axios.get(import.meta.env.VITE_GET + "/" + category, "/", id);

    return response
}