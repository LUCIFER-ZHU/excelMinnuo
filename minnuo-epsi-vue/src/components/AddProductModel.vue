<template>
    <el-container>

      <el-main>
        <el-form v-for="(ruleForm,index) in ruleForm" :key="index" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item><el-button type="danger" size="mini" round class="el-icon-delete formClose" :disabled="flag" @click="topReduce(index)"></el-button></el-form-item>
          <el-form-item label="型号名称" prop="name">
            <el-input v-model="ruleForm.modelName"></el-input>
          </el-form-item>
          <el-form-item label="型号图片" prop="sex">
            <el-upload
              class="upload"
              action="#"
              :file-list="ruleForm.modlePicture"
              :on-change="(file,fileList) => handleChange(file, fileList, index)"
              :on-remove="(file,fileList) => handleRemove(file,fileList,index)"
              :auto-upload="false">
              <el-button size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="型号详情">
            <el-tag :key="ind" v-for="(tag,ind) in ruleForm.modelDetails"
              :disable-transitions="false"
              @close="handleClose(tag,index)" closable>
              {{tag}}
            </el-tag>
            <el-input class="input-new-tag" v-if="inputModel[index].inputVisible" v-model="inputModel[index].inValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(index)"
              @blur="handleInputConfirm(index)">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput(index)">+ New Tag</el-button>
          </el-form-item>
          <!--分割线-->
          <hr class="dashed-line" />
        </el-form>
      </el-main>

      <el-footer>
        <el-form>
          <el-form-item label-width="100px">
            <el-button type="primary" @click="add">+</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="reduce" :disabled="flag"></el-button>
          </el-form-item>
        </el-form>
      </el-footer>
    </el-container>
    <!-- 表单按钮 -->
</template>

<script>
export default {
  data() {
    return {
    // 表单数据
      ruleForm: [
          {
            modelName: '',
            modlePicture: [],
            modelDetails: []
          }
      ],
      list: [],
      // tag正在输入的数据
      inputModel: [
        {
          inValue: '',
          inputVisible: false
        }
      ],
      flag: true
    }
  },
  methods: {
	// 表单添加一行
    add() {
      const arr = { modelName: '', modlePicture: [], modelDetails: [] }
      const arr2 = { inValue: '', inputVisible: false }
      this.ruleForm.push(arr)
      this.inputModel.push(arr2)
      this.flags()
    },
    // 表单减少一行
    reduce() {
      this.ruleForm.length = this.ruleForm.length - 1
      this.flags()
    },
    //顶部删除
    topReduce(index){
      // 移除指定索引的元素
      this.ruleForm.splice(index, 1);
      this.inputModel.splice(index, 1);
      // 重新检查是否需要禁用删除按钮
      this.flags();
    },
    // 判断数组长度
    flags() {
      if (this.ruleForm.length < 2) {
        this.flag = true
      } else {
      	// 先赋值为true再赋为false, 不然会没反应
        this.flag = true
        this.flag = false
      }
    },

    // 标签添加删除函数
    handleClose(tag, index) {
      this.ruleForm[index].modelDetails.splice(this.ruleForm[index].modelDetails.indexOf(tag), 1)
    },
    showInput(index) {
      this.inputModel[index].inputVisible = true
      // 获取焦点---需要优化
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm(index) {
      let inputValue = this.inputModel[index].inValue
      if (inputValue) {
        this.ruleForm[index].modelDetails.push(inputValue)
      }

      this.inputModel[index].inValue = ''
      this.inputModel[index].inputVisible = false
    },

    // 暴露的外部函数
    getData(){
      return this.ruleForm;
    },
    // 重置方法
    resetForm() {
      this.ruleForm = [{modelName: '',modlePicture: [],modelDetails: []}]
      this.inputModel = [{inValue: '',inputVisible: false}];
      this.flag = true;
    },
    // 初始化数据
    initData(data){
      this.ruleForm = []
      this.inputModel = []

      data.forEach((item,index)=>{
        const model = item.modlePicture

        const ite = {
          modelName: item.modelName,
          modlePicture: [],
          modelDetails: item.modelDetails,
        }

        const inp = {
          inValue: '',
          inputVisible: false
        }
        this.inputModel.push(inp)

        let file = '';
        for(var i =0;i < model.length;i++){
          const fileName = model[i];
          const ossImageUrl = this.$getOSSPrefix(fileName)
          // 通过阿里云OSS的服务获取file对象
          fetch(ossImageUrl, {
            method: 'GET',              // 使用GET方法
            headers: {
              'Content-Type': 'application/json' // 可选的请求头（通常对于图片不需要额外设置）
            },
            mode: 'cors'              // 确保请求的模式是 CORS
          })
          .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.blob();   // 将响应转化为 Blob 数据
          })
          .then(blob => {
              // 处理 Blob 数据（例如创建一个 File 对象）
            file = new File([blob],fileName, { type: blob.type });
              // this.ruleForm[index].modlePicture.push(file);
            ite.modlePicture.push(file)
          })
          .catch(error => console.error('Error fetching image:', error));
        }
        this.ruleForm.push(ite);
      })
      this.flags()
    },

    //处理文件上传
    handleChange(file, fileList,index){
      this.ruleForm[index].modlePicture.push(file.raw)
    },
    //处理移除文件操作
    handleRemove(file,fileList,index) {
      this.ruleForm[index].modlePicture = this.ruleForm[index].modlePicture.filter(item => (item.uid !== file.uid && item.name !== file.name))
    }
  }
}
</script>

<style>
.formClose{
  float: right;
}

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

.dashed-line {
  border: none;
  border-top: 1px dashed #ccc; /* 设置虚线 */
  margin: 20px 0; /* 设置上下间距 */
}
</style>
