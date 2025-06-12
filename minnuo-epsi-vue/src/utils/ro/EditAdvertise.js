import AddAdvertiseRo from './AddAdvertiseRo'
import { Message } from 'element-ui'

class EditAdvertise extends AddAdvertiseRo{
  constructor(id,file,bigTitle,smallTitle,link,sorting) {
    super(file,bigTitle,smallTitle,link,sorting)
    this.id = id
  }

  request(callback){
    const formData = this.prepareFormData();
    console.log(formData)

    this.$request.put("/advertise/edit",formData,{
      "Content-Type": 'multipart/form-data'
    }).then(response => {
      return callback(response);
    })
  }
}
