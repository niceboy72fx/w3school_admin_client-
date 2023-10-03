<script setup>
defineProps({
  type: {
    type: String,
    required: true,
  }
})
</script>
<template>
  <label :class="type">
    <slot/>
  </label>
</template>

<style scoped>
.pending {
  @apply text-yellow-500
}
.active {
  @apply text-green-500
}
.pause {
  @apply text-yellow-500
}
.inactive {
  @apply text-gray-500
}
.rejected {
  @apply text-red-500
}
</style>