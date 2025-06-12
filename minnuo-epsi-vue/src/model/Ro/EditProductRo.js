import AddProductRo from './AddProductRo'
import api from '@/api/index'

class EditProductRo extends AddProductRo{
  constructor(id,name,intro,type,productImage,content,seriesName,seriesTitle,seriesIntro,keywords,description,seoPath,seoScript,sorting,productModels,heightLights,FAQ){
    super(name,intro,type,productImage,content,seriesName,seriesTitle,seriesIntro,keywords,description,seoPath,seoScript,sorting,productModels,heightLights,FAQ)
    this.id = id
  }

  request(callback){
    let formatData = this.process();

    api.put('/product/update',formatData,{
      "Content-Type": 'multipart/form-data'
    }).then(response => {
      return callback(response,null);
    }).catch(error => {
      return callback(null,error);
    })
  }
}

export default EditProductRo;
