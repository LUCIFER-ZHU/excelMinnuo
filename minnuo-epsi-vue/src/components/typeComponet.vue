<!-- eslint-disable vue/no-parsing-error -->
<template>
  <section class="client-list">
    <!--查询-->
    <el-col :span="24" class="toolbar">
      <el-form :model="filters" ref="filters" :inline="true">
        <el-form-item label="节点名称" prop="inputValue">
          <el-input class="ipt1" v-model="filters.inputValue" placeholder="请输入节点名称" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="queryBtn" >查询</el-button>
        </el-form-item>

        <el-form-item class="create-btn">
          <el-button type="primary" @click="handleAdd">创建</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 列表 -->
    <!-- <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" border> -->
    <el-table :data="tableData" style="width: 100%; margin-bottom: 20px;" row-key="id" :expand-row-keys="defaultExpand" v-loading="listLoading" :tree-props="{children: 'children'}" border>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="intro" label="节点描述"></el-table-column>

      <!-- <el-table-column prop="images" type="index" label="类型图片" width="130px"> -->
      <!-- <template slot-scope="scope"> -->
      <!-- <img :src="'http://192.168.20.57:10800' + '/images/' + scope.row.images + '/1'" alt="图片" style="width: auto; height: 100px;" /> -->
      <!-- <img :src="$getOSSPrefix(scope.row.images)" alt="图片" style="width: 130px; height: auto;" /> -->
      <!-- </template> -->
      <!-- </el-table-column> -->

      <el-table-column prop="status" label="状态" width="100rpx">
        <template v-slot="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'warning'">{{ scope.row.status === 1 ? '启用' : '禁用' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="sorting" label="排序" sortable></el-table-column>

      <el-table-column label="操作">
        <template v-slot="scope">
          <!--查看-->
          <el-button size="mini" type="primary" icon="el-icon-tickets" @click="watchBtn(scope.$index,scope.row)" circle></el-button>
          <!--修改-->
          <el-button size="mini" icon="el-icon-edit" @click="editBtn(scope.$index,scope.row)" circle></el-button>
          <!--禁用-->
          <el-button size="mini" :type="scope.row.status === 1 ? 'warning' : 'success'" @click="statusBtn(scope.row.id)">{{ scope.row.status === 1 ? '禁用' : '启用' }}</el-button>
          <!--删除-->
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="delBtn(scope.$index,scope.row)" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑界面 -->
    <el-dialog title="修改分类信息" :visible.sync="editFormVisible" center>
      <el-form :model="editForm" status-icon label-width="180px" ref="addForm">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="所属分类">
          <el-select v-model="editParentId" placeholder="请选择">
            <el-option-group v-for="group in options" :key="group.label" :label="group.label">
              <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-option-group>
          </el-select>
        </el-form-item>

        <!--图片上传 action="http://192.168.20.57:10800/file/upload"-->
        <el-form-item label="图片" prop="picture">
          <el-upload
            class="upload-demo"
            action="#"
            :file-list="editfileList"
            :on-remove="handleEditRemove"
            :on-change="handleEditChange"
            :before-remove="handleEditBeforeRemove"
            :auto-upload="false"
            list-type="picture">

            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="排序">
          <el-input v-model="editForm.sorting" type="number" placeholder="请输入序号"></el-input>
        </el-form-item>

        <el-form-item label="分类简介" prop="intro">
          <el-input type="textarea" v-model="editForm.intro"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editSubmitBtn" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--创建界面-->
    <el-dialog title="创建分类" :visible.sync="addFormVisible" :before-close="handleClose" center>
      <el-form :model="addForm" status-icon label-width="180px" ref="addForm">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="首页图片" prop="picture">
          <AddUploadPic ref="uploadComponent" @lastSelectedFile="handleFileUpdate"></AddUploadPic>
        </el-form-item>

        <el-form-item label="所属分类">
          <el-select v-model="addParentId" placeholder="请选择">
            <el-option-group v-for="group in options" :key="group.label":label="group.label">
              <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-option-group>
          </el-select>
        </el-form-item>

        <el-form-item label="排序">
          <el-input v-model="addForm.sorting" type="number" placeholder="请输入序号"></el-input>
        </el-form-item>

        <el-form-item label="分类简介" prop="intro">
          <el-input type="textarea" v-model="addForm.intro"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="cancelBtn('addForm')">取消</el-button> -->
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="addSubmitBtn" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--查看页面-->
    <el-dialog title="分类基本信息" :visible.sync="watchFormVisible" center>
      <el-table :data="watchForm" :show-header="false" style="width: 100%">
        <el-table-column prop="key" label="属性" width="180"></el-table-column>
        <el-table-column label="值">
          <template v-slot="scope">
            <template v-if="scope.row.key === '图片'">
              <!-- <el-image style="width: auto; height: 100px" :src="'http://192.168.20.57:10800'+ '/images/' + scope.row.value + '/1'" fit="fit"></el-image> -->
              <el-image style="width: auto; height: 100px" :src="$getOSSPrefix(scope.row.value)" fit="fit"></el-image>
            </template>

            <template v-else-if="scope.row.key === '状态'">
              <el-tag :type="scope.row.value == 0 ? 'warning' : 'success'">
                {{ scope.row.value == 0 ? '禁用' : '启用' }}
              </el-tag>
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
  props:{
    PageModel: {
      type: String,
      required: true,
    }
  },
  components: {
    AddUploadPic
  },
  data() {
    return {
      // PageModel: '1000',
      // 列表
      tableData: [],
      listLoading: false,
      // 展开行
      defaultExpand: [],

      // ---------------------------- 查询功能相关数据 -------------------------------
      filters: {
        inputValue: ''
      },
      // ----------------------------- 添加功能相关数据 -------------------------------
      // 选项
      options: [],
      // 添加表单是否显示
      addFormVisible: false,
      // 添加界面是否显示加载
      addLoading: false,
      // 添加的表单规则
      addForm: {
        name: '',
        intro: '',
        sorting: 99
      },
      addParentId: '0000',
      uploadPic: null,
      // ----------------------------- 修改功能相关数据 -------------------------------
      // 修改界面是否显示
      editFormVisible: false,
      editfile: null,
      editfileList: [],
      editfileListCache: [],
      // 修改按钮加载
      editLoading: false,
      editForm: {
        name: '',
        intro: '',
        sorting: 99
      },
      editParentId: '',
      // 记录当前正在修改的id
      nowEditId: '',
      // ----------------------------- 查看页面 -----------------------------
      watchFormVisible: false, // 查看界面是否显示
      watchLoading: false,
      watchForm: []
    }
  },
  methods: {
    // -------------------------- 查询功能 ------------------------------
    queryBtn () {
      // console.log(this.filters.inputValue)
      // this.listLoading = true
      this.tableData = []
      // 先刷新数据
      this.queryTypeEntityTree('0000')
      this.defaultExpand = []
      // 展开数据
      this.queryChildTypeEntityTree(this.filters.inputValue)
      // this.listLoading = false
    },
    // ------------------------ 添加功能 -------------------------------
    handleAdd() {
      this.queryOptionsList()
      this.addFormVisible = true
    },
    addSubmitBtn() {
      // 判断是否弹出警告
      if (this.addForm.name === '') {
        // success，warring，error，"message"
        this.open('必须填写名称', 'warning')
        return
      }

      // 发送请求
      this.addLoading = true
      this.addTypeEntity()
      this.addLoading = false
    },
    // 关闭页面
    handleClose () {
      this.addFormVisible = false
      this.addLoading = false
      this.addForm.remake = ''
      this.addParentId = '0000'
      this.addForm.sorting = 99
      this.$refs.addForm.resetFields()
      this.$refs.uploadComponent.initComponent()
    },
    // ------------------------ 修改功能 -------------------------------
    // 显示编辑界面
    editBtn (index, row) {
      this.queryOptionsList()
      this.editForm.name = row.name
      this.editForm.intro = row.intro
      this.editParentId = row.parentId
      this.editForm.sorting = row.sorting
      this.nowEditId = row.id
      const pic_Path = row.images
      const parts = pic_Path.split('/')
      const picName = parts[parts.length - 1]

      // // 构造默认的文件对象
      const imageBlob = new Blob([], { type: 'image/jpeg' })
      const file = new File([imageBlob], pic_Path, {
        type: 'image/jpeg',
        lastModified: Date.now()
      })
      this.editfile = file

      // // // 显示图片
      this.editfileList = []
      this.editfileList[0] = { name: picName, url: this.$getOSSPrefix(pic_Path) }
      this.editfileListCache[0] = this.editfileList[0]

      this.editFormVisible = true
    },
    editSubmitBtn() {
      const editEntityTypeRo = new FormData()
      editEntityTypeRo.append('id', this.nowEditId)
      editEntityTypeRo.append('name', this.editForm.name)
      editEntityTypeRo.append('intor', this.editForm.intro)
      editEntityTypeRo.append('parentId', this.editParentId)
      editEntityTypeRo.append('file', this.editfile)
      editEntityTypeRo.append('code', this.PageModel)
      editEntityTypeRo.append('sorting',this.editForm.sorting)
      this.editTypeEntity(editEntityTypeRo)
    },

    // 修改图片
    handleEditRemove(file, fileList) {
      // 再回显
      this.editfileList = []
      this.editfileList[0] = this.editfileListCache[0]
    },
    handleEditChange(file, fileList) {
      // 切换图片
      this.editfileList = []
      this.editfileList[0] = { name: file.name, url: file.url }
      // 切换当前上传对象
      this.editfile = file.raw
    },
    handleEditBeforeRemove(file, fileList) {
      // 判断是否和当前的内容相同，如果相同则不允许被删除
      if (file.name === this.editfileListCache[0].name) {
        return false
      }
    },
    // ------------------------ 查看功能 -------------------------------
    watchBtn(index, row) {
      // 渲染到表格
      this.watchForm = [
        { key: '分类名称', value: row.name },
        { key: '分类简介', value: row.intro },
        { key: '图片', value: row.images }
      ]
      this.watchFormVisible = true
    },
    // ----------------------------- 删除和禁用功能 -----------------------------
    async statusBtn(id) {
      // console.log(id)
      const response = await axios.post(this.$getAPIURL(`/typeEntity/updateStatus/${id}/${this.PageModel}`))
      if (response.data.state === 200) {
        this.tableData = []
        this.queryTypeEntityTree('0000')
        this.open('修改成功', 'success')
      }
    },
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
    // 删除方法
    async deleteById(id) {
      try {
        // const response = await axios.post(`http://192.168.20.57:10800/advertise/deleteAdvertiseById/` + id)
        const response = await axios.post(this.$getAPIURL(`/typeEntity/deleteTypeEntityById/${id}/${this.PageModel}`))
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

          // 刷新界面
          this.tableData = []
          this.queryTypeEntityTree('0000')
        } else {
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
    // 修改方法
    async editTypeEntity(editProject) {
      // 发送请求
      const response = await axios.post(this.$getAPIURL(`/typeEntity/updateTypeEntity`), editProject, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      // 判断是否成功
      if (response.data.state === 200) {
        this.open('修改成功', 'success')
        // 窗口关闭：改为窗口关闭方法
        // 刷新页面数据
        this.tableData = []
        this.queryTypeEntityTree('0000')
        this.editFormVisible = false
      } else {
        this.open(response.data.message, 'warning')
      }
    },
    // 添加的异步请求
    async addTypeEntity() {
      // 创建请求数据
      const addTypeEntityRo = new FormData()
      addTypeEntityRo.append('name', this.addForm.name)
      addTypeEntityRo.append('intor', this.addForm.intro)
      addTypeEntityRo.append('parentId', this.addParentId)
      addTypeEntityRo.append('sorting',this.addForm.sorting)
      addTypeEntityRo.append('file', this.uploadPic)
      addTypeEntityRo.append('code', this.PageModel)

      // 发送请求
      const response = await axios.post(this.$getAPIURL(`/typeEntity/addTypeEntity`), addTypeEntityRo, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      // 判断是否成功
      if (response.data.state === 200) {
        this.open('添加成功', 'success')
        // 窗口关闭：改为窗口关闭方法
        // 刷新页面数据
        this.tableData = []
        this.queryTypeEntityTree('0000')
        this.handleClose()
        this.addFormVisible = false
      } else {
        this.open(response.data.message, 'warning')
      }
    },
    // 异步请求，通过 ParentId 查询数据
    async queryTypeEntityTree(rootId) {
      this.listLoading = true
      const response = await axios.post(this.$getAPIURL(`/typeEntity/queryTypeEntityTree/${rootId}/${this.PageModel}`))
      this.tableData = response.data.data
      console.log(this.tableData)
      this.listLoading = false
    },
    // 查询调用接口,并将数据渲染到界面
    async queryChildTypeEntityTree(name) {
      this.listLoading = true
      // 判断是否为空
      if (name === '') {
        name = 'null'
        this.queryTypeEntityTree('0000')
        return
      }
      // 响应
      const response = await axios.post(this.$getAPIURL(`/typeEntity/queryChildTypeEntityTree/${name}/${this.PageModel}`))
      const state = response.data.state

      // 判断
      if (state === 200) {
        this.defaultExpand = response.data.data
      } else {
        this.open(response.data.message, 'warning')
      }
      this.listLoading = false
    },
    // 查询
    async queryOptionsList() {
      // 响应
      const response = await axios.post(this.$getAPIURL(`/typeEntity/queryTypeEntityList/0/${this.PageModel}`))
      // console.log(response.data.data)
      if (response.data.state === 200) {
        this.options = response.data.data
      }
    },
    // 弹窗
    open(message, type) {
      this.$message({
        message: `${message}`,
        type: `${type}`
      })
    },

    handleFileUpdate(val) {
      this.uploadPic = val
    }
  },
  // ====================== 生命周期钩子函数  ======================
  mounted() {
    // 调用异步请求请求数据并将数据渲染到页面
    this.queryTypeEntityTree('0000')
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
