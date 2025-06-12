import axios from 'axios'
import { getAPIURL } from '../../constants'

class AddProductRo{
  formData = new FormData();

  constructor(name,intro,type,productImage,content,seriesName,seriesTitle,seriesIntro,paramListPic,keywords,description,seoPath,sorting,productModels,heightLights,FAQ){
    this.name=name;
    this.intro=intro;
    this.type=type;
    this.productImage=productImage;
    this.content=content;
    this.seriesName=seriesName;
    this.seriesTitle=seriesTitle;
    this.seriesIntro=seriesIntro;
    this.paramListPic=paramListPic;
    this.keywords=keywords;
    this.description=description;
    this.seoPath=seoPath;
    this.sorting=sorting;
    this.productModels=productModels;
    this.heightLights=heightLights;
    this.FAQ=FAQ;
  }


  // 校对器，验证是否合法
  validate() {

  }

  handleFormat(){
    let formData = new FormData();

  }

  //处理ProductMode封装到FormData中
  handleProductMode(model,formData){
    model.forEach((item,index) => {
      // 判断对象是否应该封装
      formData.append(`productModels[${index}].modelName`,item.modelName);
      //循环放入文件内容
      item.modlePicture.forEach((file) => {
        formData.append(`productModels[${index}].modelFile`,file);
      })

      //放入详细信息
      item.modelDetails.forEach((detail) => {
        formData.append(`productModels[${index}].modelDetails`, encodeURIComponent(detail));
      })
    })
  }

  //处理ProductMode封装到FormData中
  handelheightLights(highLight,formData){
    highLight.forEach((item,index) => {
      formData.append(`heightLights[${index}].file`,item.file);
      formData.append(`heightLights[${index}].intro`,item.intro);
      item.summarize.forEach((summarize,summarizeIndex) => {
        formData.append(`heightLights[${index}].summarize`,encodeURIComponent(summarize));
      })
    })
  }


  // 将对象转化为 formData 格式
  prepareFormData(){
    const formData = new FormData();

    Object.keys(this).forEach(key => {
      const value = this[key];
      if (value instanceof File) {
        formData.append(key, value, value.name);
      }  else if (key === 'productModels') {
        this.handleProductMode(value,formData);
      } else if (key === 'heightLights') {
        this.handelheightLights(value,formData);
      }
      else if(key === 'FAQ') {
        value.forEach((faq, index) => {
          formData.append(`FAQ[${index}].question`, faq.question);
          formData.append(`FAQ[${index}].answer`, faq.answer);
        });
      }
      else if (Array.isArray(value) || typeof value === 'object') {
          // formData.append(key, value)
        value.forEach(item => {
          formData.append(key, encodeURIComponent(item));
        })
      }else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
    //发送请求
    return formData;
  }

  request(callback){

  }

  //发送方法，这是调用所有方法的地方 --- 旧的发送请求方法
  async send(method = 'post',url = getAPIURL('/product/addProduct')){
    // 准备请求参数
    const formData = this.prepareFormData();

    //发送请求
    const response = await axios.post(url, formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    });

    return response.data;
  }
}

export default AddProductRo;
