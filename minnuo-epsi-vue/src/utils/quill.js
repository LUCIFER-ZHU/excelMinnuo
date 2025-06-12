import axios from 'axios'
import { API_BASE_URL,API_PORT,getAPIURL,getImageUrl,getTempUrl } from '../constants';

// 上传功能
export async function uploadMedia(file,where) {
     // 创建请求对象
     const formData = new FormData();
     formData.append('file',file)
     formData.append('where',where)

    //发送请求
     const response = await axios.post(getAPIURL("/file/uploadOSS"), formData,{
          headers:{
               'Content-Type':'multipart/form-data'
          }
     });
     return response.data;
}

//删除功能
export async function deleteMedia(filePath) { 
     //发送请求
     // const response = await axios.post(getAPIURL(`/RTE/deleteMedio/${filePath}`))
     // 封装请求对象
     const formData = new FormData();
     formData.append('filePath',filePath)

     //发送请求
     const response = await axios.post(getAPIURL("/file/deleteOSS"), formData,{
          headers:{
               'Content-Type':'multipart/form-data'
          }
     });

     return response.message;   
}

// 显示方法
export function getMediaUrl(moduleName,type,fileName){
     return `${API_BASE_URL}:${API_PORT}/${type}/${moduleName}/${fileName}`;
}

export function getMediaUrl2(type,fileName){
     return `${API_BASE_URL}:${API_PORT}/RTE/showMedio/${type}${fileName}`;
}