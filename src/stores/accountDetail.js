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
                    cms: false,
                    client: false,
                },
                course: {
                    view: false,
                    update: false,
                    create: false,
                    approve: false,
                },
                account: {
                    cms: {
                        view: false,
                        update: false,
                        create: false,
                    },
                    client: {
                        view: false,
                        closure: false,
                    }
                },
            }
            data.forEach(function (permission) {
                switch (permission.toUpperCase()) {
                    case "LOGIN_CMS":
                        result.login.cms = true;
                        break;
                    case "LOGIN_CLIENT":
                        result.login.client = true;
                        break;
                    case "COURSE_VIEW":
                        result.course.view = true;
                        break;
                    case "COURSE_CREATE":
                        result.course.create = true;
                        break;
                    case "COURSE_UPDATE":
                        result.course.update = true;
                        break;
                    case "COURSE_APPROVE":
                        result.course.approve = true;
                        break;
                    case "ACCOUNT_CMS_VIEW":
                        result.account.cms.view = true;
                        break;
                    case "ACCOUNT_CMS_UPDATE":
                        result.account.cms.update = true;
                        break;
                    case "ACCOUNT_CMS_CREATE":
                        result.account.cms.create = true;
                        break;
                    case "ACCOUNT_CLIENT_VIEW":
                        result.account.client.view = true;
                        break;
                    case "ACCOUNT_CLIENT_CLOSURE":
                        result.account.client.closure = true;
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