import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import api from "../apis";
import {COURSE_STATUS} from "../constant/course";

export const useCourseStore = defineStore('courseStore', () => {
        const listApproved = ref([])
        const listPending = ref([])
        const listRejected = ref([])
        const listAll = ref([])

        async function getListApproved(query = 'page=1&perPage=10') {
            const {data} = await api.get('api/admin/course/approved?' + query)
            listApproved.value = data.data.data
            return data.data
        }

        async function getListPending(query = 'page=1&perPage=10') {
            const {data} = await api.get('api/admin/course/pending?' + query)
            listPending.value = data.data.data
            return data.data
        }

        async function getListRejected(query = 'page=1&perPage=10') {
            const {data} = await api.get('api/admin/course/rejected?' + query)
            listRejected.value = data.data.data
            return data.data
        }

        async function getListCourse() {
            const {data} = await api.get('api/admin/course/all')
            listAll.value = data.data.filter(course => course.status !== COURSE_STATUS.REJECTED)
        }

        async function addCourse(formData) {
            const {data} = await api.post('api/admin/course/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
        }

        return {
            listApproved,
            listPending,
            listRejected,
            listAll,
            getListApproved,
            getListPending,
            getListRejected,
            getListCourse,
            addCourse
        }
    },
    {
        persist: {
            enabled: true
        }
    })