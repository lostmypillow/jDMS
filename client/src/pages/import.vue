<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { store } from "../store";
const links = ref();
import { convertList } from "../../lib/convertList";
import { saveToStore } from "../../lib/saveToStore";
const qcommLinks = ref();
const mtekLinks = ref();
const wirelessLinks = ref();
const phoneLinks = ref();
const otherLinks = ref();
function handleClick() {
  console.log(links.value);
}
const results = ref();

async function submitForm() {
  try {
    // Replace with your API endpoint
    isStandby.value = false;
    isLoading.value = true;
    // const response = await axios.post("/scrape", links?.value.split("\n"));
   results.value = await saveToStore("import", links?.value.split("\n"));
    // // Handle the response as needed
    // console.log(response);
    // response.data.forEach((element) => {
    //   store.newsContents.push(element);

    // });
    // store.newsContentsByCat = convertList(store.newsContents)
    console.log(store.newsContents)
    console.log(await results.value)
    console.log(store.newsContentsByCat)

    isLoading.value = false;
    isSuccess.value = true;
    setTimeout(() => {
      isSuccess.value = !isSuccess.value;
    }, 1500);
    isStandby.value = true;
    console.log(links?.value.split("\n"));
  } catch (error) {
    console.error("Error:", error);
  }
}
const isStandby = ref(true);
const isLoading = ref(false);
const isSuccess = ref(false);
const btnClasses = computed(() => {
  const standby = isStandby.value ? " btn-primary " : "";
  const loading = isLoading.value ? " btn-disabled " : "";
  const success = isSuccess.value ? " btn-success " : "";
  return standby + loading + success + "btn flex-none";
});

/*
[
  A: [
    { id: 1, name: 'Item 1', category: 'A' },
    { id: 3, name: 'Item 3', category: 'A' }
  ],
  B: [
    { id: 2, name: 'Item 2', category: 'B' },
    { id: 5, name: 'Item 5', category: 'B' }
  ],
  C: [
    { id: 4, name: 'Item 4', category: 'C' }
  ]
]
*/
</script>
<template>
  <textarea
    v-model="links"
    class="flex grow textarea shadow-inner rounded-xl px-4 py-2 border-2 border-blue-200 resize-none"
    @input="
      (event) => {
        links = event.target.value;
      }
    "
  />

  <button :class="btnClasses" @click="submitForm">
    <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
    <span v-if="isLoading">Loading</span>
    <span v-else-if="isSuccess">Success!</span>
    <span v-else>Search</span>
  </button>

  <div class="card bg-base-100 w-full shadow-xl my-4" v-for="res in results">
    <!-- <label class="input input-bordered flex items-center gap-2">
     Title:
     <input type="text" class="grow" :placeholder="res.title" />
   </label> -->
    <div class="card-body">
      <h2 class="card-title">{{ res.title }}</h2>
      <p>{{ res.date_source_author }}</p>
      <a :href="res.link">{{ res.link }}</a>
      <p v-for="i in JSON.parse(res.content)">{{ i }}</p>
    </div>
  </div>
</template>
