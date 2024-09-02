<script setup>
import { store } from "../store";
import { useRouter } from "vue-router";
const router = useRouter();
const cats = [
  {
    name: "Qualcomm相關新聞",
    location: store.Qualcomm,
  },
  {
    name: "MediaTek相關新聞",
    location: store.MediaTek,
  },
  {
    name: "無線通訊市場",
    location: store.Commu,
  },
  {
    name: "智慧型手機/消費性電子產品",
    location: store.Phone,
  },
  {
    name: "其他業界重要訊息",
    location: store.Other,
  },
];

function returnLoc(name) {
  let stoore;
  name == "Qualcomm相關新聞"
    ? (stoore = { values: store.Qualcomm, url: "qualcomm" })
    : name == "MediaTek相關新聞"
    ? (stoore = { values: store.MediaTek, url: "mediatek" })
    : name == "無線通訊市場"
    ? (stoore = { values: store.Commu, url: "commu" })
    : name == "智慧型手機/消費性電子產品"
    ? (stoore = { values: store.Phone, url: "phone" })
    : (stoore = { values: store.Other, url: "other" });
  return stoore;
}
</script>
<template>
  <ul class="flex flex-col items-start gap-2">
    <li v-for="key in cats" class="rw-full">
      <h3 class="font-bold">
        {{ key.name }}
      </h3>

      <a
        v-for="s in returnLoc(key.name).values"
        @click="
          router.push({
            path: `/edit/${returnLoc(key.name).url}/${s.id}`,
            replace: true,
          })
        "
        class="indent-8"
      >
        N0. {{ s.id }}: {{ s.title ? s.title : "No Title" }}
      </a>
    </li>
  </ul>
</template>
