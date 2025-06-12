<template>
	<section class="client-list">
		<!--查询-->
		<el-col :span="24" class="toolbar">
      <!--标题搜索框-->
			<el-form :model="filters" ref="filters" :inline="true">
				<el-form-item label="标题" prop="name">
					<el-input class="ipt1" v-model="filters.inputValue" placeholder="请输入标题内容" autocomplete="off" clearable></el-input>
        </el-form-item>
        <!--查询和重置按钮-->
				<el-form-item>
					<el-button icon="el-icon-search" type="primary" @click="queryBtn">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!-- 列表 -->
		<el-table :data="datas" highlight-current-row  :header-cell-style="{background:'#f5f7fa',borderTop: '1px solid #ebeef5'}" v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="id" label="id" width="50rpx"></el-table-column>
			<el-table-column prop="ip" label="IP地址" width="120rpx"></el-table-column>
			<el-table-column prop="name" label="名称" width="100rpx"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="160rpx"></el-table-column>
      <el-table-column prop="whatsapp" label="whatsapp" width="160rpx"></el-table-column>
      <el-table-column prop="message" label="询盘信息" width="250rpx"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
          <!--查看-->
          <el-button size="mini" type="primary" icon="el-icon-tickets" @click="watchBtn(scope.$index,scope.row)" circle></el-button>
          <!--删除-->
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="delBtn(scope.$index,scope.row)" circle></el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<el-col :span="24" class="toolbar toolbar-pages">
			<el-pagination
			  background
				layout="total, prev, pager, next, sizes, jumper"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
				:pager-count="11"
				:page-sizes="[5,10,20,30]"
				:page-size="pageSize"
				:current-page="currentPage"
				:total="total">
			</el-pagination>
		</el-col>

    <!--查看页面-->
      <el-dialog title="询盘信息" :close-on-click-modal="false" :visible.sync="watchFormVisible" center>
        <el-table :data="watchForm" :show-header="false" style="width: 100%">
          <el-table-column prop="key" label="属性" width="180"></el-table-column>
          <el-table-column label="值">
            <template slot-scope="scope">
              <template v-if="scope.row.key === '发送时间'">
                  {{ scope.row.value | formatTimestamp }}
              </template>
              <template v-else>
                {{ scope.row.value }}
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
	</section>
</template>

<script>
import axios from 'axios'
import AddUploadPic from '@/components/AddUploadPic.vue'

export default {
  components: {
    // UploadImage, // 注册组件
    // eslint-disable-next-line vue/no-unused-components
    AddUploadPic
  },
  data() {
		return {
      // ----------------------------- 查询功能相关数据 -----------------------------
			filters: {
				inputValue: null
			},
      // ----------------------------- 显示功能相关数据 -----------------------------
      listLoading: true, // 列表加载
			datas: [], // 列表渲染数据
      // ----------------------------- 分页相关功能 -----------------------------
			total: 0, // 全部数据条数
			currentPage: 1, // 初始页
			pageSize: 5, // 每页数据量

      // ----------------------------- 查看页面 -----------------------------
      watchFormVisible: false, // 查看界面是否显示
      watchLoading: false,
      watchForm: [
        { key: 'ID', value: '' },
        { key: 'IP地址', value: '' },
        { key: '发送页面', value: '' },
        { key: '名称', value: '' },
        { key: '邮箱', value: '' },
        { key: 'whatsapp', value: '' },
        { key: '询盘信息', value: '' },
        { key: '发送时间', value: '' }
      ]
		}
	},

  // --- 函数集
	methods: {
    // ---------------------- 查询功能相关函数 ----------------------
    // 查询按钮功能
    queryBtn: function () {
      this.currentPage = 1
      this.limitAllAdvertise(this.currentPage, this.pageSize)
    },
    // ---------------------- 查询功能相关函数 ----------------------

    // ---------------------- 界面显示相关函数 ----------------------
    // 显示查看界面
    watchBtn (index, row) {
      // 渲染到表格
      this.watchForm = [
        { key: 'ID', value: row.id },
        { key: 'IP地址', value: row.ip },
        { key: '发送页面', value: row.subPage },
        { key: '名字', value: row.name }, // 只存储图片文件名
        { key: '邮箱', value: row.email },
        { key: 'whatsapp', value: row.whatsapp },
        { key: '询盘信息', value: row.message },
        { key: '发送时间', value: row.created }
      ]
      this.watchFormVisible = true
    },
    // ---------------------- 界面显示相关函数 ----------------------

    // ---------------------- 分页显示 ----------------------
		handleSizeChange (val) {
			this.pageSize = val
			this.limitAllAdvertise(this.currentPage, this.pageSize)
		},
		// 选择当前页数
		handleCurrentChange (val) {
      // 修改当前页
			this.currentPage = val
      this.limitAllAdvertise(this.currentPage, this.pageSize)
		},
    // 上一页处理
    handlePrevClick() {
      --this.currentPage
      this.limitAllAdvertise(this.currentPage, this.pageSize)
    },
    // 下一页处理
    handleNextClick() {
      ++this.currentPage
      this.limitAllAdvertise(this.currentPage, this.pageSize)
    },
  // ---------------------- 分页显示 ----------------------

    // ---------------------- 删除功能相关函数 ----------------------
    // ----- 删除按钮对应的操作
    delBtn(index, row) {
      // 删除弹窗
      this.$confirm('删除后数据无法回复,确定要删除吗？', '提示', {
        confirmButtonText: '确认', // 确认按钮文字更换
        cancelButtonText: '取消', // 取消按钮文字更换
        showClose: true, // 是否显示右上角关闭按钮
        type: 'warning'// 提示类型  success/info/warning/error
      }).then(() => {
        // 确认操作
        this.deleteById(row.id)
      }).catch(() => {
        // 取消操作
      })
    },

    // ---------------------- 异步请求函数 ----------------------
    // 异步删除请求
    async deleteById(id) {
      // console.log("进入1")
      try {
        const response = await axios.post(this.$getAPIURL(`/email/deleteEmailById/${id}`))
        // console.log("进入2")
        const state = response.data.state
        const messages = response.data.message
        // console.log("进入3")
        if (state === 200) {
          this.$notify({
            title: '操作完成',
            message: messages,
            type: 'success'
          })
          this.limitAllAdvertise(this.currentPage, this.pageSize)
        } else if (state === 4002) {
          this.$notify({
            title: '错误',
            message: messages,
            type: 'error'
          })
        }
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    },
    // 异步函数，用于分页请求
    async limitAllAdvertise(currentPage, pageSize) {
      try {
        // 控制加载开关进入函数时开启
        this.listLoading = true
        // 判断 filters.inputValue 的值是否为空
        if (this.filters.inputValue === '') {
          this.filters.inputValue = null
        }
        // 获取请求
        const response = await axios.post(this.$getAPIURL(`/email/queryLimitAndLikeMailForm/${currentPage}/${pageSize}/${this.filters.inputValue}`))
        this.datas = response.data.data
        this.total = response.data.count
        // 控制加载开关结束时关闭加载效果
        this.listLoading = false
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    },
    open(message, type) {
      this.$message({
        message: `${message}`,
        type: `${type}`
      })
    }
  },
  // ---------------------- 异步请求函数 ----------------------

  // ====================== 生命周期钩子函数  ======================
  mounted() {
    // 刷新页面重置total
    // this.setAdvertiseCount()
    this.limitAllAdvertise(this.currentPage, this.pageSize)
  },
  // ====================== 监听器 ======================
  watch: {
    'filters.inputValue': function(newValue) {
      if (newValue.length === 0) {
          this.currentPage = 1
          this.limitAllAdvertise(this.currentPage, this.pageSize)
      }
    }
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
