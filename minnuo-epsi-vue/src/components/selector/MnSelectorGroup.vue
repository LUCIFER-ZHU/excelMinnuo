<template>
  <el-select v-model="value" multiple placeholder="请选择">
    <el-option-group v-for="group in options" :key="group.label" :label="group.label">
      <el-option v-for="item in group.options" :key="item.value" :label="item.label" v-if="group.options.value != '0000'" :value="item.value"></el-option>
    </el-option-group>
  </el-select>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      options: [],
      value: []
    }
  },
  methods: {
    getData(){
      return this.value;
    },
    setOption(options){
      if(options instanceof Array){
        options.forEach((item) => {
          this.value.push(item);
        })
      }
    },
    init(){
      this.value = [];
    }
  },
  created() {
    this.$request.get(this.url).then(res => {
      this.options = res.data;
    })
  }
}
</script>

