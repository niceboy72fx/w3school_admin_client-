import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import api from "../apis";

export const useCategoryStore = defineStore('categoryStore', () => {
        const listCategory = ref([])

        async function getListCategory() {
            const {data} = await api.get('api/admin/category/overall')
            listCategory.value = data.data
        }

        return {listCategory, getListCategory}
    },
    {
        persist: {
            enabled: true
        }
    })