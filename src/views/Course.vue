<script setup>
import {useAuthStore} from "../stores/auth";
import {
  initTE, Input, Validation, Select, Button
} from "tw-elements";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import DateRangePicker from 'vue3-daterange-picker'
import {COURSE_LEVEL, COURSE_STATUS} from '../constant/course';

const dataRange = ref({})
onMounted(() => {
  initTE({Input, Select, Button}, {allowReinits: true});
})

const route = useRoute()
const {user} = useAuthStore()

const tabs = [
  {
    title: 'Approved',
    name: 'course_approved',
  },
  {
    title: 'Pending',
    name: 'course_pending',
  },
  {
    title: 'Rejected',
    name: 'course_rejected',
  }
]
</script>

<template>
  <ul
      class="mb-6 flex list-none flex-row flex-wrap border-b-0 pl-0">
    <li v-for="tab in tabs">
      <RouterLink
          :to="{name:tab.name}"
          class="tab-link"
          active-class="active"
      >{{ tab.title }}
      </RouterLink>
    </li>
  </ul>
  <RouterView></RouterView>

</template>

<style scoped>
.tab-link {
  @apply inline-block px-4 py-2;

  &:not(.active) {
    @apply text-gray-700 hover:text-black;
  }

  &.active {
    @apply border-b-2 border-primary text-primary;
  }
}

</style>
