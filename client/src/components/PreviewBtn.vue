<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

</script>
<template>
    <li>
  <a class="btn btn-secondary" @click="router.push('/preview')">Preview</a>
</li>
</template>