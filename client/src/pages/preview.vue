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
  <div class="flex flex-row items-center justify-between">
    <!-- <button class="btn btn-primary" @click="copy(formatData(results))">
    
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-copy"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path
          d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
        ></path>
      </svg>
      <span v-if="!copied">Copy</span>
      <span v-else>Copied!</span>
    </button> -->

    <div class="flex flex-col">
      <!-- Preview Cards -->
      <div
        class="flex card bg-neutral text-neutral-content w-full shadow-xl my-4"
        v-for="res in store.newsContents"
        :id="res.id"
      >
        <div class="card-body">
          <div class="card-title flex flex-row items-center justify-between">
            <h2>{{ res.title }}</h2>
            <div class="flex gap-4">



              <button class="btn btn-primary" @click="copy(formatData(res))">
                <!-- by default, `copied` will be reset in 1.5s -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-copy"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path
                    d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                  ></path>
                </svg>
                <span v-if="!copied">Copy</span>
                <span v-else>Copied!</span>
              </button>


              <a
                class="btn btn-secondary"
                @click="router.push({ path: `/edit/${res.id}`, replace: true })"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-edit"
                >
                  <path
                    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                  ></path>
                  <path
                    d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                  ></path></svg
                >
                Edit
                </a>






            </div>
          </div>
          <p>
            {{ res.date_source_author }}
          </p>




          <a :href="res.link">
            {{ res.link }}
          </a>



          <div class="badge badge-primary">
            {{ res.category }}
          </div>

          <p v-for="i in JSON.parse(res.content)">
            {{ i }}
          </p>

          
        </div>
      </div>
    </div>
  </div>
</template>
