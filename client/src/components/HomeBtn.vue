<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
</script>
<template>
<li>
    <a
      @click="router.push('/')"
      class="btn btn-ghost text-xl hidden lg:flex"
      >JDMS</a
    >
</li></template>