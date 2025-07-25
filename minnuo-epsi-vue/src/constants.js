// src/constants.js
// export const API_BASE_URL = 'https://mn-cncsolutions.com' // 替换为你的基础地址
export const API_BASE_URL = 'https://mncnc.com' // 替换为你的基础地址
// export const API_BASE_URL = 'http://192.168.10.15:10800' // 替换为你的基础地址
export const API_PORT = 10800 // 替换为你的端口号

// oss相关配置
// 开发环境
// export const HTTPS_PORT = 'https://'
// export const Bucket = 'minnuo-test'
// export const endPoint = 'oss-cn-qingdao.aliyuncs.com'


// export const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;// 替换为你的基础地址
// export const API_PORT = process.env.VUE_APP_API_PORT;// 替换为你的端口号

// // oss相关配置
// // 开发环境
// export const HTTPS_PORT = process.env.VUE_APP_HTTPS_PORT;
// export const Bucket = process.env.VUE_APP_BUCKET;
// export const endPoint = process.env.VUE_APP_ENDPOINT;


// 生产环境
export const HTTPS_PORT = 'https://'
export const Bucket = 'mncncsolutions-com'
export const endPoint = 'oss-us-east-1.aliyuncs.com'

// 拼接一般的请求路径
// export const getAPIURL = (path) => {
//     return `${API_BASE_URL}:${API_PORT}${path}`;
// };

export const getAPIURL = (path) => {
    return `${API_BASE_URL}${path}`
}

// 拼接图片的请求路径
export const getImageUrl = (imageName) => {
    return `${API_BASE_URL}:${API_PORT}/images/${imageName}`
}

// 拼接
export const getTempUrl = (imageName) => {
    return `${API_BASE_URL}:${API_PORT}/temp/${imageName}`
}

// 获取OSS配置
export const getOSSPrefix = (imagePath) => {
    return `${HTTPS_PORT}${Bucket}.${endPoint}/${imagePath}`
}
