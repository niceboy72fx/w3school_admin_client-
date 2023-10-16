<script setup>

import Icon from "../icons/Icon.vue";
import {computed, watch, ref} from "vue";

const emit = defineEmits(['change', 'changePerPage'])
const props = defineProps({
  maxVisibleButtons: {
    type: Number,
    required: false,
    default: 5
  },
  total: {
    type: Number,
  },
  currentPage: {
    type: Number,
  },
  perPage: {
    type: Number,
  },
})
const totalPages = computed(() => Math.ceil(props.total / props.perPage))
const maxButton = ref(Math.min(props.maxVisibleButtons, totalPages.value))
const startPage = computed(() => {
  if (totalPages.value === props.maxVisibleButtons){
    maxButton.value = props.maxVisibleButtons
    return 1;
  }
  if (props.currentPage < props.maxVisibleButtons - 1) {
    maxButton.value = props.maxVisibleButtons - 1
    return 1;
  }
  if (totalPages.value - props.currentPage < props.maxVisibleButtons - 1) {
    maxButton.value = props.maxVisibleButtons - 1
    return totalPages.value - props.maxVisibleButtons + 2;
  }
  maxButton.value = props.maxVisibleButtons - 2
  return props.currentPage - 1;
})

const pages = computed(() => {
  const range = [];
  for (let i = startPage.value; i <= Math.min(startPage.value + maxButton.value - 1, totalPages.value); i += 1) {
    range.push({name: i, isDisabled: i === props.currentPage});
  }
  return range;
})

const onClickFirstPage = () => emit('change', 1)
const onClickPreviousPage = () => emit('change', props.currentPage - 1)
const onClickPage = (page) => emit('change', page)
const onClickNextPage = () => emit('change', props.currentPage + 1)
const onClickLastPage = () => emit('change', totalPages.value)

</script>

<template>
  <nav class="mt-5 flex items-center justify-between text-sm" aria-label="Page navigation example">
    <div class="flex items-center">
      <label class="mr-4">Rows per page</label>
      <div class="mr-4  w-2/12">
        <select data-te-select-init @change="$emit('changePerPage', $event.target.value)">
          <option value=10 :selected="perPage === 10">10</option>
          <option value=20 :selected="perPage === 20">20</option>
          <option value=50 :selected="perPage === 50">50</option>
        </select>
      </div>
      <label>
        Showing <strong>{{ (currentPage - 1) * perPage + 1 }}-{{ Math.min(currentPage * perPage, total) }}</strong> of
        <strong>{{ total }}</strong>
      </label>
    </div>

    <ul class="list-style-none flex">
      <li>
        <button
            class="relative block rounded bg-transparent px-3 py-2 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            @click="onClickFirstPage" :disabled="currentPage === 1">
          <Icon type="arrow-start"/>
        </button>
      </li>
      <li>
        <button
            class="relative block rounded bg-transparent px-3 py-2 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            @click="onClickPreviousPage" :disabled="currentPage === 1">
          <Icon type="arrow-left"/>
        </button>
      </li>
      <li>
        <button
            v-if="currentPage > maxButton"
            :disabled="true"
            class="relative block rounded bg-transparent px-3 py-2 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white">
          ...
        </button>
      </li>
      <li v-for="page in pages" :key="page.name">
        <button
            @click="onClickPage(page.name)" :disabled="page.isDisabled"
            :class=" currentPage === page.name ? 'bg-blue-100 font-medium text-blue-700':'text-neutral-600 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'"
            class="relative block rounded px-3 py-2 text-sm transition-all duration-300"
        >
          {{ page.name }}
        </button>
      </li>
      <li>
        <button
            v-if="props.currentPage < totalPages - maxButton"
            :disabled="true"
            class="relative block rounded bg-transparent px-3 py-2 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white">
          ...
        </button>
      </li>
      <li>
        <button
            class="relative block rounded bg-transparent px-3 py-2 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            @click="onClickNextPage" :disabled="currentPage === totalPages">
          <Icon type="arrow-right"/>
        </button>
      </li>
      <li>
        <button
            class="relative block rounded bg-transparent px-3 py-2 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            @click="onClickLastPage" :disabled="currentPage === totalPages">
          <Icon type="arrow-end"/>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

</style>