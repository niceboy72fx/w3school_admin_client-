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
            try {
                await api.post(`api/admin/account/${id}`, {_method: 'PUT', ...convertBooleanToNumeric(formData)}, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                })
            } catch (error) {
                return error.response.data.errors
            }
            // statusUpdate.value = data.data
        }

        function convertBooleanToNumeric(obj) {
            if (typeof obj !== 'object' || obj === null) {
                return obj;
            }

            const newObj = {};

            for (const key in obj) {
                if (typeof obj[key] === 'boolean') {
                    newObj[key] = obj[key] ? 1 : 0;
                } else if (Array.isArray(obj[key])) {
                    newObj[key] = obj[key].map(item => convertBooleanToNumeric(item));
                } else if (typeof obj[key] === 'object') {
                    newObj[key] = convertBooleanToNumeric(obj[key]);
                } else {
                    newObj[key] = obj[key];
                }
            }

            return newObj;
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