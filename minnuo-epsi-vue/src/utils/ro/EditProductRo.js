import AddProductRo from './AddProductRo'
import axios from 'axios'
import { getAPIURL } from '../../constants'

class EditProductRo extends AddProductRo{
  constructor(id,name,intro,type,productImage,content,seriesName,seriesTitle,seriesIntro,paramListPic,keywords,description,seoPath,sorting,productModels,heightLights,FAQ){
    super(name,intro,type,productImage,content,seriesName,seriesTitle,seriesIntro,paramListPic,keywords,description,seoPath,sorting,productModels,heightLights,FAQ)
    this.id = id
  }

  // 校对器，验证是否合法
  validate() {

  }

  //发送方法，这是调用所有方法的地方
  async send(method = 'post',url = getAPIURL('/product/updateProduct')){
    // 准备请求参数
    const formData = this.prepareFormData();

    //发送请求
    const respones = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return respones.data;
  }
}

export default EditProductRo;
