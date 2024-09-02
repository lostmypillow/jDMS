<script setup>
const props = defineProps(["storeLocation"]);

import { useRouter } from "vue-router";

const router = useRouter();
</script>
<template>
    
  <div
    class="flex card bg-neutral text-neutral-content w-full shadow-xl my-4"
    v-for="res in props.storeLocation"
    :id="res.id"
  >
    <div class="card-body">
      <div class="card-title flex flex-row items-center justify-between">
        <h2>{{ res.title }}</h2>
        <div class="flex gap-4">
          <!-- 
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
              ></path>
            </svg>
            Edit
          </a> -->
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

      <p v-html="res.content"></p>
    </div>
    <div class="flex card-actions p-8 justify-end">
    
    </div>
  </div>
</template>
