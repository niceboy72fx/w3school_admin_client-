import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import account from "../../api/account";
import api from "../apis";
import {USER_STATUS} from "../constant/user";

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

        async function updateAccount(id, formData) {
            const {data} = await api.post(`api/admin/account/${id}`, {_method: 'PUT', ...formData}, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            // statusUpdate.value = data.data
        }

        return {
            listAccountClient,
            listAccountCms,
            getListAccountClient,
            getListAccountCms,
            addAccount,
            updateAccount,
        }
    }
);