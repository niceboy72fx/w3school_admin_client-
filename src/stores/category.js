import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import api from "../apis";

export const useCategoryStore = defineStore('categoryStore', () => {
        const listCategory = ref([])

        async function getListCategory() {
            const {data} = await api.get('api/admin/category/active')
            listCategory.value = data.data
        }

        async function getListCategoryWithPagination(query = 'page=1&perPage=10') {
            const {data} = await api.get('api/admin/category/overall?' + query)
            listCategory.value = data.data.data
            return data.data
        }

        async function addCategory

        return {listCategory, getListCategory, getListCategoryWithPagination, addCategory}
    },
    {
        persist: {
            enabled: true
        }
    })