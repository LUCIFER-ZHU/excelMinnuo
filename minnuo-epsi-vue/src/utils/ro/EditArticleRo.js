import api from '@/api/index'
import { Message } from 'element-ui'
import AddArticleRo from './AddArticleRo'

class EditArticleRo extends AddArticleRo {
  constructor(id,title,summary,label,type,file,author,keywords,description,seoPath,seoScript,source,sorting) {
    super(title,summary,label,type,file,author,keywords,description,seoPath,seoScript,source,sorting)
    this.id = id;
  }

  request(callback){
    // 调用全空判别器判断是否为空
    if(super.isAllNull()){
      Message({type: 'error',message: "不能上传全空内容"});
      return callback(false);
    }

    // 转换参数
    const formData = super.prepareFormData();
    console.log(formData.get('id'))
    api.put("/article/update",formData,{
      "Content-Type": 'multipart/form-data'
    }).then(response => {
      return callback(response);
    })
  }
}

export default EditArticleRo;

