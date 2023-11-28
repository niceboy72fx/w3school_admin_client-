<script setup>
import { Ripple, Input, Select, initTE } from 'tw-elements'
import { ref, reactive, onMounted, computed, watch } from 'vue'
import router from '../../router'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useExercisesStore } from '../../stores/exercises'
import { useLessonDetailsStore } from '../../stores/lessonDetails'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useRoute } from 'vue-router'

const route = useRoute()

const lessonDetailsStore = useLessonDetailsStore()
const exercisesStore = useExercisesStore()
initTE({ Ripple, Input, Select })

const formData = reactive({
  id: 0,
  lesson_detail_id: 1,
  language: '',
  content: '',
  status: 1
})

const lessonDetailSeleted = computed(() => {
  return exercisesStore.lessonDetailSeleted
})

//config message and required
const rules = {
  language: {
    required: helpers.withMessage('This field cannot be empty', required)
  },
  content: {
    required: helpers.withMessage('This field cannot be empty', required)
  },
  status: {
    required: helpers.withMessage('This field cannot be empty', required)
  }
}
const v$ = useVuelidate(rules, formData)

const editor = ref(ClassicEditor)
const editorConfig = ref({
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      '|',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'undo',
      'redo',
      '|'
    ]
  }
})

async function addExercisesBtn() {
  // check validate
  const result = await v$.value.$validate()
  if (result) {
    exercisesStore.addExercises(formData)
    router.push({
      name: 'exercises_view',
      query: { idLessonDetail: route.query?.idLessonDetail, idLesson: route.query?.idLesson }
    })
  }
}

function resetData() {
  formData.language = ''
  formData.content = ''
  formData.status = 1
}

onMounted(async () => {
  await lessonDetailsStore.setLessonDetails(route.query?.idLesson)
  exercisesStore.setExercises(route.query?.idLessonDetail)
})
</script>

<template>
  <div
    class="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
  >
    <form>
      <!--Lesson name input-->
      <div class="relative mb-6" data-te-input-wrapper-init>
        <label for="lessonNameInput" class="pointer-events-none">Lesson detail name</label>
        <input
          type="text"
          class="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
          id="lessonNameInput"
          :placeholder="lessonDetailSeleted.title"
          disabled
        />
      </div>

      <div class="relative mb-6">
        <label for="titlePositionInput" class="pointer-events-none">Language</label>
        <div :class="{ error: v$.language.$errors.length }">
          <input
            type="text"
            class="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="titlePositionInput"
            placeholder="Enter title position"
            v-model="formData.language"
          />
          <div class="input-errors" v-for="error of v$.language.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
      </div>

      <div class="relative mb-6" data-te-input-wrapper-init style="width: 100%">
        <label for="lessonContent" class="pointer-events-none">Content</label>
        <div :class="{ error: v$.content.$errors.length }">
          <ckeditor
            style="height: 100%"
            id="lessonContent"
            :editor="editor"
            v-model="formData.content"
            :config="editorConfig"
          ></ckeditor>
          <div class="input-errors" v-for="error of v$.content.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
      </div>

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

      <!--Add button-->
      <div class="flex space-x-3">
        <button
          @click="addExercisesBtn"
          type="button"
          class="dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          Add
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
