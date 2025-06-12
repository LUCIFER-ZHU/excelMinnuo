import AddAdvertiseRo from './AddAdvertiseRo'
import api from '@/api/index'
import { Message } from 'element-ui'

class EditAdvertiseRo extends AddAdvertiseRo{
  constructor(id,file,bigTitle,smallTitle,link,sorting) {
    super(file,bigTitle,smallTitle,link,sorting)
    this.id = id
  }

  request(callback){
    const formData = this.prepareFormData();

    api.put("/advertise/edit",formData,{
      "Content-Type": 'multipart/form-data'
    }).then(response => {
      return callback(response);
    })
  }
}

export default EditAdvertiseRo;
