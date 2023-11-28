import { ref } from 'vue'
import { defineStore } from 'pinia'
import { lessonData, lessonDetailFake } from './data'
export const useLessonStore = defineStore(
  'lessonStore',
  () => {
    const listLesson = ref([])
    const lesson = ref([])

    function getListLesson() {
      const data = lessonData
      listLesson.value = data
      return data
    }

    function addLesson(formData) {
      listLesson.value.push({ ...formData })
    }

    function updateLesson(formData) {
      const indexToUpdate = listLesson.value.findIndex((item) => item.id === formData.id)
      if (indexToUpdate !== -1) {
        listLesson.value[indexToUpdate] = formData
      }
    }

    return { lesson, lessonDetailFake, listLesson, getListLesson, addLesson, updateLesson }
  },

  {
    persist: {
      enabled: false
    }
  }
)
