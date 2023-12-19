import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import account from "../../api/account";
import api from "../apis";

export const useUserStore = defineStore('userStore', () => {
        const listAccountClient = ref([])
        const listAccountCms = ref([])

        async function getListAccountClient(query = 'page=1&perPage=10') {
            const {data} = await api.get('api/admin/account/client?' + query)
            listAccountClient.value = data.data.data
            return data.data
        }

        async function getListAccountCms(query = 'page=1&perPage=10') {
            const {data} = await api.get('api/admin/account/cms?' + query)
            listAccountCms.value = data.data.data
            return data.data
        }

        async function addAccount(formData) {
            const {data} = await api.post('api/admin/account/add', formData)
        }

        return {listAccountClient, listAccountCms, getListAccountClient, getListAccountCms, addAccount}
    }
);