<script setup>
// import { ref } from "vue";
// const links = ref();
// import { store } from "../store";
// import { importToDb } from "../../lib/importToDb";
const isStandby = ref(true);
const isLoading = ref(false);
const isSuccess = ref(false);
// async function submitForm() {
//   isStandby.value = false;
//   isLoading.value = true;
//   try {
//     await importToDb(links?.value.trim().split("\n"));
//     isLoading.value = false;
//     isSuccess.value = true;
//     setTimeout(() => {
//       isSuccess.value = !isSuccess.value;
//     }, 1500);
//     isStandby.value = true;
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// const {data: count} = await useFetch('https://www.cool3c.com/article/223169')
const inputLinks = ref("");
const outputLinks = ref();
const errorMsg = ref("");
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
    await syncData(0)
    outputLinks.value = count.result;
    isLoading.value = !isLoading.value;
    isSuccess.value = !isSuccess.value;
    setTimeout(() => {
      isSuccess.value = !isSuccess.value;
    }, 1500);
  } catch (error) {
    isLoading.value = !isLoading.value;
    errorMsg.value = error;
  }
}
</script>
<template>
  <div class="flex flex-col h-full w-full py-6 items-center px-10 gap-4">
    <!-- <p class="text-lime-400">Listening for links from LINE bot</p> -->
    <!-- <p class="text-yellow-400">Receiving Links from LINE bot</p> -->

    <v-container fluid>
      <v-textarea
        label="Links"
        v-model="inputLinks"
        name="input-7-1"
        variant="filled"
        auto-grow
      ></v-textarea>
    </v-container>

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
    <span>
      {{ errorMsg }}
    </span>

    <p v-for="i in outputLinks">{{ i.title }}</p>
    <div class="flex flex-row gap-2">
      <span class="loading loading-spinner loading-sm text-yellow-400"></span>
    </div>
  </div>
</template>
