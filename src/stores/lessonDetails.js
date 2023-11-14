import {ref} from 'vue'
import {defineStore} from 'pinia'
import { lessonData } from './data'
export const useLessonDetailsStore = defineStore('lessonDetailsStore', () => {
    const lessonDetail = ref([])
    const lessonDetails = ref([])

    function getLessonDetails(id) {
        lessonDetail.value = lessonData[id]
        return lessonDetail.value
    }

    function addLessonDetails(formData) {
        return formData.value
    }

    return {lessonDetail, getLessonDetails, addLessonDetails, lessonDetails}
},

{
    persist: {
        enabled: true
    }
})