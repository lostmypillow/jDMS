<script setup>
const { data } = await useFetch("/api/hello");


//script from import
const isStandby = ref(true);
const isLoading = ref(false);
const isSuccess = ref(false);
const inputLinks = ref("");
const outputLinks = ref();
const errorMsg = ref("");

</script>
<template>
  <!-- <p>i am home</p>
  <pre>{{ data }}</pre> -->



</template>
