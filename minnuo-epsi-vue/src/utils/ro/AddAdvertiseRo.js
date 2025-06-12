import axios from 'axios'
import { getAPIURL } from '../../constants'
import api from '@/api/index'
import { Message } from 'element-ui'

// 处理Advertise的添加请求对象
class AddAdvertiseRo{
  constructor(file,bigTitle,smallTitle,link,sorting){
    this.file=file;
    this.bigTitle=bigTitle;
    this.smallTitle=smallTitle;
    this.link=link;
    this.sorting=sorting;
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

  // 将数据转换为
  prepareFormData(){
    const formData = new FormData();
    Object.keys(this).forEach(key => {
      const value = this[key];
      //封装
      if(value instanceof Array) {
        if(value.length > 0){
          formData.append(key, value);
        }
      }
      else if(value !== null && value !== undefined && value !== '') {
        if(key === 'bigTitle' || key === 'smallTitle'){
          formData.append(key, value.replace(/\n/g, '<br>'));
        }else{
          formData.append(key, value);
        }
      }
    });

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
    api.post("/advertise/add",formData,{
      "Content-Type": 'multipart/form-data'
    }).then(response => {
        return callback(response);
    })
  }

  //发送方法，这是调用所有方法的地方
  async send(method = 'post',url = getAPIURL('/advertise/addAdvertise')){

    //校验参数
    // this.validate();

    // 准备请求参数
    const formData = this.prepareFormData();
    //发送请求
    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      return 200;
    })

  }
}

export default AddAdvertiseRo;
