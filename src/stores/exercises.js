import { ref } from 'vue'
import { defineStore } from 'pinia'
import { exercisesFake, lessonDetailFake } from './data'
import { useLessonDetailsStore } from './lessonDetails'

export const useExercisesStore = defineStore(
  'exercisesStore',
  () => {
    const lessonDetailsStore = useLessonDetailsStore()
    const exercises = ref([])
    const lessonDetailSeleted = ref({})

    function setExercises(id) {
      if (lessonDetailSeleted.value && lessonDetailSeleted.value.id == id) {
        const existingExercisesIds = new Set(exercises.value.map((item) => item.lesson_detail_id))
        exercises.value = [
          ...exercises.value,
          ...exercisesFake.filter(
            (item) =>
              !existingExercisesIds.has(item.lesson_detail_id) && item.lesson_detail_id == id
          )
        ]
      } else {
        exercises.value = exercisesFake.filter((item) => item.lesson_detail_id == id)
      }
      lessonDetailSeleted.value = lessonDetailsStore.lessonDetail.find((item) => item.id == id)
      return exercises.value
    }

    function addExercises(formData) {
      exercises.value.push({ ...formData })
    }

    function updateExercises(formData) {
      const indexToUpdate = exercises.value.findIndex((item) => item.id === formData.id)
      if (indexToUpdate !== -1) {
        exercises.value[indexToUpdate].id = formData.id
        exercises.value[indexToUpdate].lesson_detail_id = formData.lesson_detail_id
        exercises.value[indexToUpdate].language = formData.language
        exercises.value[indexToUpdate].content = formData.content
        exercises.value[indexToUpdate].status = formData.status
      }
    }

    function deleteExercises(id) {
      exercises.value = exercises.value.filter((item) => item.id != id)
    }

    return { exercises, lessonDetailSeleted, setExercises, addExercises, updateExercises, deleteExercises }
  },

  {
    persist: {
      enabled: false
    }
  }
)
