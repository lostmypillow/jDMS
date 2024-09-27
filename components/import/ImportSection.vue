<script setup>
const props = defineProps(["title", "subtitle", "type"]);
const isLoading = ref(false);
const isSuccess = ref(false);
const errorMsg = ref("");
const inputLink = ref("");
import { dmsScrape } from "dms-scrape";
import { firebaseStore } from "~/stores/firebaseStore";
import { store } from "~/stores/store";
import { v4 as uuid } from "uuid";
const toFirebase = ref({
  title: "",
  date: "",
  source: "",
  author: "",
  url: "",
  category: "",
  content: "",
  id: uuid(),
});
const onlyImportingLink = computed(() => {
  return Object.keys(toFirebase.value).every((key) => {
    if (key === "url" && toFirebase.value["url"] != "") {
      return true; // Skip the excluded key
    } else {
      const value = toFirebase.value[key];
      return value === "";
    }
  });
});
async function handleClick() {
  store.isImporting = true;
  // await firebaseStore.createDoc(await dmsScrape("link", inputLink.value));
  console.log(toFirebase.value);
  store.isImporting = false;
  inputLink.value = "";
}
</script>
<template>
  <div
    :class="
      props.type == 'half'
        ? 'flex flex-col items-center justify-center h-1/2 p-4'
        : 'flex flex-col items-center justify-center w-1/2'
    "
  >
    <h1 class="text-3xl font-bold">{{ props.title }}</h1>
    <p>{{ props.subtitle }}</p>

    <v-list lines="one" v-if="props.title == 'Import via extension'">
      <!-- <v-list-item
        variant="tonal"
        v-for="link in store.unsupportedLinks"
        :title="link.url"
        a
        target="_blank"
        rel="noopener noreferrer"
        :href="link.url"
      ></v-list-item> -->
    </v-list>

    <v-card
      v-if="props.title == 'Import manually'"
      class="flex flex-col w-full px-6 py-4"
    >
      <div class="flex flex-row items-center justify-end w-full mb-4">
        <v-btn
          prepend-icon="mdi-send"
          variant="tonal"
          @click="handleClick"
          :loading="store.isImporting"
          >{{ onlyImportingLink ? "Import Link" : "Import Everything" }}</v-btn
        >
      </div>
      <v-text-field
        autofocus="true"
        label="Link"
        v-model="toFirebase.link"
        name="input-7-1"
        variant="filled"
        class="w-full"
      />

      <v-text-field
        class="w-full"
        v-model="toFirebase.title"
        label="title"
      ></v-text-field>
      <div class="flex w-full flex-row gap-4">
        <v-text-field v-model="toFirebase.date" label="date"></v-text-field>
        <v-text-field v-model="toFirebase.source" label="source"></v-text-field>
        <v-text-field v-model="toFirebase.author" label="author"></v-text-field>
      </div>
      <v-select
        label="Select Category"
        :items="store.navCategories"
        v-model="toFirebase.category"
      ></v-select>
      <v-textarea
        label="Content"
        v-model="toFirebase.content"
        name="input-7-1"
        variant="filled"
        auto-grow
        class="w-full"
      ></v-textarea>
    </v-card>
  </div>
</template>
<!-- Import From LINE -->
<!-- You don't have to do anything -->
