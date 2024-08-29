export async function syncToStore(syncType, data) {
  if (syncType == "import" || syncType == "sync") {
    store.newsContents = data;
    store.newsContentsByCat = convertList(store.newsContents);
  } else {
    ("");
  }
}
