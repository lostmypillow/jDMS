<script>
import { defineBasicLoader } from "unplugin-vue-router/data-loaders/basic";
// const objToUpdate = store.newsContents.find(item => item.id === route.params.id);
import { importFromStore } from "../../lib/importFromStore";
export const useUserData = defineBasicLoader("/edit/[id]", async (route) => {
  return importFromStore(route.params.id);
});
</script>

<script setup>
import { useRoute } from "vue-router";
import { watch, ref } from "vue";
import { store } from "../store";
import { useRouter } from "vue-router";
const router = useRouter()
const route = useRoute();
const { data: meo, isLoading, error, reload } = useUserData();
const meow =ref(meo)
watch(meow.value, async (oldMeow, newMeow) => {
  store.isSaving = true;
  console.log(newMeow.title);
  // await editToDb(newMeow)
  store.isSaving = false;
});
</script>
<template>
  <div class="flex w-full flex-row justify-between items-center">
    <button class="btn btn-neutral mr-4" @click="router.push('/preview')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>Back to Preview</button>
    <h2 class="flex grow text-xl">
      Editing News Content No.{{ route.params.id }}
    </h2>

    <div v-if="store.isSaving" class="flex-none alert alert-warning">
      <div
        class="tooltip tooltip-bottom"
        data-tip="Changes will be automatically saved"
      >
        <span>Saving...</span>
      </div>
    </div>

    <div
      v-else
      class="tooltip tooltip-bottom flex w-fit alert alert-success"
      data-tip="Changes will be automatically saved"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        /></svg
      ><span>Saved</span>
    </div>
  </div>

  <!-- <span>{{ meow }}</span> -->
  <div class="card bg-base-100 w-full shadow-xl py-4 flex h-full">
    <div class="card-body">
      <!-- <span>{{ results }}</span> -->
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
        <a :href="meow.link">Go to link</a>
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
  </div>
</template>
