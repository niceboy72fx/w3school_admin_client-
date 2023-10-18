import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import api from "../apis";

export const useTopicDetailStore = defineStore('topicDetailStore', () => {
        const isEdit = ref(false)
        const topicDetail = ref({
            id: '',
            name: '',
            position: '',
            course_id: '',
        })
        const statusUpdate = ref(false)

        async function getTopicDetail(id) {
            const {data} = await api.get(`api/admin/topic/${id}/original`)
            console.log(data.data)
            topicDetail.value = data.data
        }

        async function updateTopic(id, formData) {
            const {data} = await api.post(`api/admin/topic/${id}/original`, {_method: 'PUT', ...formData}, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            statusUpdate.value = data.data
        }

        return {topicDetail, statusUpdate, getTopicDetail, updateTopic}
    },
    {
        persist: {
            enabled: true
        }
    })