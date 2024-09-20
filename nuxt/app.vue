<script setup>
import { store } from "~/store";
import DevSpace from "./components/devSpace.vue";
import { dmsScrape } from "dms-scrape";
const list = [
  "Qualcomm相關新聞",
  "MediaTek相關新聞",
  "無線通訊市場",
  "智慧型手機/消費性電子產品",
  "其他業界重要訊息",
];
const tab = ref(null);
const isLoading = ref(false);
const inputLinks = ref("");
const errorMsg = ref("");
const isSuccess = ref(false);

async function submitForm(params) {
  for (const link of inputLinks.value.split("\n")) {
    if (store.data.find((x) => x.url == link) == undefined) {
      const response = await dmsScrape("link", link);
      const inputCategory = await response.category;
      const listOfThatCat = store.data.filter(
        (x) => x.category == inputCategory
      );
      const newPriority = listOfThatCat.length + 1;
      response["priority"] = newPriority;
      store.addItem(response);
      localStorage.setItem("data", JSON.stringify(store.data));
    }
  }
}

onMounted(() => {
  if (localStorage.getItem("data") !== null) {
    store.data = JSON.parse(localStorage.getItem("data"));
  }
});
watch(store, (newData) => {
  localStorage.setItem("data", JSON.stringify(store.data));
});
</script>
<template>
  <v-layout class="rounded rounded-md">
    <v-main height="100vh" class="flex flex-col items-start justify-start">
      <v-toolbar color="primary">
        <v-toolbar-title>JDMS</v-toolbar-title>

        <v-tabs v-model="tab">
          <v-tab>Dev</v-tab>
          <v-tab prepend-icon="mdi-home">Home</v-tab>
          <v-tab prepend-icon="mdi-download">Import</v-tab>
          <v-tab
            :disabled="store.data.length == 0"
            v-for="nav in navCategories"
            :value="nav"
            >{{ nav }}</v-tab
          >
          <v-tab prepend-icon="mdi-export">Export</v-tab>
        </v-tabs>
      </v-toolbar>

      <v-tabs-window v-model="tab" class="px-6 py-6 overflow-auto w-full">
        <v-tabs-window-item value="Dev">
          <DevSpace />
        </v-tabs-window-item>

        <v-tabs-window-item value="Home"> Home </v-tabs-window-item>

        <v-tabs-window-item value="Import">
          <v-container fluid>
            <v-textarea
              autofocus="true"
              label="Links"
              v-model="inputLinks"
              name="input-7-1"
              variant="filled"
              auto-grow
            ></v-textarea>
          </v-container>

          <v-alert
            v-show="errorMsg !== ''"
            density="compact"
            class="mx-4"
            type="warning"
            >{{ errorMsg }}</v-alert
          >

          <div class="flex flex-row w-full items-center justify-between">
            <v-btn
              prepend-icon="mdi-download"
              variant="tonal"
              :class="
                isLoading
                  ? 'w-full flex gap-4 mx-4 '
                  : isSuccess
                  ? 'w-full flex gap-4 mx-4 '
                  : ' w-full flex gap-4 mx-4 '
              "
              :loading="isLoading"
              @click="submitForm"
            >
              Import Links
            </v-btn>
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item v-for="nav in navCategories" :value="nav">
          <EditWindow :items="store.data.filter((x) => x.category == nav)" />
        </v-tabs-window-item>

        <v-tabs-window-item value="Export">
          <v-btn variant="tonal" @click="exportDocx"> Export </v-btn>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-main>
  </v-layout>
</template>
<style>
:root {
  font-family: "Noto Sans TC";
  font-smooth: auto;
}
html {
  overflow-y: auto;
}
</style>
