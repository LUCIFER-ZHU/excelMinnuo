<template>
  <div>
<!--    <TestModel ref="TestModel"></TestModel>-->
<!--    <el-button @click="Btn1">清除</el-button>-->
<!--    <el-button @click="Btn2">获取</el-button>-->
        <!-- <DialogPage></DialogPage> -->
         <ProductHeightLight :initData="this.datas()"></ProductHeightLight>
        <!-- <MnUploadAsy where="test" :limit="1"></MnUploadAsy> -->
<!--    <MnSelectorGroup ref="selector" url="/typeEntity/getOption/1/1000"></MnSelectorGroup>-->
<!--    <el-button @click="Btn1">清除</el-button>-->
<!--    <el-button @click="Btn2">获取</el-button>-->
<!--    <el-button @click="Btn3">设置</el-button>-->
  </div>
</template>

<script>
// import MnUpload from './table/MnUpload.vue'
// import MnUploadAsy from './table/MnUploadAsy.vue'
// import DialogPage from '@/views/types/component/DialogPage.vue'
// import TestModel from '@/views/product/component/ProductModel.vue'
// import MnSelectorGroup from '@/components/selector/MnSelectorGroup.vue'
import ProductHeightLight from '@/views/product/newComponent/ProductHeightLight.vue'

export default {
  components: { ProductHeightLight },
  data() {
    return {

    }
  },
  methods: {
    datas(){
      return [{intro: '111',picture: 'test/1.png',summarize: ['12s','22s']}]
    },
    Btn1() {
      this.$refs.selector.reset()
    },
    Btn2() {
      console.log(this.$refs.selector.getData())
    },
    Btn3(){
      let data = ['aqk7', '4y65', '67mp']
      this.$refs.selector.initData(data)
    }
  }
}
</script>

<style>

</style>
