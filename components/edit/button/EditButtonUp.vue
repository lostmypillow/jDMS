<script setup>
import { store } from '~/store';
const props = defineProps(['category', 'priority'])

</script>

<template>
  <v-btn
              @click="store.swapPriorities(props.category, props.priority, 'up')"
              icon="mdi-arrow-up"
              size="small"
              :disabled="props.priority == 1"
            >
            </v-btn>
</template>