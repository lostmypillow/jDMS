import { store } from "../src/store"
import axios from "axios"
export async function importFromStore(category) {
    let response ;
    switch(true) {
        case category == "qualcomm":
            response = store.Qualcomm
            break;
        case category == "mediatek"
    }
    


    return response
}