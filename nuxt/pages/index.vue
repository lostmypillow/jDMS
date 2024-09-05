<script setup>
const { data } = await useFetch("/api/hello");
</script>
<template>
  <p>i am home</p>
  <pre>{{ data }}</pre>
</template>
