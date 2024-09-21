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
  try {
    for (const link of inputLinks.value.split("\n")) {
      if (store.data.find((x) => x.url == link) == undefined) {
        const response = await dmsScrape("link", link);
        console.log(response);

        if (response.error == undefined) {
          const inputCategory = await response.category;
          const listOfThatCat = store.data.filter(
            (x) => x.category == inputCategory
          );
          const newPriority = listOfThatCat.length + 1;
          response["priority"] = newPriority;
          store.addItem(response);
        } else {
          store.addUnsupported(response);
        }
      }
    }
  } catch (error) {
    errorMsg.value = error;
  }
}

onMounted(() => {
  if (localStorage.getItem("data") !== null) {
    store.data = JSON.parse(localStorage.getItem("data"));
  }

  if (localStorage.getItem("unsupported") !== null) {
    store.unsupportedLinks = JSON.parse(localStorage.getItem("unsupported"));
  }
});
watch(store, (newData) => {
  localStorage.setItem("data", JSON.stringify(store.data));
  localStorage.setItem("unsupported", JSON.stringify(store.unsupportedLinks));
});

const tabvmodel = ref("import");
const items = ref(["efe", "efe", "efef"]);
</script>
<template>
  <div
    class="w-full flex items-center justify-center h-14 border-2 border-red-500 z-500 absolute"
  >
    <!-- :elevation="tabvmodel == 'import'? '5' : '0'"  -->
    <v-btn-toggle
      elevation="10"
      color="primary"
      rounded="xl"
      v-model="tabvmodel"
    >
      <v-btn value="import">Import</v-btn>
      <v-btn value="edit">Edit</v-btn>
      <v-btn value="export">Export</v-btn>
    </v-btn-toggle>
  </div>

  <div class="w-svw h-svh items-center justify-center pt-14">
      <!-- <v-tabs v-if="tabvmodel == 'edit'" class="w-full" background-color="transparent" fixed-tabs v-model="tab" grow>
        <v-tab
          v-for="item in store.navCategories"
          :text="item"
         :value="item"
        ></v-tab>
      </v-tabs>

      <v-tabs-window v-if="tabvmodel == 'edit'" v-model="tab">
        <v-tabs-window-item v-for="item in store.navCategories" :key="item" :value="item">
          <p>{{ item }}</p>
        </v-tabs-window-item>
      </v-tabs-window>  -->
      <div class="flex flex-row w-full h-full p-6" v-if="tabvmodel == 'edit'">
        <v-list
          class="w-1/5 border-red-500 border-2"
          v-for="i in store.navCategories"
        >
          <v-list-subheader>{{ i }}</v-list-subheader>
          <v-list-item><v-btn>I am a button</v-btn></v-list-item>
        </v-list>
      </div>

      <div class="flex flex-row h-full w-full" v-if="tabvmodel == 'import'">
       <div class="flex flex-col items-center justify-center w-1/2">
        <div class="flex items-center h-1/2">im top</div>
        <div class="flex items-center h-1/2"> im bottom</div>
      </div>
       <div class="flex items-center justify-center w-1/2"> im another</div>
      </div>
      <div v-else>I am bottom</div>
    </div>
  

  <!-- <v-layout class="rounded rounded-md">
    <v-main height="100vh" class="flex flex-col items-start justify-start">
      <v-toolbar color="primary">
        <v-toolbar-title>JDMS</v-toolbar-title>

        <v-tabs v-model="tab">
        
          <v-tab prepend-icon="mdi-download">Import</v-tab>
          <v-tab
            :disabled="store.data.length == 0"
            v-for="nav in store.navCategories"
            :value="nav"
            >{{ nav }}</v-tab
          >
          <v-tab prepend-icon="mdi-export">Export</v-tab>
        </v-tabs>
      </v-toolbar>

      <v-tabs-window v-model="tab" class="px-6 py-6 overflow-auto w-full">
     

        <v-tabs-window-item value="Import">
          <div class="flex flex-row">
            <v-list lines="one">
              <v-list-subheader>Manual Intervention Required: </v-list-subheader
              ><v-btn size="small" class="ml-4" variant="outlined"
                >What is Manual Intervention?</v-btn
              >
              <v-list-item
                v-for="link in store.data.length == 0
                  ? store.unsupportedLinks.filter(
                      (link) =>
                        !new Set(store.data.map((obj) => obj.url)).has(link)
                    )
                  : store.unsupportedLinks"
                :title="link.url"
                a
                target="_blank"
                rel="noopener noreferrer"
                :href="link.url"
              ></v-list-item> </v-list
            ><div class="flex flex-col gap-4 items-center justify-center w-full">
              <div class="flex flex-row-reverse items-center justify-between w-full">
                <v-btn
                prepend-icon="mdi-download"
                variant="tonal"
                :class="
                  isLoading
                    ? 'w-fit flex gap-4  '
                    : isSuccess
                    ? 'w-fit flex gap-4  '
                    : ' w-fit flex gap-4  '
                "
                :loading="isLoading"
                @click="submitForm"
              >
                Import Links
              </v-btn>
              <v-btn prepend-icon="mdi-info" size="small"  variant="outlined"
                >What can I import?</v-btn
              >
              </div>
              
              <v-alert
                v-show="errorMsg !== ''"
                density="compact"
                class="mx-4"
                type="warning"
                >{{ errorMsg }}</v-alert
              >
              <v-textarea
                autofocus="true"
                label="Links"
                v-model="inputLinks"
                name="input-7-1"
                variant="filled"
                class="w-full"
                auto-grow
              ></v-textarea>
            </div>
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item v-for="nav in store.navCategories" :value="nav">
          <EditWindow :items="store.data.filter((x) => x.category == nav)" />
        </v-tabs-window-item>

        <v-tabs-window-item value="Export">
          <v-btn variant="tonal" @click="exportDocx"> Export </v-btn>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-main>
  </v-layout> -->
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
