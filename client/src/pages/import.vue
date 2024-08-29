<script setup>
import { ref, computed } from "vue";
import { store } from "../store";
const links = ref();
import { importToDb } from "../../lib/importToDb";
const isStandby = ref(true);
const isLoading = ref(false);
const isSuccess = ref(false);
async function submitForm() {
  isStandby.value = false;
  isLoading.value = true;
  try {
    const response = await importToDb(links?.value.split("\n"));

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
  <div class="flex flex-1 flex-col gap-4">
    <h2 class="flex-none text-xl">Import Links</h2>
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
  </div>
</template>
