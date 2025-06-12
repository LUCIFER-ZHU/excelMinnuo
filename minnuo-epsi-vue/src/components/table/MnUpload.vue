<template>
  <el-upload
    ref="uploadRef"
    class="upload-demo"
    action="#"
    :on-change="handleChange"
    :on-remove="handleRemove"
    :before-remove="handleBeforeRemove"
    :file-list="fileList"
    :auto-upload="false"
    list-type="picture">

    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>

<script>
export default {
  props: {
    // 输入0表示无限
    limit: {
      type: Number,
      default: 1,
      required: false
    },
    isRemove: {
      type: Boolean,
      default: false,
      required: false
    },
    multiple:{
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      fileList: [],
      fileTemp: [],
    };
  },
  methods: {
    // 当文件选择发生变化时触发
    handleChange(file, fileList) {
      let len = fileList.length
      if(len > this.limit && this.limit !== 0) {
        this.fileList.shift()
      }
      this.fileList.push(file);
    },

    handleBeforeRemove(file, fileList) {
      // 判断是否可以删除如果为true则开启删除，为false则关闭删除开启比较
      if(this.isRemove){
        return;
      }
      // 深度比较
      let len = this.fileList.length;
      for(let i = 0; i < len; i++){
        if(this.deepEqual(file,this.fileTemp[i])){
          return false;
        }
      }
    },
    handleRemove(file, fileList) {
      this.fileList = this.removeObjectFromArray(this.fileList,file);
      if(this.isRemove){
        return;
      }

      if(fileList.length < 1){
        this.fileList = this.fileTemp;
      }
    },
    // 数组中删除元素的方法
    removeObjectFromArray(arr, obj) {
      return arr.filter(item => !Object.keys(obj).every(key => item[key] === obj[key]));
    },
    getFile(){
      let len = this.fileList.length;
      // 如果结果为0则返回null

      if(len === 0){
        if(this.limit === 1){
          return null;
        }
        return [];
      }

      // 如果长度为1则返回File
      if(len === 1 && this.limit === 1){
        return this.fileList[0].raw;
      }

      // 如果上面的条件都不满足
      let fileRaw = [];
      for(let i = 0;i < len; i++){
        fileRaw.push(this.fileList[i].raw);
      }
      return fileRaw;
    },
    /**
     * 加载方法，用于加载父级组件传递的内容
     * */
    loadData(fileName){
      //1、通过内容获取
      if(fileName instanceof Array){
        fileName.forEach(item => {
          this.requestPicture(item);
        })
        return;
      }
      this.requestPicture(fileName);
    },
    requestPicture(fileName){
      if(fileName === '' || fileName === null || fileName === undefined){
        return;
      }

      this.$request.get(`/file/download`,{
        params: { fullPath: fileName },
        responseType: 'blob'
      }).then(res => {
        const raw = new File([res.data],fileName,{type: res.headers["content-type"]});
        let fileObj = {
          name: fileName,
          raw: raw,
          size: res.data.size,
          url: this.$getOSSPrefix(fileName)
        }
        this.fileTemp.push(fileObj);
        this.fileList.push(fileObj);
      }).catch(err => {

      })
    },
    // 深度比较算法 -- 比较对象的所有属性是否一致包括嵌套对象
    deepEqual(obj1, obj2) {
      if (obj1 === obj2) {
        return true;
      }

      if (typeof obj1!== 'object' || obj1 === null || typeof obj2!== 'object' || obj2 === null) {
        return false;
      }

      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      if (keys1.length!== keys2.length) {
        return false;
      }
      for (let key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
          return false;
        }
      }
      return true;
    },
    /**
     * 清理方法，用于将组件初始化
     * */
    clear(){
      this.fileList = []
      this.fileTemp = []
      this.$refs.uploadRef.clearFiles()
    },
  }
};
</script>
