import {createApp} from 'vue'
import {createPinia} from 'pinia'
import piniaPersist from 'pinia-plugin-persist';

import App from './App.vue'
import router from './router'
import './style.css'
import {useAuthStore} from "./stores/auth";

const app = createApp(App)
app.use(createPinia().use(piniaPersist))
app.use(router)
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    if(!authStore.isAuthenticate){
        switch (to.name) {
            case 'login':
            case 'forgot-password':
                next();
                break;
            default:
                next({name: 'login'});
                break;
        }
    }
    else if (authStore.isAuthenticate && (to.name === 'login' || to.name === 'forgot-password')) next({name: 'dashboard'})
    else next()
})

app.mount('#app')
