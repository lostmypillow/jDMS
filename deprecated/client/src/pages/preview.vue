<script setup>
import { store } from "../store";
import PreviewCard from "../components/PreviewCard.vue";
import PreviewMain from "../components/PreviewMain.vue";
</script>
<template>
  <PreviewMain>
    <PreviewCard :store-location="store.Qualcomm" />
    <PreviewCard :store-location="store.MediaTek" />
    <PreviewCard :store-location="store.Commu" />
    <PreviewCard :store-location="store.Phone" />
    <PreviewCard :store-location="store.Other" />
  </PreviewMain>
</template>
