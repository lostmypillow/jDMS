import axios from "axios";

export async function getFromDb(category) {
    const response = await axios.get("http://localhost:3002/get/" + category + "/0")
    return await response.data
}