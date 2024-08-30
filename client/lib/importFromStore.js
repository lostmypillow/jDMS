import { store } from "../src/store"
export function importFromStore(paramId) {
    console.log("importStore")
    return store.newsContents[paramId - 1]
}