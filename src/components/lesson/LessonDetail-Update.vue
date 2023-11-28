<script setup>
import { Ripple, Input, Select, initTE } from 'tw-elements'
import { ref, reactive, computed, watch, onMounted } from 'vue'
import router from '../../router'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useLessonDetailsStore } from '../../stores/lessonDetails'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useRoute } from 'vue-router'

const route = useRoute()
const lessonDetailsStore = useLessonDetailsStore()
initTE({ Ripple, Input, Select })

const formData = reactive({
  id: 0,
  lesson_id: 1,
  title: '',
  content: '',
  position: ''
})

const lessonDetailSeleted = computed(() => {
  return lessonDetailsStore.lessonDetail.find((item) => item.id == route.query?.idLessonDetail)
})

const lessonSeleted = computed(() => {
  return lessonDetailsStore.lessonSeleted
})

watch(
  () => lessonDetailSeleted.value,
  () => {
    formData.id = lessonDetailSeleted.value?.id
    formData.lesson_id = lessonDetailSeleted.value?.lesson_id
    formData.title = lessonDetailSeleted.value?.title
    formData.content = lessonDetailSeleted.value?.content
    formData.position = lessonDetailSeleted.value?.position
  },
  { deep: true, immediate: true }
)

//config message and required
const rules = {
  title: {
    required: helpers.withMessage('This field cannot be empty', required)
  },
  content: {
    required: helpers.withMessage('This field cannot be empty', required)
  },
  position: {
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

async function updateLessonBtn() {
  // check validate
  const result = await v$.value.$validate()
  if (result) {
    lessonDetailsStore.updateLessonDetails(formData)
    router.push({ name: 'lesson_view_details', query: { idLesson: route.query?.idLesson } })
  }
}

function resetData() {
  formData.title = ''
  formData.content = ''
  formData.position = ''
}

onMounted(async () => {
  lessonDetailsStore.setLessonDetails(route.query?.idLesson)
})
</script>

<template>
  <div
    class="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
  >
    <form>
      <!--Lesson name input-->
      <div class="relative mb-6" data-te-input-wrapper-init>
        <label for="lessonNameInput" class="pointer-events-none">Lesson name</label>
        <input
          type="text"
          class="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
          id="lessonNameInput"
          :placeholder="lessonSeleted?.lesson_name"
          disabled
        />
      </div>

      <div class="relative mb-6">
        <label for="titlePositionInput" class="pointer-events-none">Title</label>
        <div :class="{ error: v$.title.$errors.length }">
          <input
            type="text"
            class="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="titlePositionInput"
            placeholder="Enter title position"
            v-model="formData.title"
          />
          <div class="input-errors" v-for="error of v$.title.$errors" :key="error.$uid">
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
        <label for="lessonPositionInput" class="pointer-events-none">Lesson detail position</label>
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
          @click="updateLessonBtn"
          type="button"
          class="dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-te-ripple-init
          data-te-ripple-color="light"
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
