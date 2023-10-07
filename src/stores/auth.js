import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import router from "../router";
import api from "../apis";

export const useAuthStore = defineStore('authStore', () => {
        const isAuthenticate = ref(false)
        const user = ref({
            name: null,
            email: null,
            permissions: [],
        })

        // const doubleCount = computed(() => count.value * 2)
        async function login(formData) {
            try {
                await api.get(`sanctum/csrf-cookie`)
                const {data} = await api.post('login', formData)
                isAuthenticate.value = true
                user.value = data
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

        return {isAuthenticate, user, login, logout, forgotPassword, resetPassword}
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