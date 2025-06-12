<template>
    <el-container>
      <el-main>
        <el-form v-for="(item,index) in ruleForm" :key="item" :model="item" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item>
            <el-button type="danger" size="mini" round class="el-icon-delete formClose" :key="'delbtn' + item" :disabled="isDelete" @click="topReduce(index)"></el-button>
          </el-form-item>

          <el-form-item label="亮点图片">
            <MnUploadAsy 
            :key="'upload' + item" ref="upload"  
            where="product" 
            limit="1" 
            :initData="this.initData"
            exceedMessage="亮点图片只能上传1张"></MnUploadAsy>
          </el-form-item>

          <el-form-item label="亮点介绍">
            <el-input type="textarea" v-model="item.intro"></el-input>
          </el-form-item>

          <el-form-item label="亮点详情">
            <MnTag :key="'tag'+ item" ref="tag"></MnTag>
          </el-form-item>
          <!--分割线-->
          <hr class="dashed-line" />
        </el-form>
      </el-main>

      <el-footer>
        <el-form>
          <el-form-item label-width="100px">
            <!--  <el-button type="primary" @click="getData()">清除</el-button>-->
            <el-button type="primary" @click="add">+</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="reduce" :disabled="isDelete"></el-button>
          </el-form-item>
        </el-form>
      </el-footer>
    </el-container>
</template>

<script>
import AddUploadPic from '@/components/AddUploadPic.vue'
import MnUploadAsy from '@/components/table/MnUploadAsy.vue'
import MnTag from '@/components/table/MnTag.vue'
import HeightLightModel from '@/model/Ro/HeightLightModel'

// import MnUpload from '@/components/table/MnUpload.vue'

export default {
  components: {
    AddUploadPic,
    MnUploadAsy,
    MnTag
  },
  props: {
    // 初始数据，没有就不传
    initData: {
      type: Array,
      default: () => {
        return [{intro: '',picture: '',summarize: []}]
      }
    }
  },
  data() {
    return {
      // 表单数据
      ruleForm: [],
      // 控制删除按钮是否起作用
      isDelete: true
    }
  },
  methods: {
    // ======================= 操作相关方法 =======================
	  // 表单添加一行
    add() {
      const arr = { intro: '' }
      this.ruleForm.push(arr)
    },
    // 表单减少一行
    reduce() {
     this.ruleForm.pop()
    },
    //单行删除
    topReduce(index){
      this.ruleForm.splice(index, 1);
    },

    //用于父级获取数据: [{startPic: <Object,File>,startIntro: <String>,startDetail: <Object,Array>}]
    getData(){
      let result = []
      // 获取组件的内容
      let picture = this.childComponentMethod('upload','getFile');
      let tags = this.childComponentMethod('tag','getData');
      //循环封装对象
      for(let index in this.ruleForm) {
        // 封装结果集
        // let resultItem = {
        //   file: picture[index],
        //   intro: this.ruleForm[index].intro,
        //   summarize: tags[index]
        // }
        // 将结果放入数组中
        result.push(new HeightLightModel(picture[index],this.ruleForm[index].intro,tags[index]));
      }

      // 调用子组件的公共方法
      return result;
    },
    // 重置方法
    resetForm() {
      // 清除子组件
      this.childComponentMethod('upload','clear')
      this.childComponentMethod('tag','init')
      // 最后清除外层的内容
      this.ruleForm = [{intro: ''}];
    },
    // initData(hightLight) {
    //   if(hightLight === null || hightLight.length === 0){
    //     return;
    //   }

    //   this.ruleForm = []
    //   hightLight.forEach((item,index) => {
    //     this.ruleForm.push({intro: item.intro})
    //     // 等待页面刷新完毕
    //     this.$nextTick(() => {
    //       this.$refs.upload[index].loadData(item.picture)
    //       this.$refs.tag[index].loadData(item.summarize)
    //     })
    //   })
    // },
    // 抽象的内容获取函数，这样可以把两个组件的获取逻辑合并
    childComponentMethod(refName, getDataMethod){
      return this.$refs[refName].map(child => {
        return child ? child[getDataMethod]() : null;
      }).filter(item => item !== null);
    }
  },
  created(){
    // let data = {
    //   intro: '111',
    //   picture: 'text/1.png',
    //   summarize: ['summarize1','summarize2']
    // }

    this.initData.forEach((item,index) => {
        this.ruleForm.push({intro: item.intro})
        // 等待页面刷新完毕
        this.$nextTick(() => {
          this.$refs.upload[index].loadData(item.picture)
          this.$refs.tag[index].loadData(item.summarize)
        })
    });
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
