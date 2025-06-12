<template>
  <div>
    <mn-pagination
      :url="url"
      :tableStyle = "listFormat"
      :filterComponent = "searchComponent"
      @onAdd="onAdd"
      ref="pagination">
      <template v-slot:default="slotProps">
        <!--查看-->
        <el-button size="mini" type="primary" icon="el-icon-tickets" @click="watchBtn(slotProps.row.id)" circle></el-button>
        <!--禁止/启用-->
        <el-button size="mini" :loading="statusLoading" :type="slotProps.row.status === '启用' ? 'warning' : 'success'" @click="statusBtn(slotProps.row.id)">{{ slotProps.row.status === '启用' ? '禁用' : '启用' }}</el-button>
        <!--修改-->
        <el-button size="mini" icon="el-icon-edit" @click="onEdit(slotProps.row.id)" circle></el-button>
        <!--删除-->
        <el-button size="mini" type="danger" icon="el-icon-delete" @click="delBtn(slotProps.row.id)" circle></el-button>
      </template>
    </mn-pagination>

    <!--查看页面-->
    <el-dialog title="轮播图信息" :close-on-click-modal="false" :visible.sync="watchFormVisible" center>
      <el-table :data="watchForm" :show-header="false" style="width: 100%">
        <el-table-column prop="key" label="属性" width="180"></el-table-column>
        <el-table-column label="值">
          <template v-slot="scope">
            <template v-if="scope.row.key === '图片'">
              <el-image style="width: auto; height: 100px" :src="$getOSSPrefix(scope.row.value)" fit="fit"></el-image>
            </template>

            <template v-else-if="scope.row.key === '大标题'">
              <article v-html="scope.row.value"></article>
            </template>

            <template v-else-if="scope.row.key === '小标题'">
              <article v-html="scope.row.value"></article>
            </template>

            <template v-else-if="scope.row.key === '状态'">
              <el-tag :type="scope.row.value == 0 ? 'warning' : 'success'">
                {{ scope.row.value == 0 ? '禁用' : '启用' }}
              </el-tag>
            </template>

            <template v-else-if="scope.row.key === '创建时间'">
              {{ scope.row.value | formatTimestamp }}
            </template>

            <template v-else-if="scope.row.key === '更新时间'">
              {{ scope.row.value | formatTimestamp }}
            </template>

            <template v-else>
              {{ scope.row.value }}
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 添加界面 -->
    <el-dialog title="创建轮播图" :close-on-click-modal="false" :visible.sync="addFormVisible" :before-close="handleAddClose" center>
      <el-form :model="addForm" status-icon label-width="180px" ref="addForm">
        <!--图片上传-->
        <el-form-item label="图片" prop="file">
            <MnUpload ref="addUpload"></MnUpload>
        </el-form-item>

        <el-form-item label="大标题" prop="bigTitle">
          <el-input type="textarea" :rows="2" placeholder="请输入大标题内容" v-model="addForm.bigTitle"></el-input>
        </el-form-item>

        <el-form-item label="小标题" prop="smallTitle">
          <el-input placeholder="请输入小标题" v-model="addForm.smallTitle"></el-input>
        </el-form-item>

        <el-form-item label="跳转连接" prop="link">
          <el-input placeholder="跳转链接" v-model="addForm.link" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="排序" prop="sorting">
          <el-input v-model="addForm.sorting" type="number" placeholder="请输入序号"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAddClose">返回</el-button>
        <el-button type="primary" @click="addBtn" :loading="this.addLoading">提交</el-button>
      </div>
    </el-dialog>

    <!-- 修改界面 -->
    <el-dialog title="修改轮播图" :close-on-click-modal="false" :visible.sync="editFormVisible" :before-close="handleEditClose" center>
      <el-form :model="editForm" status-icon label-width="180px" ref="addForm">
        <!--图片上传-->
        <el-form-item label="图片" prop="file">
          <MnUpload ref="editUpload"></MnUpload>
        </el-form-item>

        <el-form-item label="大标题" prop="bigTitle">
          <el-input type="textarea" :rows="2" placeholder="请输入大标题内容" v-model="editForm.bigTitle"></el-input>
        </el-form-item>

        <el-form-item label="小标题" prop="smallTitle">
          <el-input placeholder="请输入小标题" v-model="editForm.smallTitle"></el-input>
        </el-form-item>

        <el-form-item label="跳转连接" prop="link">
          <el-input v-model="editForm.link" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="排序" prop="sorting">
          <el-input v-model="editForm.sorting" type="number" placeholder="请输入序号"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleEditClose">返回</el-button>
        <el-button type="primary" @click="editBtn" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import MnPagination from '@/components/table/MnPagination'
  import MnUpload from '@/components/table/MnUpload'
  import AddAdvertiseRo from '@/utils/ro/AddAdvertiseRo'
  import EditAdvertiseRo from '@/utils/ro/EditAdvertiseRo'

  export default {
    components: {
      MnPagination,
      MnUpload
    },
    data(){
      return {
        url: '/advertise/page',
        searchComponent: () => import('./component/SearchComponent.vue'),
        listFormat: [
          {
            "columnType": "string",
            "columnProp": "id",
            "columnLabel": "id",
            "columnWidth": "90"
          },
          {
            "columnType": "image",
            "columnProp": "image",
            "columnLabel": "图片",
            "columnWidth": "250"
          },
          {
            "columnType": "string",
            "columnProp": "bigTitle",
            "columnLabel": "大标题",
            "columnWidth": "250"
          },
          {
            "columnType": "string",
            "columnProp": "smallTitle",
            "columnLabel": "小标题",
            "columnWidth": "250"
          },
          {
            "columnType": "string",
            "columnProp": "status",
            "columnLabel": "状态",
            "columnWidth": "100"
          },
          {
            "columnType": "string",
            "columnProp": "sorting",
            "columnLabel": "排序",
            "columnWidth": "60"
          }
        ],
        // 查看
        watchForm: [],
        watchFormVisible: false,
        // 禁止或启用相关参数
        statusLoading: false,
        // 添加相关参数
        addFormVisible: false,
        addLoading: false,
        addForm: {
          bigTitle: '',
          smallTitle:'',
          link: '',
          sorting: ''
        },
        // 修改相关参数
        editFormVisible: false,
        editLoading: false,
        editForm: {
          id: '',
          bigTitle: '',
          smallTitle:'',
          link: '',
          sorting: ''
        }
      }
    },
    methods: {
      // 查询
      watchBtn(id){
        this.$request.get(`/advertise/getAdvertiseById/${id}`).then(res => {
          let result = res.data
          this.watchForm = [
            { key: 'ID', value: result.id },
            { key: '图片', value: result.image }, // 只存储图片文件名
            { key: '大标题', value: result.bigTitle },
            { key: '小标题', value: result.smallTitle },
            { key: '链接', value: result.link },
            { key: '状态', value: result.status },
            { key: '排序', value: result.sorting },
            { key: '创建时间', value: result.created },
            { key: '更新时间', value: result.updated }
          ]
          this.watchFormVisible = true
        })
      },
      // 禁止&&启用
      statusBtn(id){
        this.statusLoading = true
        this.$request.put(`/advertise/changeStatus/${id}`).then(res => {
          if(res.status === 200){
            this.$message.success("修改成功")
            this.$refs.pagination.loadData()
          }
          this.statusLoading = false
        })
      },
      // 添加
      onAdd(){
        this.addFormVisible = true
      },
      addBtn(){
        this.addLoading = true;
        let addAdvertise = new AddAdvertiseRo(
          this.$refs.addUpload.getFile(),
          this.addForm.bigTitle,
          this.addForm.smallTitle,
          this.addForm.link,
          this.addForm.sorting,
        );
        // 返回数据
        addAdvertise.request(res => {
          if(res.status === 200){
            this.handleAddClose()
            this.$refs.pagination.loadData()
          }
          this.addLoading = false;
        })
      },
      handleAddClose(){
        this.$refs.addUpload.clear()
        this.addFormVisible = false
        this.addLoading = false
        this.addForm = {
          bigTitle: '',
          smallTitle:'',
          link: '',
          sorting: ''
        }
      },
      // 修改
      onEdit(id){
        this.$request.get(`/advertise/getAdvertiseById/${id}`).then(res => {
            let data = res.data
            this.editForm = {
              id: data.id,
              bigTitle: data.bigTitle,
              smallTitle: data.smallTitle,
              link: data.link,
              sorting: data.sorting
            }
            this.$nextTick(() => {this.$refs.editUpload.loadData(data.image)});
            this.editFormVisible = true
        })
      },
      editBtn(){
        this.editLoading = true
        let editAdvertise = new EditAdvertiseRo(
          this.editForm.id,
          this.$refs.editUpload.getFile(),
          this.editForm.bigTitle,
          this.editForm.smallTitle,
          this.editForm.link,
          this.editForm.sorting
        );

        // 返回数据
        editAdvertise.request(res => {
          if(res.status === 200){
            this.$message.success("修改成功")
            this.$refs.editUpload.loadData(res.data.image)
            this.editLoading = false
            this.handleEditClose()
          }
        })
        this.$refs.pagination.loadData()
      },
      handleEditClose(){
        this.editForm = {
          id: '',
          bigTitle: '',
          smallTitle:'',
          link: '',
          sorting: ''
        }
        this.$refs.editUpload.clear()
        this.editFormVisible = false
      },
      // 删除
      delBtn(id){
        // 删除弹窗
        this.$confirm('删除后数据无法回复,确定要删除吗？','提示',{
          confirmButtonText: '确认',// 确认按钮文字更换
          cancelButtonText: '取消',// 取消按钮文字更换
          showClose: true,// 是否显示右上角关闭按钮
          type: 'warning'// 提示类型  success/info/warning/error
        }).then(async () => {
          // 确认操作
          this.$request.delete(`/advertise/deleteById/${id}`).then(r => {
            if(r.status === 200){
              this.$refs.pagination.loadData()
              this.$message({message: "删除成功", type: 'success'})
            }
          })
        }).catch(() => {
          // 取消操作
        })
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
