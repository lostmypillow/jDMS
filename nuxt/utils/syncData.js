import { store } from "~/store";
export default async function (category) {
    const response = await $fetch("/api/fetch/" + category);
    store.allItems = response;
    const anotherresponse = await $fetch("/api/fetch/0")
    store.navItems = anotherresponse
    return;
  }