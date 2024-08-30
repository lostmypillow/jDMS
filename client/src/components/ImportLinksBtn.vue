<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
</script>
<template>
    <li>
    <a class="btn btn-primary" @click="router.push('/import')"
                >Import Links</a
              ></li>
</template>