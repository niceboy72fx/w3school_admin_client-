<script setup>
import {useRoute, RouterView} from 'vue-router'
import {computed} from "vue";

const route = useRoute();
const layout = computed(() => {
  return route?.meta?.layout;
});
</script>

<template>
  <RouterView/>
</template>

<style scoped>
</style>
