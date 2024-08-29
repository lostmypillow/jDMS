<script setup>
import { store } from "../store";
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
import { useClipboard } from "@vueuse/core";
import { formatData } from "../../lib/formatData";

const source = ref("Hello");
const { text, copy, copied, isSupported } = useClipboard({ source });
</script>
<template>
  <h2 class="flex items-center justify-between text-xl">Preview</h2>

  <div
    class="card bg-neutral text-neutral-content w-full shadow-xl my-4"
    v-for="res in store.newsContents"
  >
    <div class="card-body">
      <div class="card-title flex flex-row items-center justify-between">
        <h2>{{ res.title }}</h2>
        <div class="flex gap-4">
          <button class="btn btn-primary" @click="copy(formatData(res))">
            <!-- by default, `copied` will be reset in 1.5s -->
            <span v-if="!copied">Copy</span>
            <span v-else>Copied!</span>
          </button>
          <a
            class="btn btn-secondary"
            @click="router.push({ path: `/edit/${res.id}`, replace: true })"
            >Edit</a
          >
        </div>
      </div>
      <p>{{ res.date_source_author }}</p>
      <a :href="res.link">{{ res.link }}</a>
      <div class="badge badge-primary">{{ res.category }}</div>

      <p v-for="i in JSON.parse(res.content)">{{ i }}</p>
    </div>
  </div>
</template>
