<script setup>
import {
  Ripple,
  Input,
  initTE
} from "tw-elements";
import {onMounted, ref} from 'vue'
import router from "../../router";
initTE({Ripple, Input });
import CKEditor from '@ckeditor/ckeditor5-vue';

const formData = ref({
    id: '',
    name: '',
    position: '',
    course_id: ''
})

data: {
  editor: CKEditor
}

async function addLessonBtn() {
    router.push({name: 'lesson'})
}

function resetData() {
    formData.value.name = ''
    formData.value.position = ''
    formData.value.courseID = ''
}

</script>

<template>
<div
  class="block max-w-sm rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
  <form>
    <!--Lesson name input-->
    <div class="relative mb-6" data-te-input-wrapper-init>
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
        v-model="formData.name"/>
    </div>

    <!-- position input-->
    <div class="relative mb-6" data-te-input-wrapper-init>
        <label
        for="lessonPositionInput"
        class="pointer-events-none "
        >Lesson position</label
      >
      <input
        type="number"
        class="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        id="LessonPositionInput"
        placeholder="Lesson position" 
        v-model="formData.position"/>
    </div>

    <div class="relative mb-6" data-te-input-wrapper-init>
      <ckeditor :editor="editor" v-model="editorData"></ckeditor>
    </div>
    
    <!--Add button-->
    <div class="flex space-x-3">
        <button
        @click="addLessonBtn"
        type="button"
        class="dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        data-te-ripple-init
        data-te-ripple-color="light">
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