<script setup>
import { store } from "~/store";

firebaseSync()

onMounted(() => {
 storageSync("toStore")
});
watch(store, (newData) => {
 storageSync("toLocalStorage")
});
</script>
<template>
  <FloatNav />

  <div class="w-svw h-svh items-center justify-center pt-14">
    <EditTab />

    <ImportTab />

    <ExportTab />
  </div>

  <!-- <v-layout class="rounded rounded-md">
    <v-main height="100vh" class="flex flex-col items-start justify-start">
      <v-toolbar color="primary">
        <v-toolbar-title>JDMS</v-toolbar-title>

        <v-tabs v-model="tab">
        
          <v-tab prepend-icon="mdi-download">Import</v-tab>
          <v-tab
            :disabled="store.data.length == 0"
            v-for="nav in store.navCategories"
            :value="nav"
            >{{ nav }}</v-tab
          >
          <v-tab prepend-icon="mdi-export">Export</v-tab>
        </v-tabs>
      </v-toolbar>

      <v-tabs-window v-model="tab" class="px-6 py-6 overflow-auto w-full">
     

        <v-tabs-window-item value="Import">
          <div class="flex flex-row">
            <v-list lines="one">
              <v-list-subheader>Manual Intervention Required: </v-list-subheader
              ><v-btn size="small" class="ml-4" variant="outlined"
                >What is Manual Intervention?</v-btn
              >
              <v-list-item
                v-for="link in store.data.length == 0
                  ? store.unsupportedLinks.filter(
                      (link) =>
                        !new Set(store.data.map((obj) => obj.url)).has(link)
                    )
                  : store.unsupportedLinks"
                :title="link.url"
                a
                target="_blank"
                rel="noopener noreferrer"
                :href="link.url"
              ></v-list-item> </v-list
            ><div class="flex flex-col gap-4 items-center justify-center w-full">
              <div class="flex flex-row-reverse items-center justify-between w-full">
                <v-btn
                prepend-icon="mdi-download"
                variant="tonal"
                :class="
                  isLoading
                    ? 'w-fit flex gap-4  '
                    : isSuccess
                    ? 'w-fit flex gap-4  '
                    : ' w-fit flex gap-4  '
                "
                :loading="isLoading"
                @click="submitForm"
              >
                Import Links
              </v-btn>
              <v-btn prepend-icon="mdi-info" size="small"  variant="outlined"
                >What can I import?</v-btn
              >
              </div>
              
              <v-alert
                v-show="errorMsg !== ''"
                density="compact"
                class="mx-4"
                type="warning"
                >{{ errorMsg }}</v-alert
              >
              <v-textarea
                autofocus="true"
                label="Links"
                v-model="inputLinks"
                name="input-7-1"
                variant="filled"
                class="w-full"
                auto-grow
              ></v-textarea>
            </div>
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item v-for="nav in store.navCategories" :value="nav">
          <EditWindow :items="store.data.filter((x) => x.category == nav)" />
        </v-tabs-window-item>

        <v-tabs-window-item value="Export">
          <v-btn variant="tonal" @click="exportDocx"> Export </v-btn>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-main>
  </v-layout> -->
</template>
<style>
:root {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-smooth: auto;
}
html {
  overflow-y: auto;
}
</style>
