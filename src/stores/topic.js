import {ref} from 'vue'
import {defineStore} from 'pinia'
import api from "../apis";

export const useTopicStore = defineStore('topicStore', () => {
        const listTopic = ref([])
        const topicDetail = ref([])

        async function getListTopic(query = '') {
            const {data} = await api.get(`api/admin/topic/all?` + query)
            listTopic.value = data.data
            return data.data
        }

        async function updateTopic(id, formData) {
            try {
                await api.post(`api/admin/topic/${id}`, {_method: 'PUT', ...formData}, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                })
            } catch (error) {
                return error.response.data.errors
            }
        }

        async function getTopicDetail(id) {
            const {data} = await api.get(`api/admin/topic/${id}`)
            topicDetail.value = data.data
        }

        async function addTopic(formData) {
            try {
                await api.post('api/admin/topic/add', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                })
            } catch (error) {
                return error.response.data.errors
            }
        }

        async function getListTopicWithPagination(query = 'page=1&perPage=10') {
            const {data} = await api.get('api/admin/topic/overall?' + query)
            listTopic.value = data.data.data
            return data.data
        }

        return {listTopic, topicDetail, getListTopicWithPagination, getListTopic, getTopicDetail, updateTopic, addTopic}
    },


    {
        persist: {
            enabled: true
        }
    })