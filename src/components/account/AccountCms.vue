<script async setup>

import {useUserStore} from "../../stores/user";
import {mapUserStatus, mapUserRoles, mapCourseStatus, mapCourseLevel} from "../../constant";
import {USER_ROLES_CMS, USER_STATUS} from "../../constant/user";
import DateRangePicker from "vue3-daterange-picker";
import Pagination from "../common/Pagination.vue";
import {onMounted, ref} from "vue";
import {Button, Datatable, initTE, Input, Select} from "tw-elements";
import helper from "../../plugins/helper";

const userStore = useUserStore();
const formData = ref({
  keyword: '',
  roles: [],
  status: null,
  range: {
    startDate: null,
    endDate: null
  },
  page: 1,
  perPage: 2,
})

const pagination = ref({
  currentPage: 1,
  perPage: 2,
  total: null,
})

const data = ref({
  columns: [
    {label: "STT", field: "stt"},
    {label: "Name", field: "name"},
    {label: "Email", field: "email"},
    {label: "Roles", field: "roles"},
    {label: "Created At", field: "created_at", sort: false},
    {label: "Status", field: "status", format: formatUserStatus},
    {label: "Action", field: "action", sort: false},
  ],
  rows: [],
});


onMounted(async () => {
  initTE({Datatable, Input, Select, Button}, {allowReinits: true});
  const datatable = document.getElementById('datatable');
  const response = await userStore.getListAccountCms()
  Object.assign(pagination.value, {
    currentPage: response.current_page,
    perPage: response.per_page,
    total: response.total
  })
  Object.assign(formData.value, {page: response.current_page, perPage: response.per_page})
  data.value.rows = userStore.listAccountCms.map((user, index) => {
    user.stt = ((pagination.value.currentPage - 1) * pagination.value.perPage) + index + 1
    user.status = mapUserStatus(user.status)
    user.roles = mapUserRoles(user.roles)
    return user
  })
  const setActions = () => {
    // document.querySelectorAll(".edit-approve-btn").forEach((btn) => {
    //   btn.addEventListener("click", () => {
    //     router.push({name: 'course_detail', params: {type: 'approved', id: btn.attributes["data-te-id"].value}})
    //   });
    // });
  };

  datatable.addEventListener("render.te.datatable", setActions);
  const myDatatable = new Datatable(datatable, formatData(data.value));
  // const hideAlert = setTimeout(() => {courseDetailStore.statusUpdate = false}, 4000);
})

async function getListAccountCms() {
  console.log(formData.value)
  const response = await userStore.getListAccountCms(helper.toQueryString(formData.value))
  Object.assign(pagination.value, {currentPage: response.current_page, perPage:response.per_page, total: response.total})
  data.value.rows = userStore.listAccountCms.map((user, index) => {
    user.stt = ((pagination.value.currentPage - 1) * pagination.value.perPage) + index + 1
    user.status = mapUserStatus(user.status)
    user.roles = mapUserRoles(user.roles)
    return user
  })
  datatable.innerHTML = ''
  new Datatable(datatable, formatData(data.value));
}

function updateDateRange(data) {
  formData.value.range.startDate = data.startDate.toISOString()
  formData.value.range.endDate = data.endDate.toISOString()
}

function formatUserStatus(cell, value) {
  let color = '#black'
  switch (value.toLowerCase()) {
    case 'active':
      color = 'rgb(34 197 94)'
      break;
    case 'inactive':
      color = 'rgb(239 68 68)'
      break;
  }
  cell.innerHTML = "<label style=' color: " + color + "'" + value.toLowerCase() + ">" + value + "</label>"
}

function formatData(data) {
  return {
    columns: data.columns,
    rows: data.rows.map((row) => {
      return {
        ...row,
        action: `
            <a
              type="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              href="/account/${row.id}"
              class="edit-btn cursor-pointer inline-block rounded-full border border-primary bg-primary text-white p-1.5 uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
             <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke-width="1.3" stroke="#3B71CA" class="w-4 h-4">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </a>`
//             +`
//             <a
//               type="button"
//               data-te-ripple-init
//               data-te-ripple-color="light"
//               data-te-id=${row.id}
//               class="delete-btn cursor-pointer inline-block rounded-full border border-red-500 bg-red-500 text-white p-1.5 uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
//                          <svg class="w-4 h-4" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="white" stroke-width="10" stroke="white">
//               <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//               <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
//               <g id="SVGRepo_iconCarrier">
//                 <path d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"></path>
//               </g>
//             </svg>
//             </a>
// `,
      };
    }),
  }
}

function reset() {
  formData.value.keyword = ''
  formData.value.roles = []
  formData.value.status = ''
  formData.value.range.startDate = null
  formData.value.range.endDate = null
}
</script>

<template>
  <div class="grid grid-cols-12 gap-x-6 gap-y-2 mb-6">
    <label class="text-gray-400 col-span-4">Search</label>
    <label class="text-gray-400 col-span-3">Roles</label>
<!--    <label class="text-gray-400 col-span-3">Created at</label>-->
    <label class="text-gray-400 col-span-3">Status</label>
    <div class="relative col-span-4" data-te-input-wrapper-init>
      <input
          type="text"
          v-model="formData.keyword"
          class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          id="exampleFormControlInput1"
          placeholder="Type something to search..."/>
    </div>
    <div class="col-span-3">
      <select data-te-select-init multiple data-te-select-placeholder="Choose some roles" v-model="formData.roles">
        <option value="1">Admin</option>
        <option value="2">Editor</option>
      </select>
    </div>
<!--    <div class="col-span-3">-->
<!--      <DateRangePicker :date-range="formData.range" :auto-apply="true" @update:model-value="updateDateRange"/>-->
<!--    </div>-->
    <div class="col-span-3">
      <select data-te-select-init v-model="formData.status">
        <option :value="null" selected>Choose a status</option>
        <option :value="value" v-for="(value,name) in USER_STATUS">{{ ucFirst(name) }}</option>
      </select>
    </div>
    <div class="col-span-2">
      <button
          type="button"
          class="rounded px-3 mr-4 bg-primary pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          @click="getListAccountCms">
        Search
      </button>
      <button
          @click="reset"
          type="button"
          class="rounded px-3 bg-primary-100 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200">
        Reset
      </button>
    </div>
  </div>
  <div class="mt-3">
    <RouterLink
        :to="{name: 'account_add'}"
        type="button"
        class="rounded px-5 mr-4 bg-primary pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
      Add
    </RouterLink>
  </div>

  <div
      id="datatable"
      data-te-fixed-header="true"
      data-te-striped="true"
      data-te-pagination="false">
  </div>
  <Pagination :currentPage="pagination.currentPage" :total="pagination.total" :perPage="pagination.perPage"
              @change="(page) => {formData.page = page; getListAccountCms();}"
              @changePerPage="(perPage) => {formData.perPage = perPage; getListAccountCms()}"/>

</template>

<style scoped>
.vue-daterange-picker {
  display: block;
}
</style>