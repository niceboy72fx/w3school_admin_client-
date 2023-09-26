import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './style.css'

import Default from "./layouts/auth.vue";
import GuestLayout from "./layouts/GuestLayout.vue";
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('default', Default)
app.component('GuestLayout', GuestLayout)

app.mount('#app')
