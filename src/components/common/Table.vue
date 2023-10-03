<script setup>

import ButtonIcon from "./ButtonIcon.vue";
import LabelStatus from "./LabelStatus.vue";

defineProps({
  dataSource: {
    type: Array
  },
  columns: {
    type: Array,
  },
  checkbox: {
    type: Boolean,
    default: true
  },
  actions: {
    type: Array,
    default: []
  },

})
</script>

<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <slot name="input"/>
      <div class="p-1.5 w-full inline-block align-middle">
        <div class="overflow-auto border rounded-lg">
          <table class="table-auto min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="py-3 pl-4" v-if="checkbox">
                <div class="flex items-center h-5">
                  <input
                      id="checkbox-all"
                      type="checkbox"
                      class="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                  />
                  <label
                      for="checkbox"
                      class="sr-only"
                  >
                    Checkbox
                  </label>
                </div>
              </th>
              <th
                  scope="col"
                  class="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase"
                  v-for="item in columns"
              >
                {{ item.title }}
              </th>
              <th
                  scope="col"
                  class="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase"
                  v-if="actions.length > 0"
              >
                Action
              </th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
            <tr v-for="(item,index) in dataSource">
              <td class="py-3 pl-4" v-if="checkbox">
                <div class="flex items-center h-5">
                  <input
                      type="checkbox"
                      class="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                  />
                  <label
                      for="checkbox"
                      class="sr-only"
                  >
                    Checkbox
                  </label>
                </div>
              </td>
              <td
                  class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap text-center"
                  v-for="itemHeader in columns"
              >
                <template v-if="itemHeader.dataIndex==='stt'">
                  {{ index + 1 }}
                </template>
                <template v-else-if="itemHeader.dataIndex==='logo'">
                  <img width="40" :src="item.logo" alt="">
                </template>
                <template v-else-if="itemHeader.dataIndex==='status'">
                  <LabelStatus :type="item.status.toLowerCase()">{{ item.status }}</LabelStatus>
                </template>
                <template v-else>
                  {{ item[itemHeader.dataIndex] }}
                </template>
              </td>
              <td class="px-6 py-4">
                <RouterLink class="flex justify-center" to="/">
                  <ButtonIcon :type="'edit'"></ButtonIcon>
                </RouterLink>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>