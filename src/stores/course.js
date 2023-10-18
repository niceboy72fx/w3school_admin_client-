import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import api from "../apis";

export const useCourseStore = defineStore('courseStore', () => {
        const listApproved = ref([])
        const listPending = ref([])
        const listRejected = ref([])
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

        async function addCourse(formData) {
            const {data} = await api.post('api/admin/course/add', formData)
        }

        return {listApproved, listPending, listRejected, getListApproved, getListPending, getListRejected, addCourse}
    },
    {
        persist: {
            enabled: true
        }
    })