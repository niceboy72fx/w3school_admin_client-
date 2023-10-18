import {ref} from 'vue'
import {defineStore} from 'pinia'
import api from "../apis";

export const useTopicStore = defineStore('topicStore', () => {
    const listTopic = ref([])
    const topicDetail = ref([])

    async function getListTopic(id) {
        const {data} = await api.get(`api/course/${id}/list-topic/`)
        listTopic.value = data.data
        return data.data
    }

    async function updateTopic(id) {
        const {data} = await api.put(`api/admin/topic/${id}/original`)
        topicDetail.value = data.data
    }
    async function addTopic(formData) {
        const {data} = await api.post(`api/admin/topic/add`, formData)
        return data.data
    }

    return {listTopic, getListTopic, updateTopic, addTopic}
},


{
    persist: {
        enabled: true
    }
})