<script setup>
import { ref } from "vue";
const links = ref();
import { importToDb } from "../../lib/importToDb";
const isStandby = ref(true);
const isLoading = ref(false);
const isSuccess = ref(false);
async function submitForm() {
  isStandby.value = false;
  isLoading.value = true;
  try {
    await importToDb(links?.value.trim().split("\n"));
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
</script>
<template>
  <div class="flex flex-row items-center justify-between w-full pb-4">
    <h2 class="flex-none text-xl">Import Links</h2>
    <button
      :class="
        isLoading
          ? 'btn w-fit flex gap-4 btn-disabled'
          : isSuccess
          ? 'btn w-fit flex gap-4 btn-success'
          : 'btn w-fit flex gap-4 btn-primary'
      "
      @click="submitForm"
    >
      <svg
        v-if="isStandby"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-download"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>

      <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
      <span v-if="isLoading">Loading</span>
      <span v-else-if="isSuccess">Success!</span>
      <span v-else>Import Links</span>
    </button>
  </div>
  <textarea
    v-model="links"
    class="flex grow textarea shadow-inner rounded-xl px-4 py-2 border-2 border-blue-200 resize-none w-full"
    @input="
      (event) => {
        links = event.target.value;
      }
    "
  />
</template>
