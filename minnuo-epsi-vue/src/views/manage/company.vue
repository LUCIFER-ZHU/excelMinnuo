<template>
  <section class="client-list">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="公司名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="公司Logo1">
        <UpdatePicture ref="Logo1"></UpdatePicture>
      </el-form-item>

      <el-form-item label="公司Logo2">
        <UpdatePicture ref="Logo2"></UpdatePicture>
      </el-form-item>

      <el-form-item label="公司历程1">
        <el-input type="textarea" v-model="form.history"></el-input>
      </el-form-item>

      <el-form-item label="公司历程2">
        <el-input type="textarea" v-model="form.history2"></el-input>
      </el-form-item>

      <el-form-item label="介绍1">
      <el-input type="textarea" v-model="form.intor1"></el-input>
    </el-form-item>

      <el-form-item label="介绍2">
        <el-input type="textarea" v-model="form.intor2"></el-input>
      </el-form-item>

      <el-form-item label="公司地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>

      <el-form-item prop="email" label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>

      <el-form-item label="Whatsapp">
        <el-input v-model="form.whatsapp"></el-input>
      </el-form-item>

      <el-form-item label="telephone">
        <el-input v-model="form.telephone"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交修改</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import UpdatePicture from '@/components/UpdatePicture.vue'
import axios from 'axios'

export default {
  components: {
    UpdatePicture,
  },
  data() {
    return {
      form: {
        name: '',
        history: '',
        history2: '',
        intor1: '',
        intor2: '',
        address: '',
        email: '',
        whatsapp: '',
        telephone: '',
      }
    }
  },
  methods: {
    // 修改方法
    submitForm() {
      const form = new FormData();
      form.append('name',this.form.name);
      form.append('history', this.form.history);
      form.append('history2', this.form.history2);
      form.append('intor1', this.form.intor1);
      form.append('intor2', this.form.intor2);
      form.append('logo', this.$refs.Logo1.getFile());
      form.append('logo2', this.$refs.Logo2.getFile());
      form.append('address', this.form.address);
      form.append('email', this.form.email);
      form.append('whatsapp', this.form.whatsapp);
      form.append('telephone', this.form.telephone);

      axios.post(this.$getAPIURL(`/company/updateCompanyData`),form,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(respones => {
        if(respones.data.state == 200){
          this.open(respones.data.message,'success')
        }else{
          this.open(respones.data.message,'error')
        }
        this.initPage();
      });


    },

    initPage() {
      axios.get(this.$getAPIURL(`/company/getCompanyData`)).then(res => {
        const data = res.data.data
        if (res.data.state == 200) {
          this.form.name = data.name
          this.form.history = data.history
          this.form.history2 = data.history2
          this.form.intor1 = data.intor1
          this.form.intor2 = data.intor2
          this.form.address = data.address
          this.form.email = data.email
          this.form.whatsapp = data.whatsapp
          this.form.telephone = data.telephone
          this.$nextTick(() => {
            this.$refs.Logo1.reloadEditPicture(data.logo)
            this.$refs.Logo2.reloadEditPicture(data.logo2)
          })
        } else {
          this.open(res.data.message, 'error')
        }
      })
    },
    open(message, type) {
      this.$message({
        message: `${message}`,
        type: `${type}`
      })
    }
  },
  mounted() {
    this.initPage();
  }
}
</script>

<style scoped lang="less">

</style>
