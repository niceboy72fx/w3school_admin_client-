<script setup>
import {useAuthStore} from "../stores/auth";
import {
  initTE, Input, Validation, Select, Button
} from "tw-elements";
import {onMounted, ref, computed} from "vue";
import {useRoute} from "vue-router";
import DateRangePicker from 'vue3-daterange-picker'
import {COURSE_LEVEL, COURSE_STATUS, COURSE_STATUS_APPROVED} from '../constant/course';
import {useCategoryStore} from "../stores/category";
import router from "../router";
import {CATEGORY_STATUS} from "../constant/category";

const isEdit = true
const route = useRoute()
const categoryStore = useCategoryStore()
const authStore = useAuthStore()
const categoryDetail = ref({
  name: null,
  status: null,
})
const errors = ref({
  name: []
})
onMounted(async () => {
  initTE({Input, Select, Button}, {allowReinits: true});
  await categoryStore.getCategoryDetail(route.params.id);
  Object.assign(categoryDetail.value, categoryStore.categoryDetail)
})
const updateCategory = async () => {
  const data = await categoryStore.updateCategory(route.params.id, categoryDetail.value);
  Object.assign(errors.value, data)
  if(!data){
    await router.push({name: 'category'})
  }
}
</script>

<template>
  <section>
    <section>
      <h2 class="mb-5 mt-0 text-3xl font-semibold leading-normal text-gray-800 dark:text-gray-200">
        Overview
      </h2>

      <div class="grid grid-cols-12 gap-x-6 gap-y-2 mb-6">
        <div class="col-span-5">
          <label class="text-gray-400">Name</label>
          <div class="relative" data-te-input-wrapper-init>
            <input
                class="peer block min-h-[auto] w-full rounded border-0 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                type="text"
                v-model="categoryDetail.name"
                id="formInputName"/>
          </div>
        </div>
        <div class="col-span-3">
          <label class="text-gray-400">Status</label>
          <select data-te-select-init v-model="categoryDetail.status">
            <option :value="value" v-for="(value,name) in CATEGORY_STATUS">{{ ucFirst(name) }}</option>
          </select>
        </div>
      </div>
      <div class="mb-6 text-sm text-red-600" v-show="errors.name.length > 0">
        {{ errors.name.toString() }}
      </div>
    </section>
    <hr class="mb-5 dark:border-gray-600">
    <section>
      <div class="flex justify-end mb-2">
        <button
            type="button"
            class="mr-4 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            @click="updateCategory">
          Update
        </button>
        <button
            @click="router.push({name: 'category'})"
            type="button"
            class="rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200">
          Back
        </button>
      </div>
    </section>
  </section>
</template>

<style scoped>
.bg-disable {
  background-color: #E9ECEF;
}
.btn-upload {
  &:hover{
    background: linear-gradient(to bottom,  rgb(255,255,255, 0.5) 0%, rgb(195,195,195, 0.2) 100%);
    opacity: 1;
  }
}
</style>
