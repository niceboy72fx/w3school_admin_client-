<script setup>
import { Ripple, Input, Select, Validation, initTE } from 'tw-elements'
import { onMounted, reactive } from 'vue'
import router from '../../router'
import { lessonData } from '../../stores/data'
import { useLessonStore } from '../../stores/lesson'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

const lessonStore = useLessonStore()
onMounted(() => {
  initTE({ Ripple, Input, Select, Validation })
})

// fake data
const topicData = [
  { id: 1, topic_name: 'test1' },
  { id: 2, topic_name: 'test2' },
  { id: 3, topic_name: 'test3' },
  { id: 4, topic_name: 'test4' }
]

const formData = reactive({
  id: 0,
  topic_id: 1,
  lesson_name: '',
  status: 1,
  position: 1
})

//config message and required
const rules = {
  topic_id: {
    required: helpers.withMessage('This field cannot be empty', required)
  },
  lesson_name: {
    required: helpers.withMessage('This field cannot be empty', required)
  },
  status: {
    required: helpers.withMessage('This field cannot be empty', required)
  },
  position: {
    required: helpers.withMessage('This field cannot be empty', required)
  }
}

const v$ = useVuelidate(rules, formData)

async function addLessonBtn() {
  // check validate
  const result = await v$.value.$validate()
  if (result) {
    lessonStore.addLesson(formData)
    router.push({ name: 'lesson' })
  }
}

function resetData() {
  formData.topic_id = 1
  formData.status = 1
  formData.lesson_name = ''
  formData.status = 1
}
</script>

<template>
  <div
    class="block max-w-sm rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
  >
    <form>
      <!--Lesson name input-->
      <div class="relative mb-6">
        <label for="lessonNameInput" class="pointer-events-none">Lesson name</label>
        <div :class="{ error: v$.lesson_name.$errors.length }">
          <input
            type="text"
            class="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="lessonNameInput"
            aria-describedby="emailHelp"
            placeholder="Enter Lesson name"
            v-model="formData.lesson_name"
          />
          <div class="input-errors" v-for="error of v$.lesson_name.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
      </div>

      <!-- Status input-->
      <div class="relative mb-6">
        <label for="lessonPositionInput" class="pointer-events-none">Status</label>
        <div :class="{ error: v$.status.$errors.length }">
          <select
            v-model="formData.status"
            class="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear"
          >
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
          <div class="input-errors" v-for="error of v$.status.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
      </div>
      <!-- Topic input-->
      <div class="relative mb-6">
        <label for="lessonPositionInput" class="pointer-events-none">Topic</label>
        <div :class="{ error: v$.topic_id.$errors.length }">
          <select
            v-model="formData.topic_id"
            class="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear"
          >
            <option v-for="topic in topicData" v-bind:key="topic.id" :value="topic.id">
              {{ topic.topic_name }}
            </option>
          </select>
          <div class="input-errors" v-for="error of v$.topic_id.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
      </div>

      <!--Position input-->
      <div class="relative mb-6">
        <label for="lessonPositionInput" class="pointer-events-none">Lesson position</label>
        <div :class="{ error: v$.position.$errors.length }">
          <input
            type="number"
            class="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="lessonPositionInput"
            placeholder="Enter lesson position"
            v-model="formData.position"
          />
          <div class="input-errors" v-for="error of v$.position.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
      </div>
      <!--Add button-->
      <div class="flex space-x-3">
        <button
          @click="addLessonBtn"
          type="button"
          class="dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-te-ripple-init
          data-te-ripple-color="light"
          data-te-submit-btn-ref
        >
          Save
        </button>
        <button
          @click="resetData"
          type="button"
          class="dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          Reset
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.error-msg {
  color: red;
}
</style>
