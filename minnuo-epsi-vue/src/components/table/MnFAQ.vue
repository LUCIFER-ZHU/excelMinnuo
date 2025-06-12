<template>
  <el-container>
    <el-main>
      <el-form v-for="(item,index) in ruleForm" :key="index" :model="item" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <br>
        <el-form-item label="问题" >
          <el-input placeholder="请输入问题" v-model="item.question"></el-input>
        </el-form-item>

        <el-form-item label="回答">
          <el-input placeholder="请输入回答" v-model="item.answer"></el-input>
        </el-form-item>

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
export default {
  data() {
    return {
      ruleForm: [
        {
          question: '',
          answer: ''
        }
      ],
      flag: true
    }
  },
  methods: {
    add(){
      const arr = { question: '',answer: '' }
      this.ruleForm.push(arr)
      this.flags()
    },
    reduce() {
      this.ruleForm.pop()
      this.flags()
    },
    flags() {
      if (this.ruleForm.length < 2) {
        this.flag = true
      } else {
        // 先赋值为true再赋为false, 不然会没反应
        this.flag = true
        this.flag = false
      }
    },
    // 获取数据
    resetForm(){
      this.ruleForm = [
        {
          key: '',
          value: ''
        }
      ];
      this.flag = true;
    },
    getData(){
      return this.ruleForm;
    },
    initData(data){
      if(data === null || data.length <= 0){
        return
      }

      this.ruleForm = data
      this.flags()
    }
  },
  watch: {}
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
