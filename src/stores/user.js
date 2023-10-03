import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import account from "../../api/account";

export const useUserStore = defineStore('userStore', () => {
        const listAccountClient = ref([])
        const listAccountCms = ref([])

        function getListAccountClient() {
            account.getListAccountClient().then(function (data) {
                listAccountClient.value = data.data
            })
        }

        async function getListAccountCms() {
            await account.getListAccountCms().then(function (data) {
                listAccountCms.value = data.data
            })
        }

        return {listAccountClient, listAccountCms, getListAccountClient, getListAccountCms}
    }
);