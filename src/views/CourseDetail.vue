<script setup>
import {useAuthStore} from "../stores/auth";
import {
  initTE, Input, Validation, Select, Button
} from "tw-elements";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import DateRangePicker from 'vue3-daterange-picker'
import {COURSE_LEVEL, COURSE_STATUS} from '../constant/course';
import {useCourseDetailStore} from "../stores/courseDetail";
import {useCategoryStore} from "../stores/category";
import router from "../router";

const route = useRoute()
const courseDetailStore = useCourseDetailStore()
const categoryStore = useCategoryStore()
const courseDetail = ref({
  name: null,
  category_id: null,
  level: null,
  logo: null,
  status: null,
  point: null,
  time_required: null,
  description: null,
  created_at: null,
})
const listCategory = ref({})

onMounted(async () => {
  initTE({Input, Select, Button}, {allowReinits: true});
  await categoryStore.getListCategory();
  Object.assign(listCategory.value, categoryStore.listCategory)
  await courseDetailStore.getCourseDetail(route.params.id);
  Object.assign(courseDetail.value, courseDetailStore.courseDetail)
})

const updateCourse = async () => {
  await courseDetailStore.updateCourse(route.params.id);
  alert('update success')
}

</script>

<template>
  <section>
    <section>
      <h2 class="mb-5 mt-0 text-3xl font-semibold leading-normal text-gray-800 dark:text-gray-200">
        Overview
      </h2>

      <div class="grid grid-cols-12 gap-x-6 gap-y-2 mb-6">
        <div class="flex flex-col items-center row-span-2 col-span-3">
          <label class="text-gray-400 mb-3">Logo</label>
          <img
              src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
              class="w-24 rounded-full"
              alt="Avatar" />
        </div>
        <div class="col-span-3">
          <label class="text-gray-400">Name</label>
          <div class="relative" data-te-input-wrapper-init>
            <input
                type="text"
                v-model="courseDetail.name"
                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput1"/>
          </div>
        </div>
        <div class="col-span-3">
          <label class="text-gray-400">Category</label>
          <select data-te-select-init v-model="courseDetail.category_id">
            <option :value="value.id" v-for="(value) in listCategory">{{ value.name }}</option>
          </select>
        </div>
        <div class="col-span-3">
          <label class="text-gray-400">Level</label>
          <select data-te-select-init v-model="courseDetail.level">
            <option :value="value" v-for="(value,name) in COURSE_LEVEL">{{ ucFirst(name) }}</option>
          </select>
        </div>
        <div class="col-span-3">
          <label class="text-gray-400">Point</label>
          <div class="relative" data-te-input-wrapper-init>
            <input
                type="number"
                min="0"
                v-model="courseDetail.point"
                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput1"/>
          </div>
        </div>
        <div class="col-span-3">
          <label class="text-gray-400">Time Required</label>
          <div class="relative" data-te-input-wrapper-init>
            <input
                type="text"
                v-model="courseDetail.time_required"
                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput1"/>
          </div>
        </div>
        <div class="col-span-3">
          <label class="text-gray-400">Status</label>
          <select data-te-select-init v-model="courseDetail.status">
            <option :value="value" v-for="(value,name) in COURSE_STATUS">{{ ucFirst(name) }}</option>
          </select>
        </div>
        <div class="col-span-12 mt-4">
          <label class="text-gray-400">Description</label>
          <div class="relative" data-te-input-wrapper-init>
           <textarea
               v-model="courseDetail.description"
               class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
               id="exampleFormControlTextarea1"
               rows="7"
               placeholder="Your message"></textarea>
          </div>
        </div>
      </div>


    </section>
    <hr class="mb-5 dark:border-gray-600">
    <section>
      <div class="flex justify-end">
        <button
            type="button"
            class="mr-4 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            @click="updateCourse">
          Update
        </button>
        <button
            @click="router.go(-1)"
            type="button"
            class="rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
          Cancel
        </button>
      </div>
    </section>
  </section>
</template>

<style scoped>

</style>
