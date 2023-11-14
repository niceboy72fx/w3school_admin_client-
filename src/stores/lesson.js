import {ref} from 'vue'
import {defineStore} from 'pinia'
import {lessonData, lessonDetail } from './data'
export const useLessonStore = defineStore('lessonStore', () => {
    const listLesson = ref([])
    const lesson = ref([])

    function getListLesson() {
        const data = lessonData
        listLesson.value = data
        return data
    }

    function addLesson(formData) {
        return formData.value
    }

    function updateLesson(formData, id) {
        lesson.value = listLesson[id]
        return lesson.value
    }

    return {lesson, lessonDetail, getListLesson, addLesson, updateLesson}
},


{
    persist: {
        enabled: true
    }
})