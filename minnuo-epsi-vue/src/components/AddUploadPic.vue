<template>
  <el-upload ref="uploadRef" class="upload-demo" action="#" :on-change="handleChange" :on-remove="handleRemove"
    :file-list="fileList" :auto-upload="false" list-type="picture">

    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],  // 存储文件列表
      lastSelectedFile: null, // 记录最后一次选择的文件
      fileListTemp: []
    };
  },
  methods: {
    // 当文件选择发生变化时触发
    handleChange(file, fileList) {
      // console.log(this.$refs.uploadRef.$options)
      this.fileList = []
      this.fileList[0] = { name: file.name, url: file.url }
      this.lastSelectedFile = file.raw;
      // 将新的值传递给父级组件
      this.$emit('lastSelectedFile', this.lastSelectedFile);
    },
    // 当文件被移除时触发
    handleRemove(file, fileList) {
      // 更新显示的文件列表
      this.fileList = []
      this.lastSelectedFile = null
      // 将新的值传递给父级组件
      this.$emit('lastSelectedFile', this.lastSelectedFile);
    },
    initComponent() {
      // 初始化配置
      this.lastSelectedFile = null
      this.$refs.uploadRef.clearFiles()
    },
    getFile() {
      return this.lastSelectedFile
    },
    reloadData(file) {
      this.fileList = []
      this.fileList[0] = { name: file.name, url: this.$getOSSPrefix(file.name) }
      this.lastSelectedFile = file;
      this.$emit('lastSelectedFile', this.lastSelectedFile);
    }
  }
};
</script>
