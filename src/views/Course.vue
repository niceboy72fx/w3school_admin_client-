<script setup>
import {course, listNavigation} from "../constant/navigation";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import {useAuthStore} from "../stores/auth";
import {
  initTE, Input, Validation, Select, Button
} from "tw-elements";
import {onMounted} from "vue";
import {useRoute} from "vue-router";
import DateRangePicker from 'vue2-daterange-picker'
onMounted(() => {
  initTE({Input, Select, Button }, {allowReinits: true});
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
      class="mb-4 flex list-none flex-row flex-wrap border-b-0 pl-0">
    <li v-for="tab in tabs">
      <RouterLink
          :to="{name:tab.name}"
          class="tab-link"
          active-class="active"
      >{{ tab.title }}
      </RouterLink>
    </li>
  </ul>
  <div class="grid grid-cols-4 gap-4">
    <div class="relative mb-3" data-te-input-wrapper-init>
      <input
          type="text"
          class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          id="exampleFormControlInput1"
          placeholder="Example label" />
      <label
          for="exampleFormControlInput1"
          class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
      >Search
      </label>
    </div>
    <select data-te-select-init>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
      <option value="4">Four</option>
      <option value="5">Five</option>
      <option value="6">Six</option>
      <option value="7">Seven</option>
      <option value="8">Eight</option>
    </select>
    <date-range-picker
        ref="picker"
        :opens="opens"
        :locale-data="{ firstDay: 1, format: 'dd-mm-yyyy HH:mm:ss' }"
        :minDate="minDate" :maxDate="maxDate"
        :singleDatePicker="singleDatePicker"
        :timePicker="timePicker"
        :timePicker24Hour="timePicker24Hour"
        :showWeekNumbers="showWeekNumbers"
        :showDropdowns="showDropdowns"
        :autoApply="autoApply"
        v-model="dateRange"
        @update="updateValues"
        @toggle="logEvent('event: open', $event)"
        @start-selection="logEvent('event: startSelection', $event)"
        @finish-selection="logEvent('event: finishSelection', $event)"
        :linkedCalendars="linkedCalendars"
        :dateFormat="dateFormat"
    >
      <template v-slot:input="picker" style="min-width: 350px;">
        {{ picker.startDate | date }} - {{ picker.endDate | date }}
      </template>
    </date-range-picker>
    <button
        type="button"
        class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
      Button
    </button>
  </div>

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
