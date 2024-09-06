<script setup>
import { timestamp } from "@vueuse/core";

const navPlaces = [
  "All",
  "Qualcomm相關新聞",
  "MediaTek相關新聞",
  "無線通訊市場",
  "智慧型手機/消費性電子產品",
  "其他業界重要訊息",
];

const items = [
  {
    name: "Item #1",
    id: 1,
  },
  {
    name: "Item #2",
    id: 2,
  },
  {
    name: "Item #3",
    id: 3,
  },
];

const userName = ref("");

function handleSubmit() {
  console.log(userName.value);
}

let subtitle_file;
const listofLyrics = ref([]);
const listy = [
  {
    text: "efnkwnekf",
    number: 3,
  },
  {
    text: "efnkwwfdekf",
    number: 3,
  },
  {
    text: "efnkwnekf",
    number: 3,
  },
];
</script>
<template>
  <div class="w-full">
    <v-tabs v-model="tab">
      <v-tab v-for="nav in navPlaces" :value="nav">{{ nav }}</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="Qualcomm相關新聞">
        <div class="flex flex-row w-full">
          <div class="flex-none w-1/5">
            <v-list :items="items" item-title="name" item-value="id"></v-list>
          </div>
          <div class="grow">
            <v-form @submit.prevent="handleSubmit">
              <v-text-field v-model="userName" label="User name"></v-text-field>

              <v-btn
                :loading="loading"
                class="mt-2"
                text="Submit"
                type="submit"
                block
              ></v-btn>
            </v-form>
          </div>
        </div>
      </v-tabs-window-item>

      <v-tabs-window-item value="two"> Two </v-tabs-window-item>

      <v-tabs-window-item value="three"> Three </v-tabs-window-item>
    </v-tabs-window>
  </div>

  <p v-for="i of listy">
    {{ i.text }}
  </p>
</template>
<script>
export default {
  data: () => ({
    tab: null,
  }),
};
</script>
