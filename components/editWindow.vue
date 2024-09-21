<script setup>
import { store } from "~/store";
const props = defineProps(["items"]);
const currentURL = ref(0);
const length = ref(props.items.length);
const textt = ref("meow\nmeow");
</script>
<template>
  <div class="flex flex-row">
    <div class="flex-none w-1/5 mr-4 overflow-auto max-h-svh">
      <v-list lines="one" variant="tonal">
        <v-list-item
          v-for="n in props.items.sort((a, b) => a.priority - b.priority)"
          rounded
          class="mb-4 px-4 py-2"
        >
          <div class="flex flex-row items-center justify-between w-full py-4">
            <p
              class="hover:underline pointer-events-auto"
              @click="currentURL = n.url"
            >
              {{ n.title }}
            </p>

            <div class="flex flex-col">
              <v-btn
                v-if="n.priority != 1"
                @click="store.swapPriorities(n.category, n.priority, 'up')"
                icon="mdi-arrow-up"
              >
              </v-btn>

              <v-btn
                v-if="n.priority != props.items.length"
                icon="mdi-arrow-down"
                @click="store.swapPriorities(n.category, n.priority, 'down')"
              >
              </v-btn>
            </div>
          </div>
        </v-list-item>
      </v-list>
    </div>

    <div class="flex w-full h-fit">
      <v-card
        v-if="store.data.find((x) => x.url == currentURL)"
        variant="tonal"
        class="px-4 w-full"
      >
        <p class="p-4 text-xs">
          News Content No.{{
            store.data.find((x) => x.url == currentURL).priority
          }}
        </p>

        <v-text-field
          class="px-4"
          v-model="store.data.find((x) => x.url == currentURL).title"
          label="Title"
        ></v-text-field>
        <div class="flex flex-row">
          <v-text-field
            class="px-4"
            v-model="store.data.find((x) => x.url == currentURL).date"
            label="Date"
          ></v-text-field>
          <v-text-field
            class="px-4"
            v-model="store.data.find((x) => x.url == currentURL).source"
            label="Source"
          ></v-text-field>
          <v-text-field
            class="px-4"
            v-model="store.data.find((x) => x.url == currentURL).author"
            label="Author"
          ></v-text-field>
          <v-select
            class="w-fit pl-4"
            label="Category"
            :items="[
              'Qualcomm相關新聞',
              'MediaTek相關新聞',
              '無線通訊市場',
              '智慧型手機/消費性電子產品',
              '其他業界重要訊息',
            ]"
            v-model="store.data.find((x) => x.url == currentURL).category"
            variant="underlined"
          ></v-select>
        </div>

        <a
          variant="tonal"
          :href="store.data.find((x) => x.url == currentURL).url"
          target="_blank"
          rel="noopener noreferrer"
          class="lowercase underline text-blue-400 h-full w-full m-4"
          >{{ store.data.find((x) => x.url == currentURL).url }}</a
        >

        <v-textarea
          autofocus="true"
          label="Content"
          v-model="store.data.find((x) => x.url == currentURL).content"
          name="input-7-1"
          variant="filled"
          class="mx-4"
          auto-grow
        ></v-textarea>

        <!-- <p>ID: {{ item.id }}</p> -->

        <!-- <p v-html="formatAsHTML(item.content)"></p> -->

        <!-- <v-container fluid>
          <v-textarea
            label="Content"
            v-model="props.item.content"
            name="input-7-1"
            variant="filled"
            auto-grow
          ></v-textarea>
        </v-container> -->

        <!-- <v-card-actions>
          <v-btn
            variant="tonal"
            a
            :href="props.item.url"
            target="_blank"
            rel="noopener noreferrer"
            >Link</v-btn
          >
        </v-card-actions> -->
      </v-card>
    </div>
  </div>
</template>
