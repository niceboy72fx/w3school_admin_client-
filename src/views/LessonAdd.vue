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
import {useLessonStore} from "../stores/lesson";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import helper from "../plugins/helper";

const route = useRoute()
const courseStore = useCourseStore()
const topicStore = useTopicStore()
const lessonStore = useLessonStore()
const formData = ref({
  course_id: route.query.course_id,
  topic_id: route.query.topic_id,
  name: null,
  lesson_details: [
    {
      title: '',
      content: ''
    }
  ],
})
const errors = ref({
  course_id: [],
  topic_id: [],
  name: [],
  lesson_details: [],
})
onMounted(async () => {
  initTE({Input, Select, Button}, {allowReinits: true});
  await courseStore.getListCourse()
})

const handleChangeCourseID = async () => {
  await topicStore.getListTopic(helper.toQueryString({course_id: formData.value.course_id}))
}
const addLesson = async () => {
  const data = await lessonStore.addLesson(formData.value);
  Object.assign(errors.value, data)
  if (!data) {
    await router.push({name: 'lesson'})
  }
}
const addParagraph = async () => {
  formData.value.lesson_details.push({title: '', content: ''})
}
</script>

<template>
  <div class="w-full">
    <form id="formTopicAdd">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-3">
          Course
        </div>
        <div class="col-span-9">
          <div class="relative">
            <select data-te-select-init data-te-select-filter="true" v-model="formData.course_id"
                    @change="handleChangeCourseID">
              <option :value="null">Choose a course</option>
              <option v-for="course in courseStore.listAll" :value="course.id">{{ course.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-start-4 col-span-8 text-sm text-red-600" v-show="errors['course_id'].length > 0">
          {{ errors['course_id'].toString() }}
        </div>
        <div class="col-span-3">
          Topic
        </div>
        <div class="col-span-9">
          <div class="relative">
            <select data-te-select-init data-te-select-filter="true" v-model="formData.topic_id"
                    :disabled="!formData.course_id">
              <option :value="null">Choose a topic</option>
              <option v-for="topic in topicStore.listTopic" :value="topic.id">{{ topic.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-start-4 col-span-8 text-sm text-red-600" v-show="errors['topic_id'].length > 0">
          {{ errors['topic_id'].toString() }}
        </div>
        <div class="col-span-3">
          Name
        </div>
        <div class="col-span-9">
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
        <div class="col-span-2">
          Content
        </div>
        <template v-for="(lessonDetail, key) in formData.lesson_details">
          <div class="col-span-1 col-start-3">
            Para {{ key + 1}}
          </div>
          <div class="col-span-9 flex justify-between">
            <div class="relative w-full">
              <input v-model="formData.lesson_details[key].title"
                     placeholder="Title for paragraph" type="text" class="peer w-full block rounded-md border-[2px] px-3 py-[0.32rem] focus:border-primary focus:outline-none" />

            </div>
            <button
                @click="formData.lesson_details.splice(key, 1)"
                v-if="formData.lesson_details.length > 1"
                type="button"
                class="rounded bg-danger ml-5 px-4 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
              <svg class="w-4 h-4" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="white"
                   stroke-width="10" stroke="white">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                      d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"></path>
                </g>
              </svg>
            </button>
          </div>
          <div class="col-span-8 col-start-4">
            <ckeditor :editor="ClassicEditor" v-model="formData.lesson_details[key].content"></ckeditor>
          </div>
          <div class="col-span-8 col-start-4">
            <button
                type="button"
                class="mr-4 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                @click="addLesson"
            >
              Add example
            </button>
            <button
                type="button"
                class="mr-4 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                @click="addLesson"
            >
              Add example
            </button>
          </div>
        </template>
        <div class="col-start-4 col-span-8 text-sm text-red-600" v-show="errors.lesson_details.length > 0">
          {{ errors.lesson_details.toString() }}
        </div>
        <div class="col-span-8 col-start-4">
          <button
              type="button"
              class="mr-4 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              @click="addParagraph"
          >
            Add paragraph
          </button>
        </div>
        <div class="col-span-12 flex justify-end">
          <button
              type="button"
              class="mr-4 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              @click="addLesson"
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

<style lang="scss">
.ck-editor__editable_inline {
  min-height: 350px;
}
</style>
