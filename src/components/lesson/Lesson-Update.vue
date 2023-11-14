<script setup>
import {
  Ripple,
  Input,
  Select,
  Validation,
  initTE
} from "tw-elements";
import {onMounted, ref} from 'vue'
import router from "../../router";
import {useLessonStore} from '../../stores/lesson'
import { lessonData } from "../../stores/data";

const lessonStore = useLessonStore();
onMounted(() => {
  initTE({Ripple, Input, Select, Validation });
})

const formData = ref({
    id: 0,
    topic_id: 1,
    lesson_name: '',
    status: 1,
    position: 1
})

function addLessonBtn() {
    console.log(formData)
    formData.value.id = lessonStore.getListLesson().length + 1
    lessonData.push(lessonStore.addLesson(formData))
    router.push({name: 'lesson'})
}

function resetData() {
    formData.value.topic_id = 1
    formData.value.status = 1
    formData.value.lesson_name = ''
    formData.value.status = 1
}

</script>

<template>
<div
  class="block max-w-sm rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
  <form data-te-validation-init>
    <!--Lesson name input-->
    <div 
      class="relative mb-6"
      data-te-input-wrapper-init
      data-te-validate="input"
      data-te-validation-ruleset="isRequired">
        <label
        for="lessonNameInput"
        class="pointer-events-none "
        >Lesson name</label
      >
      <input
        type="text"
        class="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        id="lessonNameInput"
        aria-describedby="emailHelp"
        placeholder="Enter Lesson name" 
        v-model="formData.lesson_name"
        />
    </div>

    <!-- Status input-->
    <div class="relative mb-6">
        <label
        for="lessonPositionInput"
        class="pointer-events-none"
        >Status</label
      >
      <select 
      data-te-select-init 
      v-model="formData.status" 
      class="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear">
        <option value="1">Active</option>
        <option value="0">Inactive</option>
      </select>
    </div>
     <!-- Topic input-->
     <div class="relative mb-6">
        <label
        for="lessonPositionInput"
        class="pointer-events-none"
        >Topic</label
      >
      <select 
      data-te-select-init 
      v-model="formData.topic_id" 
      class="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear"
      >
        <option v-for="topic in topicData" v-bind:key="topic.id" :value="topic.id">{{topic.topic_name}}</option>
      </select>
    </div>

    <!--Position input-->
    <div class="relative mb-6" data-te-input-wrapper-init>
        <label
        for="lessonPositionInput"
        class="pointer-events-none "
        >Lesson position</label
      >
      <input
        type="number"
        class="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        id="lessonPositionInput"
        placeholder="Enter lesson position" 
        v-model="formData.position"/>
    </div>
    <!--Add button-->
    <div class="flex space-x-3">
        <button
        @click="addLessonBtn"
        type="button"
        class="dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        data-te-ripple-init
        data-te-ripple-color="light"
        data-te-submit-btn-ref>
        Add
        </button>
        <button
        @click="resetData"
        type="button"
        class="dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        data-te-ripple-init
        data-te-ripple-color="light">
        Reset
        </button>
    </div>
  </form>

</div>
</template>

<style scoped>
</style>