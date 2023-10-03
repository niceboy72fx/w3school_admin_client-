import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import course from "../../api/course";

export const useCourseStore = defineStore('courseStore', () => {
        const listApproved = ref([])
        const listPending = ref([])
        const listRejected = ref([])

        function getListApproved() {
            course.getListApproved().then(function (data) {
                listApproved.value = data.data
            })
        }

        return {listApproved, listPending, listRejected, getListApproved}
    },
    {
        persist: {
            enabled: true
        }
    })