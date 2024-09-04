<script setup>


import { useClipboard } from "@vueuse/core";
import { batchFormatData } from "../../lib/formatData";
import { store } from "../store";
const { text, copy, copied, isSupported } = useClipboard();
const allContent  = [...store.Qualcomm, ...store.MediaTek, ...store.Commu, ...store.Phone, ...store.Other]
</script>
<template>
  <div class="flex flex-row items-center justify-between">
    <div class="flex flex-col">
      <button class="btn btn-primary" @click="copy(batchFormatData(allContent))">
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
        <span v-if="!copied">Copy All</span>
        <span v-else>Copied All!</span>
      </button>
      <slot></slot>
    </div>
  </div>
</template>
