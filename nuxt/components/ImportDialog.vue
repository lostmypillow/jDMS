<script setup>
const isLoading = ref(false);
const inputLinks = ref("");
const dialog = ref(false);
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
    await syncData(0);
    outputLinks.value = count.result;
    isLoading.value = !isLoading.value;
    isSuccess.value = !isSuccess.value;

    setTimeout(() => {
      isSuccess.value = !isSuccess.value;
    }, 1500);
    dialog.value = false;
  } catch (error) {
    isLoading.value = !isLoading.value;
    errorMsg.value = error;
  }
}
const errorMsg = ref("");

const isSuccess = ref(false);
</script>
<template>
  <v-dialog v-model="dialog" max-width="400" persistent>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps"> Import Links </v-btn>
    </template>

    <v-card>
      <!-- //stuff from import -->

      <v-container fluid>
        <v-textarea
          label="Links"
          v-model="inputLinks"
          name="input-7-1"
          variant="filled"
          auto-grow
        ></v-textarea>
      </v-container>

      <v-alert
        v-show="errorMsg !== ''"
        density="compact"
        class="mx-4"
        type="warning"
        >{{ errorMsg }}</v-alert
      >

      <template v-slot:actions>
        <div class="flex flex-row w-full items-center justify-between">
          <v-btn prepend-icon="mdi-close" @click="dialog = false">Cancel </v-btn>
          <v-btn
            prepend-icon="mdi-download"
            variant="tonal"
            :class="
              isLoading
                ? 'w-fit flex gap-4 '
                : isSuccess
                ? 'w-fit flex gap-4'
                : ' w-fit flex gap-4 '
            "
            :loading="isLoading"
            @click="submitForm"
          >
            Import Links
          </v-btn>
        </div>
      </template>
    </v-card>
  </v-dialog>
</template>
