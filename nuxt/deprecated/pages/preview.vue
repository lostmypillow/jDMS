<script setup>
import { store } from "~/store";
// const navCategories = [
//   "All",
//   "Qualcomm相關新聞",
//   "MediaTek相關新聞",
//   "無線通訊市場",
//   "智慧型手機/消費性電子產品",
//   "其他業界重要訊息",
// ];
const trueItems = ref();

function extractAttribute() {
  let l = trueItems.value.map((item) => item["title"]);
  console.log(l);
}

onMounted(async () => {
  await syncData(encodeURIComponent(tab));
});

function formatAsHTML(inputText) {
  //"paragraph1\nparagraph2\nparagraph3"
  return inputText.replace(/\n\n/g, "<br><br>");
}

async function handleEdit(item, tab) {
  await sendEdit(item);
  await syncData(encodeURIComponent(tab));
  return;
}
</script>
<template>
  <div class="w-full">
    <!-- <button @click="extractAttribute">as</button> -->
   
  </div>
</template>

<script>
export default {
  data: () => ({
    tab: null,
  }),
};
</script>
