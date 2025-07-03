<template>
  <el-upload ref="uploadRef" class="upload-demo asyc" :action="$API_BASE_URL + '/file/uploadToOss/' + where"
    :on-success="onSuccess" :on-remove="onRemove" :on-exceed="onExceed" :limit="limit" :file-list="fileList"
    list-type="picture">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
  </el-upload>
</template>

<script>
export default {
  props: {
    where: {
      type: String,
      required: true
    },
    // 输入0表示无限
    limit: {
      type: Number,
      default: 0,
      required: false
    },
    // 初始文件
    initFiles: {
      type: Array,
      default: () => [],
      required: false
    },
    //超出提示
    exceedMessage: {
      type: String,
      default: '超出上传数量',
      required: false
    }
  },
  data() {
    return {
      files: [],
      fileList: []
    }
  },
  methods: {
    // 超出限制
    onExceed(files, fileList) {
      // 将这个方法委派到父级组件绑定
      this.$message.error(this.exceedMessage);
    },
    // 成功的时候
    onSuccess(response, file, fileList) {
      console.log("添加成功")
      // 上传成功在数组最后添加内容
      if (response.success) {
        this.files.push(response.url)
        this.fileList.push({
          name: response.url,
          url: this.$getOSSPrefix(response.url)
        })
      }
    },
    onRemove(file, fileList) {
      let index = this.files.indexOf(file.name)
      this.files.splice(index, 1)
      this.fileList.splice(index, 1)
    },
    getFile() {
      let len = this.fileList.length;
      // 如果结果为0则返回null

      if (len === 0) {
        if (this.limit === 1) {
          return null;
        }
        return [];
      }

      // 如果长度为1则返回File
      if (len === 1 && this.limit === 1) {
        return this.fileList[0].name;
      }

      // 如果上面的条件都不满足
      let fileStrArr = [];
      for (let i = 0; i < len; i++) {
        fileStrArr.push(this.fileList[i].name);
      }
      console.log('uploadAsyc-getFile', fileStrArr);
      return fileStrArr;
    },
    /**
     * 清理方法，用于将组件初始化
     * */
    clear() {
      this.fileList = []
      this.files = []
      this.$refs.uploadRef.clearFiles()
    },
  },
  // 组件创建的时候检测initFiles是否为空如果不为空则赋值，如果为空则不赋值
  created() {
    // 如果initFiles为0的时候跳出方法
    if (this.initFiles.length === 0) {
      return
    }
    // 不为空执行渲染操作
    this.fileList = this.initFiles.map(item => ({
      name: item,
      url: this.$getOSSPrefix(item)
    }));
    // 将数据直接赋值给files
    this.files = this.initFiles
    console.log('asyc-created', this.files);
  },
  beforeDestroy() {
    this.files = []
  }
}
</script>
