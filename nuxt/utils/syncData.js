import { store } from "~/store";
export default async function (category) {
    const response = await $fetch("/api/fetch/" + category);
    store.allItems = response;
    const anotherresponse = await $fetch("/api/fetch/0")
    store.navItems = anotherresponse
    store.qualcomm = await $fetch("/api/fetch/Qualcomm相關新聞")
    store.mediatek = await $fetch("/api/fetch/MediaTek相關新聞")
    store.commu = await $fetch("/api/fetch/無線通訊市場")
    //
    store.phone = await $fetch("/api/fetch/" + encodeURIComponent("智慧型手機/消費性電子產品"));
    store.other = await $fetch("/api/fetch/其他業界重要訊息")
  
    return;
  }