import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from "axios";

import App from './App.vue'
import router from './router'
import './style.css'

import Default from "./layouts/auth.vue";
import Custom from "./layouts/GuestLayout.vue";
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('default', Default)
app.component('custom', Custom)

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

app.mount('#app')
