// src/utils/axios.js
import axios from 'axios'
import { Message } from 'element-ui'

// 创建 axios 实例
const instance = axios.create({
  // baseURL: 'https://mn-cncsolutions.com', // 设置你的 API 基础地址
  baseURL: 'https://mncnc.com', // 设置你的 API 基础地址
  // baseURL: 'http://192.168.10.15:10800', // 设置你的 API 基础地址
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在请求发送之前，可以做一些处理
    // console.log('Request Interceptor:', config)

    // 比如设置请求头
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`
    // }

    return config // 返回配置
  },
  (error) => {
    // 请求错误时
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 超时计算
    return response // 返回响应数据
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
