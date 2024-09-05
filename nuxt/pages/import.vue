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
</script>
<template>
  <div class="flex flex-col h-full w-full py-6 items-end px-10">
    {{ count }}
    <div class="flex flex-row">
      <!-- <p class="text-yellow-400">Receiving Links from LINE bot</p> -->

      <p class="text-lime-400">Listening for links from LINE bot</p> <v-btn
      prepend-icon="mdi-download"
        :class="
          isLoading
            ? 'btn w-fit flex gap-4 btn-disabled'
            : isSuccess
            ? 'btn w-fit flex gap-4 btn-success'
            : 'btn w-fit flex gap-4 btn-primary'
        "
        @click="submitForm"
      >
        
          
        <span
          v-if="isLoading"
          class="loading loading-spinner loading-sm"
        ></span>
        <span v-if="isLoading">Loading</span>
        <span v-else-if="isSuccess">Success!</span>
        <span v-else>Import Links</span>
      </v-btn>
    </div>

      <v-container fluid>
        <v-textarea
          label="Label"
          model-value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          name="input-7-1"
          variant="filled"
          auto-grow
        ></v-textarea>
      </v-container>
 

    <div class="flex flex-row gap-2">
      <span class="loading loading-spinner loading-sm text-yellow-400"></span
      >
      
     
    </div>
  </div>
</template>
