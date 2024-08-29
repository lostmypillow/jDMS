import { store } from "../src/store"
export function importFromStore(paramId) {
    return store.newsContents[[paramId] - 1]
}