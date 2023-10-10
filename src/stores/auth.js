import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import router from "../router";
import api from "../apis";
import {PERMISSION} from "../constant/permission";

export const useAuthStore = defineStore('authStore', () => {
        const isAuthenticate = ref(false)
        const user = ref({
            name: null,
            email: null,
            roles: [],
            permissions: {},
        })

        function mapPermissionGroup(data){
            const result = {
                login: {
                    cms: false,
                    client:false,
                },
                course: {
                    view: false,
                    update: false,
                    create: false,
                    approve: false,
                },
                account: {
                    view: false,
                    update: false,
                    create: false,
                },
            }
            data.forEach(function (permission) {
                console.log(permission.toUpperCase())
                switch (permission.toUpperCase()){
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
                    case "ACCOUNT_VIEW":
                        result.course.view = true;
                        break;
                    case "ACCOUNT_CREATE":
                        result.course.create = true;
                        break;
                    case "ACCOUNT_UPDATE":
                        result.course.update = true;
                        break;
                }
            })
            return result
        }
        // const doubleCount = computed(() => count.value * 2)
        async function login(formData) {
            try {
                await api.get(`sanctum/csrf-cookie`)
                const {data} = await api.post('login', formData)
                isAuthenticate.value = true
                user.value.name = data.name
                user.value.email = data.email
                user.value.roles = data.roles
                user.value.permissions = mapPermissionGroup(data.permissions)
                await router.push('/')
            } catch (error) {
                return error.response.data.errors
            }
        }

        async function logout() {
            try {
                const {data} = await api.post('logout')
                isAuthenticate.value = false
                user.value = {
                    name: null,
                    email: null,
                    roles: [],
                    permissions: [],
                }
                await router.push('/login')
            } catch (error) {
                return error.response.data.errors
            }
        }

        async function forgotPassword(formData) {
            await api.post('forgot-password', formData)
        }

        async function resetPassword(formData) {
            await api.post('reset-password', formData)
        }

        async function profile(){
            const {data} = await api.get('/api/admin/user')
            user.value = data.data
        }

        return {isAuthenticate, user, login, logout, forgotPassword, resetPassword, profile}
    },
    {
        persist: {
            enabled: true,
            strategies: [
                {
                    key: 'authStore',
                    storage: localStorage,
                },
            ],
        }
    })