import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import moment from "moment";
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import axios from "./axios/config";

const app=createApp(App)
app.use(ElementPlus)
app.use(Vuex)
app.use(store)
app.use(moment)
app.config.globalProperties.$axios = axios
app.use(router).mount('#app')


