import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import api from "../apis";
import {COURSE_STATUS} from "../constant/course";

export const useCourseDetailStore = defineStore('courseDetailStore', () => {
        const isEdit = ref(false)
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
        const statusUpdate = ref(false)

        async function getCourseDetail(id) {
            const {data} = await api.get(`api/admin/course/${id}/original`)
            courseDetail.value = data.data
            isEdit.value = courseDetail.value.status !== COURSE_STATUS.INACTIVE && courseDetail.value.status !== COURSE_STATUS.REJECTED
        }

        async function updateCourse(id, formData) {
            const {data} = await api.post(`api/admin/course/${id}/original`, {_method: 'PUT', ...formData}, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            statusUpdate.value = data.data
        }

        return {courseDetail, isEdit, statusUpdate, getCourseDetail, updateCourse}
    },
    {
        persist: {
            enabled: true
        }
    })