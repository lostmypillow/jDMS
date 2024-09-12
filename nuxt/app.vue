<script setup>
const route = useRoute();
import { store } from "~/store";
onMounted(() => {});
const trueItems = ref();

function extractAttribute() {
  let l = trueItems.value.map((item) => item["title"]);
  console.log(l);
}

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
const tab = ref(null);
const isStandby = ref(true);
const isLoading = ref(false);
const isSuccess = ref(false);
const inputLinks = ref("");
const outputLinks = ref();
const errorMsg = ref("");

const dialog = ref(false);
async function submitForm() {
  console.log(inputLinks.value);
  isLoading.value = !isLoading.value;
  try {
    if (!inputLinks.value.trim()) {
      throw new Error("Input links cannot be empty.");
    }
    const count = await $fetch("/api/import", {
      method: "POST",
      body: {
        urls: inputLinks.value.split("\n"),
      },
    });
    await syncData(0);
    outputLinks.value = count.result;
    isLoading.value = !isLoading.value;
    isSuccess.value = !isSuccess.value;

    setTimeout(() => {
      isSuccess.value = !isSuccess.value;
    }, 1500);
    dialog.value = false;
  } catch (error) {
    isLoading.value = !isLoading.value;
    errorMsg.value = error;
  }
}
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

        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="400" persistent>
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps"> Import Links </v-btn>
          </template>

          <v-card>
            <!-- //stuff from import -->

            <v-container fluid>
              <v-textarea
                label="Links"
                v-model="inputLinks"
                name="input-7-1"
                variant="filled"
                auto-grow
              ></v-textarea>
            </v-container>

            <span>
              {{ errorMsg }}
            </span>
            <template v-slot:actions>
              <v-spacer></v-spacer>

              <v-btn
                prepend-icon="mdi-download"
                :class="
                  isLoading
                    ? 'btn w-fit flex gap-4 btn-disabled'
                    : isSuccess
                    ? 'btn w-fit flex gap-4 btn-success'
                    : 'btn w-fit flex gap-4 btn-primary'
                "
                :loading="isLoading"
                @click="submitForm"
              >
                Import Links
              </v-btn>
              <v-btn @click="dialog = false">Cancel </v-btn>
            </template>
          </v-card>
        </v-dialog>
        <v-btn @click="exportDocx"> Export </v-btn>

        <template v-slot:extension>
          <v-tabs
            v-model="tab"
            @update:model-value="syncData(encodeURIComponent(tab))"
          >
            <v-tab v-for="nav in navCategories" :value="nav">{{ nav }}</v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-window v-model="tab" class="px-6 py-6 overflow-auto w-full">
        <v-tabs-window-item v-for="nav in navCategories" :value="nav">

          <div class="flex flex-row">
            <div class="flex-none w-1/5 mr-4">
              <v-list lines="one" variant="tonal">
                <!--  @click="
                    currentItem = store.navItems.find(
                      (element) => (element.id = n.id)
                    )
                  " -->
         
                <v-list-item
                  v-for="n in store.navItems.filter((x) => (x.category = nav))"
                  :value="n.id"
                  :key="n.id"
                  :title="n.title"
                  :subtitle="n.date_source_author"
                  @click="getByPk(n.id)"
                >
                <v-btn
                    v-if="n.priority != 1"
                    prepend-icon="mdi-arrow-up"
                  >
                    Move Up</v-btn
                  >
                  <v-btn
                    v-if="
                      n.priority !=
                      store.navItems.filter(
                        (x) => x.category == n.category
                      ).length
                    "
                    prepend-icon="mdi-arrow-down"
                    >Move Down
                  </v-btn>
              </v-list-item>
              </v-list>
            </div>

            <div class="flex grow">
              <v-card
                v-if="currentItem"
                variant="tonal"
                class="px-4 py-4 mt-4 w-full"
              >
                <p class="p-4 text-xl font-bold">
                  News Content No.{{ currentItem.priority }}
                </p>
                {{ currentItem.id }}


                <div class="flex flex-row">
                   <v-text-field
                  class="px-4"
                  v-model="currentItem.title"
                  label="Title"
                ></v-text-field>
                <v-text-field
                  class="px-4"
                  v-model="currentItem.date_source_author"
                  label="Date / Source / Author"
                ></v-text-field>
                <v-select
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
                  ></v-select>
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
                    v-if="currentItem.priority != 1"
                    prepend-icon="mdi-arrow-up"
                  >
                    Move Up</v-btn
                  >
                  <v-btn
                    v-if="
                      currentItem.priority !=
                      store.navItems.filter(
                        (x) => x.category == currentItem.category
                      ).length
                    "
                    prepend-icon="mdi-arrow-down"
                    >Move Down
                  </v-btn>
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
