import {ref} from 'vue'
import {defineStore} from 'pinia'
import api from "../apis";

export const useExampleStore = defineStore('exampleStore', () => {
        const listExample = ref([])
        const exampleDetail = ref([])

        async function getListExample(query = '') {
            const {data} = await api.get(`api/admin/example/all?` + query)
            listExample.value = data.data
            return data.data
        }

        async function updateExample(id, formData) {
            try {
                await api.post(`api/admin/example/${id}`, {_method: 'PUT', ...formData}, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                })
            } catch (error) {
                return error.response.data.errors
            }
        }

        async function getExampleDetail(id) {
            const {data} = await api.get(`api/admin/example/${id}`)
            exampleDetail.value = data.data
        }

        async function addExample(formData) {
            try {
                await api.post('api/admin/example/add', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                })
            } catch (error) {
                return error.response.data.errors
            }
        }

        async function getListExampleWithPagination(query = 'page=1&perPage=10') {
            const {data} = await api.get('api/admin/example/overall?' + query)
            listExample.value = data.data.data
            return data.data
        }

        return {listExample, exampleDetail, getListExampleWithPagination, getListExample, getExampleDetail, updateExample, addExample}
    },


    {
        persist: {
            enabled: true
        }
    })