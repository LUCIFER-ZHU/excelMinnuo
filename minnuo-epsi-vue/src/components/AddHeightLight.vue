<template>
    <el-container>
      <el-main>
        <el-form v-for="(ruleForm,index) in ruleForm" :key="index" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
<!--          <el-form-item><el-button type="danger" size="mini" round class="el-icon-delete formClose" :disabled="flag" @click="topReduce(index)"></el-button></el-form-item>-->
          <el-form-item label="亮点图片">
            <AddUploadPic :key="index" ref="uploadComponent" @lastSelectedFile="(val) => handleFileUpdate(val, index)"></AddUploadPic>
          </el-form-item>

          <el-form-item label="亮点详情">
            <el-input type="textarea" v-model="ruleForm.intro"></el-input>
          </el-form-item>

          <el-form-item label="亮点详情">
            <el-tag :key="ind" v-for="(tag,ind) in ruleForm.summarize"
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
<!--            <el-button type="primary" @click="getData()">清除</el-button>-->
            <el-button type="primary" @click="add">+</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="reduce" :disabled="flag"></el-button>
          </el-form-item>
        </el-form>
      </el-footer>
    </el-container>
</template>

<script>
import AddUploadPic from '@/components/AddUploadPic.vue'

export default {
  components: {
    AddUploadPic
  },
  data() {
    return {
    // 表单数据
      ruleForm: [
          {
            file: [],
            intro: '',
            summarize: []
          }
      ],

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
      const arr = { file: [],intro: '', summarize: [] }
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
    // topReduce(index){
    //   // 移除指定索引的元素
    //   this.ruleForm.splice(index, 1);
    //   this.inputModel.splice(index, 1);
    //   // 重新检查是否需要禁用删除按钮
    //   this.flags();
    // },
    // 判断数组长度-+
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
      this.ruleForm[index].summarize.splice(this.ruleForm[index].summarize.indexOf(tag), 1)
    },
    showInput(index) {
      this.inputModel[index].inputVisible = true
      // 获取焦点---需要优化
      this.$nextTick(() => {
        // this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm(index) {
      let inputValue = this.inputModel[index].inValue
      if (inputValue) {
        this.ruleForm[index].summarize.push(inputValue)
      }
      this.inputModel[index].inValue = ''
      this.inputModel[index].inputVisible = false
    },

    //上传文件内容获取
    handleFileUpdate(val,index){
      this.ruleForm[index].file = val
    },
    //用于父级获取数据
    getData(){
      // 调用子组件的公共方法
      return this.ruleForm;
    },
    // 重置方法
    resetForm() {
      this.ruleForm = [{file: [],intro: '',summarize: []}];
      this.inputModel = [{inValue: '',inputVisible: false}];
      this.flag = true;
      //清除子组件的内容
      this.$refs.uploadComponent.forEach((item,index)=>{
        if (item && typeof item.initComponent() === 'function') {
          // 调用子组件的公共方法
          item.initComponent();
        }
      });
    },
    initData(data) {
      this.ruleForm = [];
      this.inputModel = []

      // 生成组件
      data.forEach((item,index)=>{
        const em = {
          file:[],
          intro: item.intro,
          summarize: item.summarize
        }

        const inp = {
          inValue: '',
          inputVisible: false
        }

        this.ruleForm.push(em);
        this.inputModel.push(inp);
      })

      //更新图片
      data.forEach((item,index)=>{
        let file = ''
        const fileName = item.picture
        const ossImageUrl = this.$getOSSPrefix(fileName)

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
            this.$refs.uploadComponent[index].reloadData(file)
          })
          .catch(error => console.error('Error fetching image:', error));
      });

      this.flags()
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
