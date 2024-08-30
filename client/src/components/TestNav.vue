<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter()
const route = useRoute()
// const editRouteRegex = /^\/edit\/\d+$/;
// const isRoute = ref(editRouteRegex.test(route.path))
</script>
<template>
  <div class="navbar bg-base-300 w-full">
    <div class="flex-none lg:hidden">
      <label
        for="my-drawer-3"
        aria-label="open sidebar"
        class="btn btn-square btn-ghost"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block h-6 w-6 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </label>
    </div>
    <div class="mx-2 flex-1 px-2">
    <a v-if="route.path.startsWith('/edit')" @click="router.push('/preview')"  class="btn"><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-arrow-left"
      >
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline></svg
      >Back to Preview</a>
      <a v-else @click="router.push('/')" class="btn text-3xl font-bold">JDMS</a>
      <span v-if="route.path == '/import'">Import</span>
      <span  v-if="route.path == '/preview'">Preview</span>
      <span v-if="route.path.startsWith('/edit')">Edit {{ route.params.id }}</span>
    </div>
    <div class="hidden flex-none lg:block">
      <ul class="menu menu-horizontal">
        <li>
          <a class="btn" @click="router.push('/import')"> Import Links </a>
        </li>
        <li>
          <a class="btn btn-primary" @click="router.push('/preview')">
            Preview
          </a>
        </li>
        <li>
          <a class="btn" @click="router.push('/export')"> Export </a>
        </li>
      </ul>
    </div>
  </div>
</template>
