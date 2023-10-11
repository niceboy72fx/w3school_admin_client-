<script setup>
import {account} from "../constant/navigation";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import {useAuthStore} from "../stores/auth";

const {user} = useAuthStore()
</script>

<template>
  <div class="w-full">
    <nav class="text-sm flex justify-start">
      <template v-for="item in account">
        <RouterLink class="tab-link" active-class="active" v-show="user.permissions.account.view"
                    :to="{name: item.route_name}">
          {{ item.value }}
        </RouterLink>
      </template>
    </nav>
    <Suspense>
      <RouterView></RouterView>
    </Suspense>
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
