import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import * as filters from './filters'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import uploader from 'vue-simple-uploader'
import { formatTimestamp } from '@/utils/pageUtils'
// 用编辑器
import QuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import routes from './routes'
import axios from 'axios'
import request from './api/index'
import 'font-awesome/css/font-awesome.min.css'
import './assets/iconfonts/iconfont.css'

// 导入常量和函数
import { API_BASE_URL, getAPIURL, getOSSPrefix } from './constants'

// 方法和路径导入
Vue.prototype.$API_BASE_URL = API_BASE_URL
Vue.prototype.$getAPIURL = getAPIURL
Vue.prototype.$getOSSPrefix = getOSSPrefix
Vue.prototype.$axios = axios;
Vue.prototype.$request = request;

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(QuillEditor)
Vue.use(Vuex)
Vue.use(uploader)

Vue.filter('formatTimestamp', (timestamp, format = 'YYYY-MM-DD HH:mm:ss') => {
  return formatTimestamp(timestamp, format)
})

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('user')
  }
  let user = JSON.parse(sessionStorage.getItem('user'))
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

