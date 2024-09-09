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
    <v-tabs
      v-model="tab"
      @update:model-value="syncData(encodeURIComponent(tab))"
    >
      <v-tab v-for="nav in navCategories" :value="nav">{{ nav }}</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab" class="px-6 py-6">
      <v-tabs-window-item v-for="nav in navCategories" :value="nav">
        <v-card
          variant="tonal"
          class="px-4 py-4 mt-4"
          v-for="item in store.allItems"
          :title="item.title"
          :subtitle="item.date_source_author"
        >
          <v-select
            label="Category"
            :items="[
              'Qualcomm相關新聞',
              'MediaTek相關新聞',
              '無線通訊市場',
              '智慧型手機/消費性電子產品',
              '其他業界重要訊息',
            ]"
            v-model="item.category"
            variant="underlined"
            @update:model-value="handleEdit(item, tab)"
          ></v-select>
          {{ item.id }}
          Priority{{ item.priority }}
          <p v-html="formatAsHTML(item.content)"></p>
          <v-card-actions>
            <v-btn
              variant="tonal"
              a
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              >Link</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script>
export default {
  data: () => ({
    tab: null,
  }),
};
</script>
