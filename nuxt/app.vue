<script setup>
const route = useRoute();
import { store } from "~/store";
import DevSpace from "./components/devSpace.vue";

function formatAsHTML(inputText) {
  //"paragraph1\nparagraph2\nparagraph3"
  return inputText.replace(/\n\n/g, "<br><br>");
}

const list = [
  "Qualcomm相關新聞",
  "MediaTek相關新聞",
  "無線通訊市場",
  "智慧型手機/消費性電子產品",
  "其他業界重要訊息",
];
const tab = ref(null);
const currentItem = ref();
const selectedItems = ref();
const isLoading = ref(false);
const inputLinks = ref("");
const dialog = ref(false);
const results = ref();
const errorMsg = ref("");
const isSuccess = ref(false);
async function submitForm() {
  isLoading.value = !isLoading.value;
  try {
    if (!inputLinks.value.trim()) {
      throw new Error("Input links cannot be empty.");
    }

    for (const link of inputLinks.value.split("\n")) {
      store.addItem(
        await $fetch("/api/import", {
          method: "POST",
          body: {
            url: link,
          },
        })
      );
    }
    isLoading.value = !isLoading.value;
    isSuccess.value = !isSuccess.value;

    setTimeout(() => {
      isSuccess.value = !isSuccess.value;
    }, 1500);
  } catch (error) {
    isLoading.value = !isLoading.value;
    errorMsg.value = error;
  }
}
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
          <v-tab v-for="nav in navCategories" :value="nav">{{ nav }}</v-tab>
          <v-tab prepend-icon="mdi-export">Export</v-tab>
        </v-tabs>
      </v-toolbar>

      <v-tabs-window v-model="tab" class="px-6 py-6 overflow-auto w-full">
        <v-tabs-window-item value="Dev">
          <DevSpace />
        </v-tabs-window-item>

        <v-tabs-window-item value="Home">Home</v-tabs-window-item>
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
            {{ store.allItems }}
          </v-container>

          <v-alert
            v-show="errorMsg !== ''"
            density="compact"
            class="mx-4"
            type="warning"
            >{{ errorMsg }}</v-alert
          >

          <div class="flex flex-row w-full items-center justify-between">
            <v-btn prepend-icon="mdi-close" @click="dialog = false"
              >Cancel
            </v-btn>
            <v-btn
              prepend-icon="mdi-download"
              variant="tonal"
              :class="
                isLoading
                  ? 'w-fit flex gap-4 '
                  : isSuccess
                  ? 'w-fit flex gap-4'
                  : ' w-fit flex gap-4 '
              "
              :loading="isLoading"
              @click="submitForm"
            >
              Import Links
            </v-btn>
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item v-for="nav in navCategories" :value="nav">
          <div class="flex flex-row">
            <EditNav />
            <EditCard :item="currentItem" />
          </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="Export">
          <v-btn variant="tonal" @click="exportDocx">
            Export
          </v-btn></v-tabs-window-item
        >
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
