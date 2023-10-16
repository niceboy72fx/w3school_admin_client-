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

        return {listApproved, listPending, listRejected, getListApproved}
    },
    {
        persist: {
            enabled: true
        }
    })