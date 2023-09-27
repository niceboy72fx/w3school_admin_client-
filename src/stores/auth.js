import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import auth from "../../api/auth";
import router from "../router";

export const useAuthStore = defineStore('authStore', () => {
        const isAuthenticate = ref(false)
        const user = ref({
            name: null,
            email: null,
            permissions: null,
        })

        // const doubleCount = computed(() => count.value * 2)
        function login(formData) {
            auth.login(formData).then(function (data) {
                console.log(data)
                isAuthenticate.value = true
                user.value.name = data.name
                user.value.email = data.email
                user.value.permissions = data.permissions
                router.push('/').then(r => {
                })
            })
        }

        function logout() {
            auth.logout().then(function () {
                isAuthenticate.value = false
                router.push('/login').then(r => {
                })
            })
        }

        return {isAuthenticate, user, login, logout}
    },
    {
        persist: {
            enabled: true
        }
    })