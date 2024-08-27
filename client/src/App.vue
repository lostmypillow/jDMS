<script setup>
import { useRouter } from "vue-router";
import { store } from "./store";
import { computed, onMounted, ref } from "vue";
const router = useRouter();
import axios from "axios";
const results = ref();
const cv = ref()
import { convertList } from "../lib/convertList";
const nc = ref(store.newsContents);
const whata = computed(() => {
  const groupedByCategory = nc.value.reduce((acc, article) => {
    if (!article.category) return acc;

    const category = article.category;
    const item = {
      id: article.id,
      title: article.title || "No Title",
      category: category,
      link: article.link,
    };

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(item);

    return acc;
  }, {});
  return groupedByCategory;
});

async function getData() {
  const response = await axios.get("http://localhost:3002/news/get");
  console.log(response);
  results.value = response.data;
  store.newsContents = response.data;
  store.newsContentsByCat =  convertList(store.newsContents)

}

onMounted(async () => {
  await getData();
});
</script>

<template>
  <div class="flex flex-col h-screen">
    <!-- Navbar -->
    <div class="navbar bg-base-100 lg:hidden">
      <div class="flex-none">
        <label for="my-drawer-2" class="btn btn-square drawer-button lg:hidden">
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
            class="feather feather-menu"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </label>
      </div>
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">JDMS</a>
      </div>

      <div class="flex-none">
        <button class="btn btn-primary">Export</button>
      </div>
    </div>

    <!-- Main content area with drawer and RouterView -->
    <div class="flex flex-1">
      <!-- Drawer -->
      <div class="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col p-4 gap-4">
          <!-- RouterView will be displayed here -->
          <RouterView></RouterView>
        </div>
        <div class="drawer-side">
          <label
            for="my-drawer-2"
            aria-label="close sidebar"
            class="drawer-overlay"
          ></label>
          <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <!-- Sidebar content here -->
            <li>
              <a
                @click="router.push('/')"
                class="btn btn-ghost text-xl hidden lg:flex"
                >JDMS</a
              >
            </li>
            <li>
              <a class="btn btn-primary" @click="router.push('/import')"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-plus"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line></svg
                >Import Links</a
              >
            </li>
            <li>
              <button class="btn" @click="console.log(whata)">get</button>
            </li>
            <!-- <li>{{ convertList(store.newsContents) }}</li> -->
             <li>{{ store.newsContentsByCat }}</li>
            <li v-for="key in Object.keys(store.newsContentsByCat)">
              <h2 class="menu-title">{{ key }}</h2>
              <ul>
                <li v-for="s in store.newsContentsByCat[key]">
                  <a @click="router.push(`edit/${s.id}`)">
                    {{ s.id }}. {{ s.title }}
                  </a>
                </li>
              </ul>
            </li>

            <ul></ul>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
