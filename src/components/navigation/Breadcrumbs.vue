<script setup>
import {useRoute} from "vue-router";
import {computed} from "vue";

const route = useRoute()
const breadcrumbs = computed(() => {
  const crumbs = [];
  console.log(1,route)
  for (const matched of route.matched) {
    if (matched.meta.breadcrumb) {
      crumbs.push({name: '>',})
      crumbs.push({
        name: matched.meta.breadcrumb,
        routeName: matched.name,
      });
    }
  }
  return crumbs;
});
</script>

<template>
  <nav class="bg-grey-light w-full rounded-md mb-6">
    <ol class="list-reset flex">
      <li>
        <RouterLink :to="{name:'dashboard'}">
          <img src="../../assets/home.svg" alt="" width="24">
        </RouterLink>
      </li>
      <li v-for="crumb in breadcrumbs">
        <RouterLink
            v-if="crumb.routeName"
            active-class="active" :to="{name: crumb.routeName}"
            class="breadcrumb"
        >{{ crumb.name }}
        </RouterLink>
        <span v-else class="mx-2 text-neutral-500 dark:text-neutral-400">{{ crumb.name }}</span>
      </li>
    </ol>
  </nav>
  <h2 class="text-3xl font-semibold leading-normal text-primary">
    {{route.meta.breadcrumb}}
  </h2>
</template>

<style scoped>
.breadcrumb {
  @apply text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600
}

.active {
  @apply text-neutral-500 dark:text-neutral-400
}
</style>
