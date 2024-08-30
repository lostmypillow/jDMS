<script>
import { defineBasicLoader } from "unplugin-vue-router/data-loaders/basic";

import { importFromStore } from "../../lib/importFromStore";
export const useUserData = defineBasicLoader("/edit/[id]", async (route) => {
  return importFromStore(route.params.id);
});
</script>

<script setup>
import { useRoute } from "vue-router";
import { watch, ref, computed } from "vue";
import { store } from "../store";
import { useRouter } from "vue-router";
import { importFromStore } from "../../lib/importFromStore";
const router = useRouter();
const route = useRoute();
const { data: meo, isLoading, error, reload } = useUserData();
// console.log(meow.value)
const meow = ref(meo.value);
console.log(meow.title)
// watch(meow, async (oldMeow, newMeow) => {
//   store.isSaving = true;
//   console.log(newMeow.title);
//   // await editToDb(newMeow)
//   store.isSaving = false;
// });

const now = new Date();
// const computedF = computed({
//   get() {
//     return (store.newsContents[0]).title
//   },
//   // setter
//   set(newValue) {
//     // Note: we are using destructuring assignment syntax here.
//     [firstName.value, lastName.value] = newValue.split(' ')
//   }
// })
async function returnStore() {
 const f = await (store.newsContents[0]).title
 return f
}
const refTar = ref(await returnStore())
console.log(await returnStore())
console.log(importFromStore(1))
</script>
<template>
  <div class="flex flex-row items-center justify-between w-full pb-4">
    <h2 class="flex-none text-xl">Editing No. {{ route.params.id }}</h2>
    <!-- <button :class="isPreview? 'btn btn-secondary' : 'btn btn-primary'" @click="isPreview = !isPreview">
     <svg v-if="isPreview"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-edit"
        >
          <path
            d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
          ></path>
          <path
            d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
          ></path></svg
        ><svg v-else
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-eye"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle></svg
        > <span v-if="isPreview" 
        >Back to Edit</span
      >
      <span v-else >
        Preview</span
      >
    </button> -->
    <span v-if="store.isSaving" class="text-yellow-300">Saving...</span>
    <span v-else class="text-lime-500"
      >Saved at
      {{
        Intl.DateTimeFormat("en", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }).format(new Date())
      }}
    </span>
  </div>
  <input type="text" class="grow" v-model="refTar.value" @input="store.increment(1, refTar.value)" />
  <!-- Preview Cards -->
  <!-- <div class="card bg-base-100 w-full shadow-xl py-4 flex h-full">
    <div class="card-body">
    
      <label class="input input-bordered flex items-center gap-2">
        Headline:
        <input type="text" class="grow" v-model="meow.title" />
      </label>
      <label class="input input-bordered flex items-center gap-2">
        Date / Source / Author:
        <input type="text" class="grow" v-model="meow.date_source_author" />
      </label>
      <label class="input input-bordered flex items-center gap-2">
        Link:
        <input type="text" class="grow" v-model="meow.link" />
        <a :href="meow.link" target="_blank" rel="noopener noreferrer"
          >Go to link</a
        >
      </label>
      <label class="input input-bordered flex items-center gap-2 pr-0">
        Category:
        <select v-model="meow.category" class="select select-bordered w-full">
          <option disabled>Choose Category</option>
          <option value="Qualcomm相關新聞">Qualcomm相關新聞</option>
          <option value="MediaTek相關新聞">MediaTek相關新聞</option>
          <option value="無線通訊市場">無線通訊市場</option>
          <option value="智慧型手機/消費性電子產品">
            智慧型手機/消費性電子產品
          </option>
          <option value="其他業界重要訊息">其他業界重要訊息</option>
        </select>
      </label>
      <label class="flex items-center gap-2 pl-4"> Content: </label>
      <textarea
        v-model="meow.content"
        class="flex grow textarea shadow-inner rounded-xl px-4 py-2 border-2 border-blue-200 resize-none"
      />
    </div>
  </div> -->
</template>
