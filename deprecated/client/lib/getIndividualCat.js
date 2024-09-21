import axios from "axios";

export async function getIndivdiualCat(category) {
    const response = axios.get("http://localhost:3002/get/" + category)
    const data = await response.data
    return data
}