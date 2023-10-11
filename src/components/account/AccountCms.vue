<script async setup>

import {useUserStore} from "../../stores/user";
import Account from "../../views/Account.vue";
import Table from "../common/Table.vue";
import {mapUserStatus, mapUserRoles} from "../../constant";
import {USER_STATUS} from "../../constant/userStatus";

const userStore = useUserStore();

function ucFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
await userStore.getListAccountCms()
const dataSource = userStore.listAccountCms.map(function (user) {
  user.status = mapUserStatus(user.status)
  user.roles = mapUserRoles(user.roles)
  return user
})
const colums = [
  {
    title: 'STT',
    dataIndex: 'stt',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Roles',
    dataIndex: 'roles',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
  },
]

const actions = ['edit']
</script>

<template>
    <Table
        :columns="colums"
        :dataSource="dataSource"
        :actions="actions"
    >
      <template #input>
        <div class="py-3 pl-2 grid grid-cols-5 gap-12">
          <div class="relative col-span-2">
            <label for="hs-table-search" class="sr-only">
              Search
            </label>
            <input
                name="search"
                class="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >
            <div
                class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div class="">
            <label for="hs-select-label" class="block text-sm font-medium mb-2 dark:text-white">Roles</label>
            <select id="hs-select-label" class="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                <option selected disabled>Choose a status</option>
              <option v-for="(status,name) in USER_STATUS" :value="status">{{ ucFirst(name) }}</option>
            </select>
          </div>
          <div class="">
            <label for="hs-select-label" class="block text-sm font-medium mb-2 dark:text-white">Status</label>
            <select id="hs-select-label" class="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
              <option selected disabled>Choose a status</option>
              <option v-for="(status,name) in USER_STATUS" :value="status">{{ ucFirst(name) }}</option>
            </select>
          </div>
        </div>
      </template>
    </Table>
</template>

<style scoped>

</style>