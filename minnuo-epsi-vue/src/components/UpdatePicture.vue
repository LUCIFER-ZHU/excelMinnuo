<template>
  <el-upload
    class="upload-demo"
    action="#"
    :file-list="fileList"
    :on-remove="handleRemove"
    :on-change="handleChange"
    :before-remove="handleBeforeRemove"
    :auto-upload="false"
    list-type="picture">

    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      fileListTemp: [],
      // 当前文件对象
      nowFile: ''
    };
  },
  methods: {
    handleRemove(file, fileList){
      // 再回显
      this.fileList = []
      this.fileList = this.fileListTemp
    },
    handleChange(file,fileList){
      // 切换图片
      this.fileList = []
      this.fileList[0] = {name: file.name,url: file.url}

      // 切换当前上传对象
      this.nowFile = file.raw
    },
    handleBeforeRemove(file,fileList){
      // 判断是否和当前的内容相同，如果相同则不允许被删除
      if(file.name === this.fileListTemp[0].name) {
        return false
      }
    },
    // 显示父级模块向当前模块传递内容
    reloadEditPicture(fileName) {
      // 1、向组件中添加显示的内容
      const item = {name: fileName,url: this.$getOSSPrefix(fileName)};

      this.fileList = [];
      this.fileList[0] = item;

      // 初始化图片
      const imageBlob = new Blob([],{type: 'image/jpeg'});
      const file = new File([imageBlob],fileName,{
        type: "image/jpeg",
        lastModified: Date.now()
      });
      this.nowFile = file

      //2、将组件中的内容进行缓存
      this.fileListTemp = this.fileList
    },
    // 清楚所有内容
    init(){
      this.fileList = []
      this.fileListTemp = []
      this.nowFile = ''
    },
    // 获取上传的图片
    getFile(){
       return this.nowFile
    }
  }
}
</script>

<style scoped lang="less">

</style>
