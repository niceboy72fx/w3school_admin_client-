<script async setup>

import {mapLessonStatus} from "../constant";
import DateRangePicker from "vue3-daterange-picker";
import Pagination from "../components/common/Pagination.vue";
import {onMounted, ref} from "vue";
import {Button, Datatable, initTE, Input, Select} from "tw-elements";
import helper from "../plugins/helper";
import {useCourseStore} from "../stores/course";
import {useTopicStore} from "../stores/topic";
import {useLessonStore} from "../stores/lesson";
import {topic} from "../constant/navigation";
import {LESSON_STATUS} from "../constant/lesson";

const courseStore = useCourseStore()
const topicStore = useTopicStore()
const lessonStore = useLessonStore()
const formData = ref({
  course_id: null,
  topic_id: null,
  keyword: '',
  status: '',
  page: 1,
  perPage: 10,
  range: {
    startDate: null,
    endDate: null
  },
})

const pagination = ref({
  currentPage: 1,
  perPage: 10,
  total: null,
})

const data = ref({
  columns: [
    {label: "STT", field: "stt"},
    {label: "Name", field: "name"},
    {label: "Created At", field: "created_at", sort: false},
    {label: "Status", field: "status", format: formatLessonStatus},
    {label: "Action", field: "action", sort: false},
  ],
  rows: [],
});


onMounted(async () => {
  initTE({Datatable, Input, Select, Button}, {allowReinits: true});
  const datatable = document.getElementById('datatable');
  await courseStore.getListCourse()

  // const response = await lessonStore.getListLessonWithPagination()
  // Object.assign(pagination.value, {
  //   currentPage: response.current_page,
  //   perPage: response.per_page,
  //   total: response.total
  // })
  // Object.assign(formData.value, {page: response.current_page, perPage: response.per_page})
  // data.value.rows = lessonStore.listLesson.map((topic, index) => {
  //   topic.stt = ((pagination.value.currentPage - 1) * pagination.value.perPage) + index + 1
  //   topic.status = mapLessonStatus(topic.status)
  //   return topic
  // })
  const setActions = () => {
    document.querySelectorAll(".lock-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        console.log(btn.attributes["data-te-row-id"].value)
        // router.push({name: 'course_detail', params: {type: 'approved', id: btn.attributes["data-te-row-id"].value}})
      });
    });
  };

  datatable.addEventListener("render.te.datatable", setActions);
  const myDatatable = new Datatable(datatable, formatData(data.value));
  // const hideAlert = setTimeout(() => {courseDetailStore.statusUpdate = false}, 4000);
})
const handleCourseID = async () => {
  await topicStore.getListTopic(formData.value.course_id)
}
async function getListLessonWithPagination() {
  const response = await lessonStore.getListLessonWithPagination(helper.toQueryString(formData.value))
  Object.assign(pagination.value, {currentPage: response.current_page, perPage:response.per_page, total: response.total})
  data.value.rows = lessonStore.listLesson.map((lesson, index) => {
    lesson.stt = ((pagination.value.currentPage - 1) * pagination.value.perPage) + index + 1
    lesson.status = mapLessonStatus(lesson.status)
    return lesson
  })
  datatable.innerHTML = ''
  new Datatable(datatable, formatData(data.value));
}

function updateDateRange(data) {
  formData.value.range.startDate = data.startDate.toISOString()
  formData.value.range.endDate = data.endDate.toISOString()
}

function formatLessonStatus(cell, value) {
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
        action:
            `
        <a
          type="button"
          data-te-ripple-init
          data-te-ripple-color="light"
          href="/lesson/${row.id}"
          class="edit-btn cursor-pointer inline-block rounded-full border border-primary bg-primary text-white p-1.5 uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
         <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke-width="1.3" stroke="#3B71CA" class="w-4 h-4">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </a>`
//             `
//             <a
//               type="button"
//               data-te-ripple-init
//               data-te-ripple-color="light"
//               data-te-row-id="${row.id}"
//               class="lock-btn cursor-pointer inline-block rounded-full border border-red-500 bg-red-500 text-white p-1.5 uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
//               <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="10"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
//             </a>
// `,
      };
    }),
  }
}

function reset() {
  formData.value.course_id = null
  formData.value.keyword = ''
  formData.value.roles = []
  formData.value.status = ''
  formData.value.range.startDate = null
  formData.value.range.endDate = null
}

</script>

<template>
  <div class="grid grid-cols-12 gap-x-6 gap-y-2 mb-6">
    <label class="text-gray-400 col-span-3">Course</label>
    <label class="text-gray-400 col-span-3">Topic</label>
    <label class="text-gray-400 col-span-3">Search</label>
    <label class="text-gray-400 col-span-3">Created at</label>
    <div class="col-span-3">
      <select data-te-select-init data-te-select-filter="true" v-model="formData.course_id" @change="handleCourseID">
        <option :value="null">Choose a course</option>
        <option v-for="course in courseStore.listAll" :value="course.id">{{ course.name }}</option>
      </select>
    </div>
    <div class="col-span-3">
      <select data-te-select-init data-te-select-filter="true" v-model="formData.topic_id" :disabled="!formData.course_id">
        <option :value="null">Choose a topic</option>
        <option v-for="topic in topicStore.listTopic" :value="topic.id">{{ topic.name }}</option>
      </select>
    </div>
    <div class="relative col-span-3" data-te-input-wrapper-init>
      <input
          type="text"
          v-model="formData.keyword"
          class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          id="exampleFormControlInput1"
          placeholder="Type something to search..."/>
    </div>
    <div class="col-span-3">
      <DateRangePicker :date-range="formData.range" :auto-apply="true" @update:model-value="updateDateRange"/>
    </div>
    <label class="text-gray-400 col-span-3">Status</label>
    <div class="col-span-3 col-start-1">
      <select data-te-select-init v-model="formData.status">
        <option :value="null" selected>Choose a status</option>
        <option :value="value" v-for="(value,name) in LESSON_STATUS">{{ ucFirst(name) }}</option>
      </select>
    </div>
    <div class="col-span-2">
      <button
          type="button"
          class="rounded px-3 mr-4 bg-primary pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          @click="getListLessonWithPagination()">
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
        :to="{name: 'lesson_add', query: formData.topic_id ? { course_id: formData.course_id, topic_id: formData.topic_id } : {}}"
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
              @change="(page) => {formData.page = page; getListLessonWithPagination();}"
              @changePerPage="(perPage) => {formData.perPage = perPage; getListLessonWithPagination()}"/>

</template>

<style scoped>
.vue-daterange-picker {
  display: block;
}
</style>