<script setup>
const props = defineProps(["title", "subtitle", "type"]);
const isLoading = ref(false);
const isSuccess = ref(false);
const errorMsg = ref("");
const inputLink = ref("");
import { store } from "~/store";
</script>
<template>
  <div
    class="flex flex-col items-center justify-center h-1/2 p-4"
    v-if="props.type == 'half'"
  >
    <h1 class="text-3xl font-bold">{{ props.title }}</h1>
    <p>{{ props.subtitle }}</p>

    <v-list lines="one" v-if="props.title == 'Import via extension'">
   
      <v-list-item
      variant="tonal"
        v-for="link in store.data.length == 0
          ? store.unsupportedLinks.filter(
              (link) => !new Set(store.data.map((obj) => obj.url)).has(link)
            ).filter((x) => x == 'no new links')
          : store.unsupportedLinks"
        :title="link.url"
        a
        target="_blank"
        rel="noopener noreferrer"
        :href="link.url"
      ></v-list-item>
    </v-list>
  </div>

  <div v-else class="flex flex-col items-center justify-center w-1/2">
    <h1 class="text-3xl font-bold">{{ props.title }}</h1>
    <p>{{ props.subtitle }}</p>
    <div class="flex flex-row w-full px-4 mt-4">
      <div class="flex flex-col gap-4 items-center justify-center w-full">
        <v-text-field
          autofocus="true"
          label="Link"
          v-model="inputLink"
          name="input-7-1"
          variant="filled"
          class="w-full h-full"
        >
          <template v-slot:append>
            <v-btn
              icon="mdi-send"
              variant="tonal"
              :loading="isLoading"
              @click="manualImport(inputLink)"
            >
            </v-btn>
          </template> </v-text-field
        ><v-alert
          v-show="store.errorMsg !== ''"
          density="compact"
          class="mx-4"
          type="warning"
          >{{ store.errorMsg }}</v-alert
        >
      </div>
    </div>
  </div>
</template>
<!-- Import From LINE -->
<!-- You don't have to do anything -->
