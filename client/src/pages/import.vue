<script setup>
import { ref, computed } from "vue";
import { store } from "../store";
const links = ref();
import { syncToStore } from "../../lib/syncToStore";
import { tellDb } from "../../lib/tellDb";
const isStandby = ref(true);
const isLoading = ref(false);
const isSuccess = ref(false);
async function submitForm() {
  isStandby.value = false;
  isLoading.value = true;
  try {
    await syncToStore(
      "import",
      await tellDb("import", links?.value.split("\n"))
    );
    isLoading.value = false;
    isSuccess.value = true;
    setTimeout(() => {
      isSuccess.value = !isSuccess.value;
    }, 1500);
    isStandby.value = true;
  } catch (error) {
    console.error("Error:", error);
  }
}

const btnClasses = computed(() => {
  const standby = isStandby.value ? " btn-primary " : "";
  const loading = isLoading.value ? " btn-disabled " : "";
  const success = isSuccess.value ? " btn-success " : "";
  return standby + loading + success + "btn flex-none";
});
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

  <div
    class="card bg-base-100 w-full shadow-xl my-4"
    v-for="res in store.newsContents"
  >
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
