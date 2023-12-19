import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import api from "../apis";

export const useCategoryStore = defineStore('categoryStore', () => {
        const listCategory = ref([])
        const categoryDetail = ref([])

        async function getListCategory() {
            const {data} = await api.get('api/admin/category/active')
            listCategory.value = data.data
        }

        async function getListCategoryWithPagination(query = 'page=1&perPage=10') {
            const {data} = await api.get('api/admin/category/overall?' + query)
            listCategory.value = data.data.data
            return data.data
        }

        async function getCategoryDetail(id) {
            const {data} = await api.get(`api/admin/category/${id}`)
            categoryDetail.value = data.data
        }

        async function addCategory(formData) {
            try {
                await api.post('api/admin/category/add', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                })
            } catch (error) {
                return error.response.data.errors
            }
        }

        async function updateCategory(id, formData) {
            try {
                await api.post(`api/admin/category/${id}`, {_method: 'PUT', ...formData}, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                })
            } catch (error) {
                return error.response.data.errors
            }
        }

        return {
            listCategory,
            categoryDetail,
            getListCategory,
            getListCategoryWithPagination,
            addCategory,
            getCategoryDetail,
            updateCategory
        }
    },
    {
        persist: {
            enabled: true
        }
    })