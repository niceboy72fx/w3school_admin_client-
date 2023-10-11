<script setup>
import Navigation from "../components/navigation/Navigation.vue";
import Breadcrumbs from "../components/navigation/Breadcrumbs.vue";

</script>

<template>
  <Navigation/>
  <main class="xl:pl-60 m-6 mt-20">
      <div
          class="max-w-[540px] sm:max-w-[604px] md:max-w-[720px] lg:max-w-[972px] xl:max-w-full xl:px-12 2xl:max-w-[1400px] mx-auto flex">
        <div class="flex w-full flex-col">
            <div class="lg:w-11/12 flex w-full flex-col px-3">
              <Breadcrumbs/>
              <hr class="my-6 dark:border-neutral-600">
              <RouterView></RouterView>
            </div>
        </div>
      </div>
    </main>
</template>

<style>

</style>

