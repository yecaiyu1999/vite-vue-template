import { createApp } from 'vue'
import router from './router'
import { setupRouterGuard } from './router/guard/index'
import store, { setupStore } from './store'
import { setupGlobalProperties } from './global'

// tailwindcss
import './assets/css/tailwindcss.scss'

//iconify
import '@purge-icons/generated' // <-- This

import App from './App.vue'

const app = createApp(App)

app.use(router)

app.use(store)

// setup store
setupStore()

// setup router guard
setupRouterGuard()

// 全局注册
setupGlobalProperties(app)

app.mount('#app')
