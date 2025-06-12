<template>
  <div>
    <!--将过滤组件作为一个插槽的方式加入-->
    <div>
      <component ref="filtersComponent"
                 :is="filterComponent"
                 @filterChange="filterChange"
                 @onSearch="onSearch"
                 @onAdd="onAdd"
                 @handleSearch="handleSearch"
                 @update-filters="updateFilters"/>
    </div>
    <!-- 列表 -->
    <el-table :data="table.tableData" highlight-current-row  :header-cell-style="{background:'#f5f7fa',borderTop: '1px solid #ebeef5'}" v-loading="table.tableLoading" style="width: 100%;">
      <el-table-column
        v-for="(column, index) in tableStyle"
        :key="index"
        :sortable="column.columnProp === 'sorting' || column.columnProp === 'id'"
        :prop="column.columnProp"
        :label="column.columnLabel"
        :width="column.columnWidth"
      >
        <template v-slot="scope">
          <template v-if="column.columnType === 'string'">
            {{ scope.row[column.columnProp] }}
          </template>

          <template v-else-if="column.columnType === 'image'">
            <el-image
              style="width: 100px; height: 100px"
              :src="$getOSSPrefix(scope.row[column.columnProp])"
              fit="cover"
            ></el-image>
          </template>
        </template>
      </el-table-column>

<!--      &lt;!&ndash; 自定义操作列，最后一列 &ndash;&gt;-->
      <el-table-column label="操作" fixed="right" width="300">
        <template v-slot="scope">
          <!-- 通过插槽渲染父组件传递的按钮内容 -->
          <slot :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-col :span="24" class="toolbar toolbar-pages">
      <el-pagination background
                     layout="total,prev, pager, next, sizes, jumper"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     @prev-click="handlePrevClick"
                     @next-click="handleNextClick"
                     :page-sizes="[10, 20, 30]"
                     :page-size="page.pageSize"
                     :current-page="page.currentPage"
                     :total="page.total">
      </el-pagination>
    </el-col>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    tableStyle: {
      type: Array,
      required: true
    },
    filterComponent: {
      type: [Object, Function],
      required: true
    }
  },
  data() {
    return {
      filters: null,
      // 列表数据
      table: {
        tableData: [],
        tableLoading: false
      },
      // 分页数据
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
        pageCount: 0
      }
    }
  },
  methods: {
    // 父类处理
    onSearch(val){
      this.loadData();
    },
    // 控制变量修改
    updateFilters(filters) {
      this.filters = filters
    },
    handleSearch() {
      this.loadData()
    },
    handleAdd() {
      this.$emit('onAdd')
    },
    // Page相关的操作
    handleSizeChange(size) {
      this.page.pageSize = size
      this.loadData()
    },
    handleCurrentChange(currentPage) {
      this.page.currentPage = currentPage
      this.loadData()
    },
    handlePrevClick() {
      --this.page.currentPage
      this.loadData()
    },
    handleNextClick() {
      ++this.page.currentPage
      this.loadData()
    },
    // 加载数据函数
    loadData() {
      this.table.tableLoading = true
      this.$request.get(`${this.url}/${this.page.currentPage}/${this.page.pageSize}`,{ params: this.filters })
        .then((res) => {
          let result = res.data
          console.log(result)
          if(result.length === 0 && this.page.currentPage > 1){
            this.page.currentPage--;
            this.loadData()
            return
          }

          this.table.tableData = result.records
          this.page.pageCount = result.pages
          this.page.total = result.total
          this.table.tableLoading = false
        })
    },
    filterChange(val){
      this.filters = val
    },
    onAdd(){
      this.$emit('onAdd');
    }
  },
  // 当组件被创建的时候执行的方法
  created() {
    this.loadData()
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

