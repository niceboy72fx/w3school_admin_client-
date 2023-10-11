<script setup>
import {course, listNavigation} from "../constant/navigation";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import {useAuthStore} from "../stores/auth";

const {user} = useAuthStore()
</script>

<template>
  <div class="my-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div class="p-6 bg-white border-b border-gray-200">
          <div class="w-full">
            <nav class="border-b text-sm flex justify-start">
              <template v-for="item in course">
                <RouterLink class="tab-link" active-class="active" v-show="user.permissions.includes(item.key)" :to="{name: item.route_name}">
                  {{ item.value }}
                </RouterLink>
              </template>
            </nav>
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.tab-link {
  @apply inline-block px-4 py-2;

  &:not(.active) {
    @apply text-gray-700 hover:text-black;
  }

  &.active {
    @apply border-b-2 border-indigo-600 text-indigo-600 font-semibold;
  }
}
</style>
