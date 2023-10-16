import {createApp} from 'vue'
import {createPinia} from 'pinia'
import piniaPersist from 'pinia-plugin-persist';

import App from './App.vue'
import router from './router'
import './style.css'
import helper from "./plugins/helper";
// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap"

const app = createApp(App)
app.use(createPinia().use(piniaPersist))
app.use(router)
app.use(helper)
app.mount('#app')
