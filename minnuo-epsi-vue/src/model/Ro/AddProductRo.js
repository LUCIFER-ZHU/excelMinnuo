import axios from 'axios'
import { getAPIURL } from '../../constants'
import api from '@/api/index'
import HeightLightModel from './HeightLightModel'
import ProductModel from './ProductModel'

class AddProductRo{
  constructor(name,intro,type,productImage,content,seriesName,seriesTitle,seriesIntro,keywords,description,seoPath,seoScript,sorting,productModels,heightLights,FAQ){
    this.name=name;
    this.intro=intro;
    this.type=type;
    this.productImage=productImage;
    this.content=content;
    this.seriesName=seriesName;
    this.seriesTitle=seriesTitle;
    this.seriesIntro=seriesIntro;
    this.keywords=keywords;
    this.description=description;
    this.seoPath=seoPath;
    this.seoScript=seoScript;
    this.sorting=sorting;
    this.productModels=productModels;
    this.heightLights=heightLights;
    this.FAQ=FAQ;
    this.formData = new FormData();
  }

  // 方法处理所有字段
  process() {
    Object.keys(this).forEach(key => {
      const value = this[key];
      this.handleField(key, value);
    });
    return this.formData;
  }

  // 处理方法
  handleField(key, value) {
    // 空值判断
    if (value === undefined || value === null || value.length === 0 || value === '') {
      return;
    }

    // 根据字段类型选择处理方法
    if (value instanceof File) {
      this.appendFile(key, value);
    } else if (key === 'productModels') {
      this.handleProductModes(value);
    } else if (key === 'heightLights') {
      this.handelheightLights(value);
    } else if (key === 'FAQ') {
      this.handleFAQ(value);
    } else {
      this.formData.append(key, value);
    }
  }

  appendFile(key, file) {
    this.formData.append(key, file, file.name);
  }

  //处理ProductMode封装到FormData中
  handleProductModes(value){
    if(value === undefined || value === null || value.length === 0 || value === ''){
      return;
    }

    value.forEach((proModel,index) => {
      // 判断对象是否应该封装
      if(!(proModel instanceof ProductModel) || proModel.isAllNull()){
          return;
      }

      //封装
      if(proModel.modelName !== ''){
        this.formData.append(`productModels[${index}].modelName`,proModel.modelName);
      }

      //循环放入文件内容
      proModel.modelFile.forEach((file) => {
        this.formData.append(`productModels[${index}].modelFile`,file);
      })

      //放入详细信息
      proModel.modelDetails.forEach((detail,detailIndex) => {
        this.formData.append(`productModels[${index}].modelDetails`, encodeURIComponent(detail));
      })
    })
  }

  //处理ProductMode封装到FormData中
  handelheightLights(value){
    if(value === undefined || value === null || value.length === 0 || value === ''){
      return;
    }

    value.forEach((heightLight,index) => {
      // 判断是否需要封装
      if(!(heightLight instanceof HeightLightModel) || heightLight.isAllNull()){
        return;
      }

      //判断是否封装图片
      if(heightLight.file !== undefined){
        this.formData.append(`heightLights[${index}].file`,heightLight.file);
      }

      // 判断是否封装简介
      if(heightLight.intro !== ""){
        this.formData.append(`heightLights[${index}].intro`,heightLight.intro);
      }

      // 判断是否封装亮点
      heightLight.summarize.forEach((summarize) => {
        this.formData.append(`heightLights[${index}].summarize`,encodeURIComponent(summarize));
      })
    })
  }

  // 处理FAQ
  handleFAQ(value){
    if(value === undefined || value === null || value.length === 0 || value === ''){
      return;
    }
    // 循环
    value.forEach((faq, index) => {
      // 判断是否需要封装
      if(faq.question !== ""){
        this.formData.append(`FAQ[${index}].question`, faq.question);
      }

      // 判断是否需要封装
      if(faq.answer !== ""){
        this.formData.append(`FAQ[${index}].answer`, faq.answer);
      }
    });
  }

  // 发送请求
  request(callback){
    let formatData = this.process();

    // for (const [key, value] of formatData.entries()) {
    //   console.log(key, value);
    // }

    api.post('/product/add',formatData,{
        "Content-Type": 'multipart/form-data'
    }).then(response => {
      return callback(response,null);
    }).catch(error => {
      return callback(null,error);
    })
  }

  //发送方法，这是调用所有方法的地方 --- 旧的发送请求方法
  // async send(method = 'post',url = getAPIURL('/product/addProduct')){
  //   // 准备请求参数
  //   const formData = this.prepareFormData();
  //
  //   //发送请求
  //   const response = await axios.post(url, formData, {
  //     headers: {'Content-Type': 'multipart/form-data'}
  //   });
  //
  //   return response.data;
  // }

}

export default AddProductRo;
