
import { createApp } from 'vue' //กำลังอ้างอิงใน library
import { createPinia } from 'pinia' //จัดการ state ของ data
//import ไม่มีปีกกา = ชื่อที่กำหนดขึ้นมาเอง from ที่อยู่ไฟล์ (แต่ควรตั้งชื่อให้เหมือนกัน)
import App from './App.vue' //อ้างอิงไฟล์จาก main.js ต้องอ้างอิงไฟล์เสมอ
import router from './router'

// import './assets/main.css'
import './assets/index.css'
import 'flowbite';

const app = createApp(App)

import axios from 'axios'
const axiosInstance = axios.create({
    baseURL: "http://localhost/api" // laravel api base
})
app.config.globalProperties.$axios ={...axiosInstance}

app.use(createPinia()) // ใช้งาน pinia
app.use(router)

app.mount('#app')
