import { ref } from 'vue'
import { defineStore } from 'pinia'
import { lessonDetailFake, lessonData } from './data'
export const useLessonDetailsStore = defineStore(
  'lessonDetailsStore',
  () => {
    const lessonDetail = ref([])
    const lessonDetails = ref([])
    const lessonSeleted = ref({})

    function setLessonDetails(id) {
      if (lessonSeleted.value && lessonSeleted.value.id == id) {
        const existingLessonIds = new Set(lessonDetail.value.map((item) => item.lesson_id))
        lessonDetail.value = [
          ...lessonDetail.value,
          ...lessonDetailFake.filter(
            (item) => !existingLessonIds.has(item.lesson_id) && item.lesson_id == id
          )
        ]
      } else {
        lessonDetail.value = lessonDetailFake.filter((item) => item.lesson_id == id)
      }
      lessonSeleted.value = lessonData.find((item) => item.id == id)
      return lessonDetail.value
    }

    function addLessonDetails(formData) {
      lessonDetail.value.push({ ...formData })
    }

    function updateLessonDetails(formData) {
      const indexToUpdate = lessonDetail.value.findIndex((item) => item.id === formData.id)
      if (indexToUpdate !== -1) {
        lessonDetail.value[indexToUpdate].id = formData.id
        lessonDetail.value[indexToUpdate].lesson_id = formData.lesson_id
        lessonDetail.value[indexToUpdate].title = formData.title
        lessonDetail.value[indexToUpdate].content = formData.content
        lessonDetail.value[indexToUpdate].position = formData.position
      }
    }

    function deleteLessonDetail(id) {
      lessonDetail.value = lessonDetail.value.filter((item) => item.id != id)
    }

    return {
      lessonDetail,
      lessonSeleted,
      setLessonDetails,
      addLessonDetails,
      updateLessonDetails,
      deleteLessonDetail,
      lessonDetails
    }
  },

  {
    persist: {
      enabled: false
    }
  }
)
