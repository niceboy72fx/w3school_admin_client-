import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import api from "../apis";

export const useCourseDetailStore = defineStore('courseDetailStore', () => {
        const courseDetail = ref({
            name: null,
            category_id: null,
            level: null,
            logo: null,
            status: null,
            point: null,
            time_required: null,
            description: null,
            created_at: null,
        })

        async function getCourseDetail(id) {
            const {data} = await api.get(`api/admin/course/${id}/original`)
            courseDetail.value = data.data
        }

        async function updateCourse(id, formData) {
            const {data} = await api.post(`api/admin/course/${id}/original`, {_method: 'PUT', ...formData}, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            courseDetail.value = data.data
        }

        return {courseDetail, getCourseDetail, updateCourse}
    },
    {
        persist: {
            enabled: true
        }
    })