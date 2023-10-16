<script setup>
defineProps({
  type: {
    type: String
  },
  width: {
    type: String
  },
})
</script>
<template>
  <svg class="w-4 h-4" v-if="type === 'arrow-start'" :width="width" fill="none" viewBox="0 0 24 24"
       stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
  </svg>
  <svg class="w-4 h-4" v-if="type === 'arrow-end'" :width="width" fill="none" viewBox="0 0 24 24"
       stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"/>
  </svg>
  <svg class="w-4 h-4" v-if="type === 'arrow-left'" :width="width" fill="none" viewBox="0 0 24 24"
       stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
  <svg class="w-4 h-4" v-if="type === 'arrow-right'" :width="width" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
  </svg>
</template>
