import axios from 'axios'
import { getAPIURL } from '../../constants'
import api from '@/api/index'
import { Message } from 'element-ui'

class AddArticleRo{
  constructor(title,summary,label,type,file,author,keywords,description,seoPath,seoScript,source,sorting) {
    this.title = title;
    this.summary = summary;
    this.label = label;
    this.type = type;
    this.file = file;
    this.author = author;
    this.keywords = keywords;
    this.description = description;
    this.seoPath = seoPath;
    this.seoScript = seoScript;
    this.source = source;
    this.sorting = sorting;
  }

  // 全空判别器，用于验证参数是否都为空，如果都为空则返回true
  isAllNull(){
    let flag = true;
    Object.keys(this).forEach(key => {
      const value = this[key];
      if(value instanceof Array){
        if(value.length > 0){
          flag = false;
        }
      }else if(value !== null && value !== undefined && value !== '') {
        flag = false;
        return;
      }
    })
    return flag
  }

  prepareFormData(){
    const formData = new FormData();

    Object.keys(this).forEach(key => {
      const value = this[key];
      //
      if(value instanceof Array) {
        if(value.length > 0){
          formData.append(key, value);
        }
      }else if(value !== null && value !== undefined && value !== '') {
        formData.append(key, value);
      }
    })

    return formData;
  }

  request(callback){
    // 调用全空判别器判断是否为空
    if(this.isAllNull()){
      Message({type: 'error',message: "不能上传全空内容"});
      return callback(false);
    }

    // 转换参数
    const formData = this.prepareFormData();

    api.post("/article/add",formData,{
      "Content-Type": 'multipart/form-data'
    }).then(response => {
      return callback(response);
    })
  }

  // 发送请求---弃用
  async send(method = 'post',url = getAPIURL('/article/addArticle')) {
    // form表单
    const formData = this.prepareFormData();
    // 发送请求
    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      return response.data;
    })
  }
}
export default AddArticleRo;
