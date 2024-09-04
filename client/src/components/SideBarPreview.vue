<script setup>
import { store } from "../store";
import { useRouter } from "vue-router";
import { returnHRN } from "../../lib/returnHRN";
import axios from "axios";
import { syncDbToStore } from "../../lib/syncDbToStore";
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

async function handlePriority(category, priority1, priority2) {
  const response = await axios.post(
    "http://localhost:3002/swap/" + category + "/" + priority1 + "/" + priority2
  );
  await syncDbToStore();
}
</script>
<template>
  <ul class="flex flex-col items-start gap-2">
    <li v-for="key in cats" class="w-full flex">
      <h3 class="font-bold">
        {{ key.name }}
      </h3>
      <div v-for="s in returnLoc(key.name).values">
        <a
          @click="
            router.push({
              path: `/edit/${returnLoc(key.name).url}/${s.id}`,
              replace: true,
            })
          "
          class="indent-8"
        >
          N0. {{ s.priority }}: {{ s.title ? s.title : "No Title" }}
        </a>
        <div class="flex flex-col gap-4">
          <button
            class="btn btn-xs"
            type="button"
            :disabled="s.priority == 1"
            @click="handlePriority(s.category, s.priority, s.priority - 1)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-up"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
          <button
            class="btn btn-xs"
            :disabled="s.priority == returnLoc(key.name).values.length"
            @click="handlePriority(s.category, s.priority, s.priority + 1)"
          >
            <!-- when clicked send to /swap/s.category/s.priority/down -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-down"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>
