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
import helper from "../plugins/helper";
import {useExampleStore} from "../stores/example";

const route = useRoute()
const courseStore = useCourseStore()
const topicStore = useTopicStore()
const lessonStore = useLessonStore()
const exampleStore = useExampleStore()
const lessonDetail = ref({
  course_id: null,
  topic_id: null,
  name: null,
  status: null,
  lesson_details: [
    {
      title: '',
      content: '',
      example: null,
    }
  ],
})
const errors = ref({
  course_id: [],
  topic_id: [],
  name: [],
  status: [],
  lesson_details: [],
})

const editor = ClassicEditor
onMounted(async () => {
  initTE({Input, Select, Button}, {allowReinits: true});
  await lessonStore.getLessonDetail(route.params.id);
  if(lessonStore.lessonDetail.lesson_details.length === 0){
    lessonStore.lessonDetail.lesson_details = [
      {
        title: '',
        content: '',
        example: null,
      }
    ]
  }
  Object.assign(lessonDetail.value, lessonStore.lessonDetail)
  await courseStore.getListCourse()
  await topicStore.getListTopic(helper.toQueryString({course_id: lessonDetail.value.course_id}));
})

const updateLesson = async () => {
  const data = await lessonStore.updateLesson(route.params.id, lessonDetail.value);
  Object.assign(errors.value, data)
  if(!data){
    await router.push({name: 'lesson', query: {course_id: lessonDetail.value.course_id, topic_id: lessonDetail.value.topic_id}})
  }
}

const addParagraph = async () => {
  lessonDetail.value.lesson_details.push({title: '', content: ''})
}

const moveUpLessonDetail = async (key)=> {
  let temp = lessonDetail.value.lesson_details[key]
  lessonDetail.value.lesson_details[key] = lessonDetail.value.lesson_details[key-1]
  lessonDetail.value.lesson_details[key-1] = temp
}

const moveDownLessonDetail = async (key)=> {
  let temp = lessonDetail.value.lesson_details[key]
  lessonDetail.value.lesson_details[key] = lessonDetail.value.lesson_details[key+1]
  lessonDetail.value.lesson_details[key+1] = temp
}

</script>

<template>
  <div class="w-full">
    <form id="formTopicAdd">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-3 flex">
          Course
        </div>
        <div class="col-span-9">
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
        <div class="col-span-9">
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
        <div class="col-span-9">
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
        <div class="col-span-9">
          <div class="relative">
            <select data-te-select-init v-model="lessonDetail.status">
              <option :value="value" v-for="(value,name) in TOPIC_STATUS">{{ ucFirst(name) }}</option>
            </select>
          </div>
        </div>
        <div class="col-start-4 col-span-8 text-sm text-red-600" v-show="errors['status'].length > 0">
          {{ errors['status'].toString() }}
        </div>
        <div class="col-span-2 col-start-1">
          Content
        </div>
        <template v-for="(value, key) in lessonDetail.lesson_details">
          <div class="col-span-1 col-start-3">
            Para {{ key + 1}}
          </div>
          <div class="col-span-8 relative">
              <input v-model="lessonDetail.lesson_details[key].title"
                     placeholder="Title for paragraph" type="text" class="peer w-full block rounded-md border-[2px] px-3 py-[0.32rem] focus:border-primary focus:outline-none" />
          </div>
          <div class="col-span-1">
            <button
                @click="lessonDetail.lesson_details.splice(key, 1)"
                v-if="lessonDetail.lesson_details.length > 1"
                type="button"
                class="rounded bg-danger px-4 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
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
            <ckeditor :editor="ClassicEditor" v-model="lessonDetail.lesson_details[key].content"></ckeditor>
          </div>
          <div class="col-span-1">
            <button
                @click="moveUpLessonDetail(key)"
                v-if="key > 0"
                type="button"
                class="rounded bg-success px-4 pb-2 pt-2.5 mb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
            <svg class="w-4 h-4"  viewBox="0 -4.5 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>arrow_up [#337]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-260.000000, -6684.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M223.707692,6534.63378 L223.707692,6534.63378 C224.097436,6534.22888 224.097436,6533.57338 223.707692,6533.16951 L215.444127,6524.60657 C214.66364,6523.79781 213.397472,6523.79781 212.616986,6524.60657 L204.29246,6533.23165 C203.906714,6533.6324 203.901717,6534.27962 204.282467,6534.68555 C204.671211,6535.10081 205.31179,6535.10495 205.70653,6534.69695 L213.323521,6526.80297 C213.714264,6526.39807 214.346848,6526.39807 214.737591,6526.80297 L222.294621,6534.63378 C222.684365,6535.03868 223.317949,6535.03868 223.707692,6534.63378" id="arrow_up-[#337]"> </path> </g> </g> </g> </g></svg>
            </button>
            <button
                @click="moveDownLessonDetail(key)"
                v-if="lessonDetail.lesson_details.length > key+1"
                type="button"
                class="rounded bg-success px-4 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
              <svg class="w-4 h-4" viewBox="0 -4.5 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>arrow_down [#338]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-220.000000, -6684.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M164.292308,6524.36583 L164.292308,6524.36583 C163.902564,6524.77071 163.902564,6525.42619 164.292308,6525.83004 L172.555873,6534.39267 C173.33636,6535.20244 174.602528,6535.20244 175.383014,6534.39267 L183.70754,6525.76791 C184.093286,6525.36716 184.098283,6524.71997 183.717533,6524.31405 C183.328789,6523.89985 182.68821,6523.89467 182.29347,6524.30266 L174.676479,6532.19636 C174.285736,6532.60124 173.653152,6532.60124 173.262409,6532.19636 L165.705379,6524.36583 C165.315635,6523.96094 164.683051,6523.96094 164.292308,6524.36583" id="arrow_down-[#338]"> </path> </g> </g> </g> </g></svg>
            </button>
          </div>
          <div class="col-span-1 col-start-3">
            Ex
          </div>
          <div class="col-span-8">
            <div class="relative">
              <select data-te-select-init data-te-select-filter="true" v-model="lessonDetail.lesson_details[key].example">
                <option :value="null">Choose a example</option>
                <option v-for="example in exampleStore.listExample" :value="example.id">{{ example.description }}</option>
              </select>
            </div>
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
