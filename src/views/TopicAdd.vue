<script setup>
import {
  initTE, Input, Select, Button
} from "tw-elements";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import DateRangePicker from 'vue3-daterange-picker'
import {useTopicStore} from "../stores/topic";
import {useCourseStore} from "../stores/course";
import router from "../router";

const route = useRoute()
const courseStore = useCourseStore()
const topicStore = useTopicStore()
const formData = ref({
  course_id: route.query.course_id,
  name: null,
})
const errors = ref({
  course_id: [],
  name: []
})

onMounted(async () => {
  initTE({Input, Select, Button}, {allowReinits: true});
  await courseStore.getListCourse()
})

const addTopic = async () => {
  const data = await topicStore.addTopic(formData.value);
  Object.assign(errors.value, data)
  if(!data){
    await router.push({name: 'topic', query: {course_id: route.query.course_id}})
  }
}

</script>

<template>
  <div class="w-full">
    <form id="formTopicAdd">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-3 flex">
          Course
        </div>
        <div class="col-span-7">
          <div class="relative">
            <select data-te-select-init data-te-select-filter="true" v-model="formData.course_id">
              <option :value="null">Choose a course</option>
              <option v-for="course in courseStore.listAll" :value="course.id">{{ course.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-start-4 col-span-8 text-sm text-red-600" v-show="errors['course_id'].length > 0">
          {{ errors['course_id'].toString() }}
        </div>
        <div class="col-span-3 flex">
          Name
        </div>
        <div class="col-span-7">
          <div class="relative" data-te-input-wrapper-init>
            <input
                type="text"
                v-model="formData.name"
                placeholder="Name"
                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="formInputName"/>
          </div>
        </div>
        <div class="col-start-4 col-span-8 text-sm text-red-600" v-show="errors.name.length > 0">
          {{ errors.name.toString() }}
        </div>
        <div class="col-span-12 flex justify-end">
          <button
              type="button"
              class="mr-4 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              @click="addTopic"
          >
            Add
          </button>
          <button
              @click="router.go(-1)"
              type="button"
              class="rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>
