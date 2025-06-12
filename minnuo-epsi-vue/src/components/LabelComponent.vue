<template>
  <div>
    <el-tag
      :key="index"
      v-for="(tag,index) in label"
      closable
      :disable-transitions="false"
      @close="handleLabelClose(tag)">
      {{tag}}
    </el-tag>

    <el-input
      class="input-new-tag"
      v-if="labelVisible"
      v-model="labelInputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleLabelsConfirm"
      @blur="handleLabelsConfirm">
    </el-input>

    <el-button v-else class="button-new-tag" size="small" @click="showLabelInput">+ 新标签</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      label: [],
      labelVisible: false,
      labelInputValue: ''
    }
  },
  methods: {
    handleLabelClose(tag) {
      this.label.splice(this.label.indexOf(tag), 1)
    },
    handleLabelsConfirm(){
      let inputValue = this.labelInputValue
      if (inputValue) {
        this.label.push(inputValue)
      }
      this.labelVisible = false
      this.labelInputValue = ''
    },
    showLabelInput(){
      this.labelVisible = true
      // this.$nextTick(_ => {
      //   this.$refs.saveTagInput.$refs.input.focus()
      // })
    },
    // 常见操作
    reloadLabels(labels){
      // 渲染父级传入的值
      labels.forEach(label => {
        this.label.push(label)
      })
    },
    getLabel(){
      return this.label
    },
    init(){
      this.label = []
      this.labelVisible = false
      this.labelInputValue = ''
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
