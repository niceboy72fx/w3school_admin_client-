<script setup>
import {useAuthStore} from "../stores/auth";
import {
  initTE, Input, Validation, Select, Button
} from "tw-elements";
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import DateRangePicker from 'vue3-daterange-picker'
import {COURSE_LEVEL} from '../constant/course';
import {useCategoryStore} from "../stores/category";
import {useCourseStore} from "../stores/course";
import router from "../router";

const route = useRoute()
const categoryStore = useCategoryStore()
const courseStore = useCourseStore()
const formData = ref({
  name: null,
  category_id: 1,
  logo: 'http://localhost/storage/course/default.svg',
  level: 1,
  point: 0,
  time_required: 0,
  description: null,
})
const listCategory = ref({})
const urlLogoFile = computed(() => { return typeof(formData.value.logo) === 'object' ? URL.createObjectURL(formData.value.logo) : formData.value.logo})

onMounted(async () => {
  initTE({Input, Select, Button}, {allowReinits: true});
  await categoryStore.getListCategory();
  Object.assign(listCategory.value, categoryStore.listCategory)
})

const addCourse = async () => {
  await courseStore.addCourse(formData.value);
  await router.push({name: 'course_pending'})
}

const onFileChange = ($event) => {
  formData.value.logo = $event.target.files[0]
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
          <div class="flex relative">
            <img
                :src="urlLogoFile"
                class="w-24 rounded-full"
                alt="Avatar"/>
            <label
                   class="btn-upload w-24 h-24 rounded-full absolute flex justify-center items-end opacity-0 transition-opacity hover:cursor-pointer" @click="" for="formInputLogo">
              <svg class="w-4 mb-2" fill="#505155" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M220.6 121.2L271.1 96 448 96v96H333.2c-21.9-15.1-48.5-24-77.2-24s-55.2 8.9-77.2 24H64V128H192c9.9 0 19.7-2.3 28.6-6.8zM0 128V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H271.1c-9.9 0-19.7 2.3-28.6 6.8L192 64H160V48c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16l0 16C28.7 64 0 92.7 0 128zM168 304a88 88 0 1 1 176 0 88 88 0 1 1 -176 0z"></path>
              </svg>
            </label>
          </div>
          <input
              type="file"
              @change="onFileChange"
              class="hidden peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="formInputLogo"/>
        </div>
        <div class="col-span-3">
          <label class="text-gray-400">Name</label>
          <div class="relative" data-te-input-wrapper-init>
            <input
                type="text"
                v-model="formData.name"
                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput1"/>
          </div>
        </div>
        <div class="col-span-3">
          <label class="text-gray-400">Category</label>
          <select data-te-select-init v-model="formData.category_id">
            <option :value="value.id" v-for="(value) in listCategory">{{ value.name }}</option>
          </select>
        </div>
        <div class="col-span-3">
          <label class="text-gray-400">Level</label>
          <select data-te-select-init v-model="formData.level">
            <option :value="value" v-for="(value,name) in COURSE_LEVEL">{{ ucFirst(name) }}</option>
          </select>
        </div>
        <div class="col-span-3">
          <label class="text-gray-400">Point</label>
          <div class="relative" data-te-input-wrapper-init>
            <input
                type="number"
                min="0"
                v-model="formData.point"
                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput1"/>
          </div>
        </div>
        <div class="col-span-3">
          <label class="text-gray-400">Time Required</label>
          <div class="relative" data-te-input-wrapper-init>
            <input
                type="number"
                min="0"
                v-model="formData.time_required"
                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput1"/>
          </div>
        </div>
        <div class="col-span-12 mt-4">
          <label class="text-gray-400">Description</label>
          <div class="relative" data-te-input-wrapper-init>
           <textarea
               v-model="formData.description"
               class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
               id="exampleFormControlTextarea1"
               rows="7"
               placeholder="Describe the course"></textarea>
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
            @click="addCourse()">
          Add
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
.btn-upload {
  &:hover{
    background: linear-gradient(to bottom,  rgb(255,255,255, 0.5) 0%, rgb(195,195,195, 0.2) 100%);
    opacity: 1;
  }
}
</style>
