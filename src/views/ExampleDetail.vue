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
import {TOPIC_STATUS} from "../constant/topic";
import {CATEGORY_STATUS} from "../constant/category";
import {useLessonStore} from "../stores/lesson";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const route = useRoute()
const courseStore = useCourseStore()
const topicStore = useTopicStore()
const lessonStore = useLessonStore()
const lessonDetail = ref({
  course_id: null,
  topic_id: null,
  name: null,
  status: null,
  content: '',
})
const errors = ref({
  course_id: [],
  topic_id: [],
  name: [],
  status: [],
  content: [],
})

const editor = ClassicEditor
onMounted(async () => {
  initTE({Input, Select, Button}, {allowReinits: true});
  await lessonStore.getLessonDetail(route.params.id);
  Object.assign(lessonDetail.value, lessonStore.lessonDetail)
  await courseStore.getListCourse()
  await topicStore.getTopicDetail(lessonDetail.value.course_id);
})

const updateLesson = async () => {
  const data = await lessonStore.updateLesson(route.params.id, lessonDetail.value);
  Object.assign(errors.value, data)
  if (!data) {
    await router.push({
      name: 'lesson',
      query: {course_id: lessonDetail.value.course_id, topic_id: lessonDetail.value.topic_id}
    })
  }
}

</script>

<template>
  <div class="w-full">
    <form id="formTopicAdd">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-3">
          Course
        </div>
        <div class="col-span-7">
          <div class="relative">
            <select data-te-select-init data-te-select-filter="true" v-model="lessonDetail.course_id" disabled>
              <option v-for="course in courseStore.listAll" :value="course.id">{{ course.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-start-4 col-span-8 text-sm text-red-600" v-show="errors['course_id'].length > 0">
          {{ errors['course_id'].toString() }}
        </div>
        <div class="col-span-3 flex">
          Topic
        </div>
        <div class="col-span-7">
          <div class="relative">
            <select data-te-select-init data-te-select-filter="true" v-model="lessonDetail.topic_id">
              <option :value="null">Choose a topic</option>
              <option v-for="topic in topicStore.listTopic" :value="topic.id">{{ topic.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-start-4 col-span-8 text-sm text-red-600" v-show="errors['topic_id'].length > 0">
          {{ errors['topic_id'].toString() }}
        </div>
        <div class="col-span-3 flex">
          Name
        </div>
        <div class="col-span-7">
          <div class="relative" data-te-input-wrapper-init>
            <input
                type="text"
                v-model="lessonDetail.name"
                placeholder="Name"
                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="formInputName"/>
          </div>
        </div>
        <div class="col-start-4 col-span-8 text-sm text-red-600" v-show="errors.name.length > 0">
          {{ errors.name.toString() }}
        </div>
        <div class="col-span-3 flex">
          Status
        </div>
        <div class="col-span-7">
          <div class="relative">
            <select data-te-select-init v-model="lessonDetail.status">
              <option :value="value" v-for="(value,name) in TOPIC_STATUS">{{ ucFirst(name) }}</option>
            </select>
          </div>
        </div>
        <div class="col-start-4 col-span-8 text-sm text-red-600" v-show="errors['status'].length > 0">
          {{ errors['status'].toString() }}
        </div>
        <div class="col-span-3 flex">
          Content
        </div>
        <div class="col-span-7">
          <div class="relative">
            <ckeditor :editor="editor" v-model="lessonDetail.content"></ckeditor>
          </div>
        </div>
        <div class="col-start-4 col-span-8 text-sm text-red-600" v-show="errors.content.length > 0">
          {{ errors.content.toString() }}
        </div>
        <div class="col-span-12 flex justify-end">
          <button
              type="button"
              class="mr-4 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              @click="updateLesson"
          >
            Update
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
