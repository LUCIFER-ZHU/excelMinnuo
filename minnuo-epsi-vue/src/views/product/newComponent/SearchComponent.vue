<template>
  <!--标题搜索框-->
  <section class="client-list">
    <el-form :model="filters" ref="filters" :inline="true">
      <el-form-item label="产品名称" prop="name">
        <el-input class="ipt1" @clear="inputClear" v-model="filters.name" placeholder="请输入标题内容" autocomplete="off" clearable></el-input>
      </el-form-item>
      <!--查询和重置按钮-->
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="queryBtn">查询</el-button>
      </el-form-item>
      <!--创建按钮-->
      <el-form-item class="create-btn">
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">创建</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        filters: {
          name: ''
        }
      }
    },
    methods: {
      queryBtn() {
        this.$emit('onSearch', this.filters)
      },
      handleAdd() {
        this.$emit('onAdd')
      },
      inputClear(){
        this.$emit('filterChange',this.filters)
      }
    },
    created(){
      this.$emit('filterChange',this.filters)
    },
    watch: {
      filters: {
        handler(newVal, oldVal) {
          this.$emit('filterChange',newVal)
        },
        deep: true // 深度监听
      },
    }
  }
</script>

<style lang="less" scoped>
.client-list {
  .create-btn {
    float: right;
  }
  .ipt1 {
    width: 260px;
  }
  .cell {
    .el-link {
      margin-right: 20px;
    }
  }
}
</style>

<style lang="less">
.client-list {
  .el-form-item {
    .el-form-item__content {
      line-height: normal;
    }
  }
}
</style>
