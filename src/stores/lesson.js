import {ref} from 'vue'
import {defineStore} from 'pinia'
import api from "../apis";

export const useLessonStore = defineStore('lessonStore', () => {
        const listLesson = ref([])
        const lessonDetail = ref([])

        async function getListLesson(query = '') {
            const {data} = await api.get(`api/admin/lesson/all?` + query)
            listLesson.value = data.data
            return data.data
        }

        async function updateLesson(id, formData) {
            try {
                await api.post(`api/admin/lesson/${id}`, {_method: 'PUT', ...formData}, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                })
            } catch (error) {
                return error.response.data.errors
            }
        }

        async function getLessonDetail(id) {
            const {data} = await api.get(`api/admin/lesson/${id}`)
            lessonDetail.value = data.data
        }

        async function addLesson(formData) {
            try {
                await api.post('api/admin/lesson/add', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                })
            } catch (error) {
                return error.response.data.errors
            }
        }

        async function getListLessonWithPagination(query = 'page=1&perPage=10') {
            const {data} = await api.get('api/admin/lesson/overall?' + query)
            listLesson.value = data.data.data
            return data.data
        }

        return {listLesson, lessonDetail, getListLessonWithPagination, getListLesson, getLessonDetail, updateLesson, addLesson}
    },


    {
        persist: {
            enabled: true
        }
    })