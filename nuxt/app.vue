<script setup>
const route = useRoute();
import { store } from "~/store";
const trueItems = ref();

onMounted(async () => {
  await syncData(encodeURIComponent("Qualcomm相關新聞"));
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
const list = [
  "Qualcomm相關新聞",
  "MediaTek相關新聞",
  "無線通訊市場",
  "智慧型手機/消費性電子產品",
  "其他業界重要訊息",
];
const tab = ref(null);
const outputLinks = ref();

const isShowing = ref(false);
const currentID = ref("");
const currentItem = ref();
const selectedItems = ref();

async function getByPk(uuid) {
  currentItem.value = await $fetch("/api/fetchone/" + uuid);
}
</script>
<template>
  <v-layout class="rounded rounded-md">
    <v-main height="100vh" class="flex flex-col items-start justify-start">
      <v-toolbar color="primary">
        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

        <v-toolbar-title>JDMS</v-toolbar-title>
        <ImportDialog />
        <!-- <v-spacer></v-spacer> -->
        <v-tabs
          v-model="tab"
          @update:model-value="syncData(encodeURIComponent(tab))"
        >
          <v-tab v-for="nav in navCategories" :value="nav">{{ nav }}</v-tab>
        </v-tabs>

        <v-btn @click="exportDocx"> Export </v-btn>
      </v-toolbar>

      <v-tabs-window v-model="tab" class="px-6 py-6 overflow-auto w-full">
        <v-tabs-window-item v-for="nav in navCategories" :value="nav">
          <div class="flex flex-row">
            <div class="flex-none w-1/5 mr-4 overflow-auto max-h-svh">
              <v-list lines="one" variant="tonal">
                <v-list-item
                  v-for="n in store.navItems.filter((x) => (x.category = nav))"
                  :value="n.id"
                  :key="n.id"
                  :title="n.title"
                  :subtitle="n.date_source_author"
                  @click="getByPk(n.id)"
                  rounded
                  class="mb-4 px-4 py-2"
                >
                  <div
                    class="flex flex-row items-center justify-between w-full py-4"
                  >
                    <v-btn v-if="n.priority != 1" prepend-icon="mdi-arrow-up">
                      Up</v-btn
                    >
                    <v-btn
                      v-if="
                        n.priority !=
                        store.navItems.filter((x) => x.category == n.category)
                          .length
                      "
                      prepend-icon="mdi-arrow-down"
                      >Down
                    </v-btn>
                  </div>
                </v-list-item>
              </v-list>
            </div>

            <div class="flex w-full h-fit">
              <v-card v-if="currentItem" variant="tonal" class="px-4 w-full">
                <p class="p-4 text-xs">
                  News Content No.{{ currentItem.priority }}; ID No.
                  {{ currentItem.id }}
                </p>

                <v-text-field
                  class="px-4"
                  v-model="currentItem.title"
                  label="Title"
                ></v-text-field>
                <div class="flex flex-row">
                  <v-text-field
                    class="px-4"
                    v-model="currentItem.date_source_author"
                    label="Date / Source / Author"
                  ></v-text-field>
                  <!-- <v-select
                    class="w-fit pl-4"
                    label="Category"
                    :items="[
                      'Qualcomm相關新聞',
                      'MediaTek相關新聞',
                      '無線通訊市場',
                      '智慧型手機/消費性電子產品',
                      '其他業界重要訊息',
                    ]"
                    v-model="currentItem.category"
                    variant="underlined"
                    @update:model-value="handleEdit(item, tab)"
                  ></v-select> -->
                </div>
                <v-btn-toggle
                  :items="list"
                  v-model="currentItem.category"
                  color="primary"
                  mandatory
                  class="w-full mb-4 ml-4"
                >
                  <v-btn v-for="i in list" :value="i">{{ i }}</v-btn>
                </v-btn-toggle>

                <div class="px-4">
                  <v-text-field v-model="currentItem.url" label="URL">
                    <template v-slot:append-inner>
                      <v-btn
                        a
                        variant="tonal"
                        :href="currentItem.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="lowercase underline text-blue-400"
                        >Open link</v-btn
                      >
                    </template></v-text-field
                  >
                </div>
                <!-- <p>ID: {{ item.id }}</p> -->

                <!-- <p v-html="formatAsHTML(item.content)"></p> -->

                <v-container fluid>
                  <v-textarea
                    label="Content"
                    v-model="currentItem.content"
                    name="input-7-1"
                    variant="filled"
                    auto-grow
                  ></v-textarea>
                </v-container>

                <v-card-actions>
                  <v-btn
                    variant="tonal"
                    a
                    :href="currentItem.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Link</v-btn
                  >
                </v-card-actions>
              </v-card>
            </div>
          </div>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-main>
  </v-layout>
</template>
<style>
:root {
  font-family: "SF Pro Text", "Noto Sans TC";
  font-smooth: auto;
}
html {
  overflow-y: auto;
}
</style>
