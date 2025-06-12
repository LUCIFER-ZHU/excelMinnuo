<template>
    <el-container>
      <el-main>
        <el-form v-for="(item,index) in ruleForm" :key="item" :model="item" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item>
            <el-button type="danger" size="mini" round class="el-icon-delete formClose" :key="'delbtn' + item" :disabled="isDelete" @click="topReduce(index)"></el-button>
          </el-form-item>

          <el-form-item label="型号名称" prop="modelName">
            <el-input v-model="item.modelName"></el-input>
          </el-form-item>

          <el-form-item label="型号图片" prop="modelPicture">
            <MnUpload :isRemove="true" :key="'picture' + item" ref="upload" :limit="0"></MnUpload>
          </el-form-item>

          <el-form-item label="型号详情">
            <MnTag :key="'tag'+ item" ref="tag"></MnTag>
          </el-form-item>
          <!--分割线-->
          <hr class="dashed-line" />
        </el-form>
      </el-main>

      <el-footer>
        <el-form>
          <el-form-item label-width="100px">
            <el-button type="primary" @click="add">+</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="reduce" :disabled="isDelete"></el-button>
          </el-form-item>
        </el-form>
      </el-footer>
    </el-container>
    <!-- 表单按钮 -->
</template>

<script>
import MnUpload from '@/components/table/MnUpload.vue'
import MnTag from '@/components/table/MnTag.vue'
import ProductModel from '@/model/Ro/ProductModel'

export default {
  components: {
    MnUpload,
    MnTag
  },
  data() {
    return {
    // 表单数据
      ruleForm: [
          {
            modelName: ''
          }
      ],
      isDelete: true
    }
  },
  methods: {
	// 表单添加一行
    add() {
      let arr = { modelName: '' }
      this.ruleForm.push(arr)
    },
    // 表单减少一行
    reduce() {
      this.ruleForm.pop()
    },
    //顶部删除
    topReduce(index){
      // 移除指定索引的元素
      this.ruleForm.splice(index, 1);
    },
    getData(){
      let result = []
      // 获取组件的内容
      let picture = this.childComponentMethod('upload','getFile');
      let tags = this.childComponentMethod('tag','getData');
      //循环封装对象
      for(let index in this.ruleForm){
        // 封装结果集
        result.push(new ProductModel(this.ruleForm[index].modelName,picture[index],tags[index]));
      }

      return result;
    },
    // 重置方法
    resetForm() {
      // 清除子组件
      this.childComponentMethod('upload','clear')
      this.childComponentMethod('tag','init')
      this.ruleForm = [{modelName: ''}]
    },
    // 初始化数据
    initData(model){
      if(model === null || model.length === 0){
        return;
      }

      this.ruleForm = []
      model.forEach((item,index) => {
        this.ruleForm.push({modelName: item.modelName});
        // 等待页面刷新完毕
        this.$nextTick(() => {
          this.$refs.upload[index].loadData(item.modlePicture)
          this.$refs.tag[index].loadData(item.modelDetails)
        })
      })
    },
    // 抽象的内容获取函数，这样可以把两个组件的获取逻辑合并
    childComponentMethod(refName, getDataMethod){
      return this.$refs[refName].map(child => {
        return child ? child[getDataMethod]() : null;
      }).filter(item => item !== null);
    }
  },
  watch: {
    ruleForm(newForm){
      let len = newForm.length;
      if(len <= 1){
        this.isDelete = true
      }else if(len > 1){
        this.isDelete = false
      }
    }
  }
  // created () {
  //   this.$request.get('/product/getById/15').then((res) => {
  //     let data = res.data.modle;
  //     this.initData(data);
  //   })
  // }
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
