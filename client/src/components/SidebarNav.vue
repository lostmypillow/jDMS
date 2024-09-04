<script setup>
import { useRoute, useRouter } from "vue-router";
import CustomSVG from "./customSVG.vue";

const navPlaces = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Import",
    link: "/import",
  },
  {
    name: "Preview",
    link: "/preview",
  },
  {
    name: "Export",
    link: "/export",
  },
];

const router = useRouter();
const route = useRoute();
</script>
<template>
  <li v-for="place in navPlaces">
    <a
      @click="router.push(place.link)"
      :class="route.path == place.link ? 'btn btn-primary' : 'btn'"
    >
      <CustomSVG :type="place.name" />
      {{ place.name }}</a
    >
  </li>
  <li>
    <a class="btn" @click="router.go()">
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
        class="feather feather-refresh-ccw"
      >
        <polyline points="1 4 1 10 7 10"></polyline>
        <polyline points="23 20 23 14 17 14"></polyline>
        <path
          d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"
        ></path></svg
      >Refresh Page</a
    >
  </li>
</template>
