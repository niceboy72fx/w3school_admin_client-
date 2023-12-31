import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import api from "../apis";
import {COURSE_STATUS} from "../constant/course";

export const useAccountDetailStore = defineStore('accountDetailStore', () => {
        const isEdit = ref(false)
        const accountDetail = ref({
            name: null,
            email: null,
            roles: [],
            permissions: {},
            status: null,
        })
        const statusUpdate = ref(false)

        function mapPermissionGroup(data) {
            const result = {
                login: {
                    cms: 0,
                    client: 0,
                },
                course: {
                    view: 0,
                    update: 0,
                    create: 0,
                    approve: 0,
                },
                account: {
                    cms: {
                        view: 0,
                        update: 0,
                        create: 0,
                    },
                    client: {
                        view: 0,
                        closure: 0,
                    }
                },
            }
            data.forEach(function (permission) {
                switch (permission.toUpperCase()) {
                    case "LOGIN_CMS":
                        result.login.cms = 1;
                        break;
                    case "LOGIN_CLIENT":
                        result.login.client = 1;
                        break;
                    case "COURSE_VIEW":
                        result.course.view = 1;
                        break;
                    case "COURSE_CREATE":
                        result.course.create = 1;
                        break;
                    case "COURSE_UPDATE":
                        result.course.update = 1;
                        break;
                    case "COURSE_APPROVE":
                        result.course.approve = 1;
                        break;
                    case "ACCOUNT_CMS_VIEW":
                        result.account.cms.view = 1;
                        break;
                    case "ACCOUNT_CMS_UPDATE":
                        result.account.cms.create = 1;
                        break;
                    case "ACCOUNT_CMS_CREATE":
                        result.account.cms.update = 1;
                        break;
                    case "ACCOUNT_CLIENT_VIEW":
                        result.account.client.view = 1;
                        break;
                    case "ACCOUNT_CLIENT_CLOSURE":
                        result.account.client.closure = 1;
                        break;
                }
            })
            return result
        }

        async function getAccountDetail(id) {
            const {data} = await api.get(`api/admin/account/${id}`)
            accountDetail.value.name = data.name
            accountDetail.value.email = data.email
            accountDetail.value.roles = data.roles
            accountDetail.value.status = data.status
            accountDetail.value.permissions = mapPermissionGroup(data.permissions)
            // isEdit.value = accountDetail.value.status !== COURSE_STATUS.INACTIVE && accountDetail.value.status !== COURSE_STATUS.REJECTED
        }

        async function updateAccount(id, formData) {
            const {data} = await api.post(`api/admin/account/${id}`, {_method: 'PUT', ...formData}, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            // statusUpdate.value = data.data
        }

        async function approveAccount(id) {
            const {data} = await api.post(`api/admin/course/${id}/approve`, {_method: 'PUT', status: COURSE_STATUS.PENDING}, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            statusUpdate.value = data.data
        }

        async function rejectAccount(id) {
            const {data} = await api.post(`api/admin/course/${id}/reject`, {_method: 'PUT', status: COURSE_STATUS.PENDING}, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            statusUpdate.value = data.data
        }

        return {accountDetail, isEdit, statusUpdate, getAccountDetail, updateAccount, approveAccount, rejectAccount}
    },
    {
        persist: {
            enabled: true
        }
    })