<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()
</script>
<template>
    <div>
    <!-- The current route is accessible as $route in the template -->
    User {{ route.params.id }}
  </div>
</template>