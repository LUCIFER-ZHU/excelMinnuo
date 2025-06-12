<template>
  <div>
    <mn-pagination
      :url="url"
      :tableStyle = "listFormat"
      :filterComponent = "searchComponent"
      @onAdd="onAdd"
      ref="pagination"
    >

      <template v-slot:default="slotProps">
        <!--查看-->
        <el-button size="mini" type="primary" icon="el-icon-tickets" @click="watchBtn(slotProps.row.id)" circle></el-button>

        <!--修改-->
        <el-button size="mini" icon="el-icon-edit" @click="onEdit(slotProps.row.id)" circle></el-button>
        <!--未添加文章/禁止/启用-->
        <el-button v-if="slotProps.row.status !== '未添加文章'" size="mini" @click="editArticle(slotProps.row.id)">修改文章</el-button>
        <el-button size="mini"
                   :loading="statusLoading"
                   :type="slotProps.row.status === '启用' ? 'warning' : 'success'"
                   @click="statusBtn(slotProps.row)">
          {{ slotProps.row.status === '启用' ? '禁用' : (slotProps.row.status === '禁用' ? '启用' : '添加文章') }}
        </el-button>
        <!--删除-->
        <el-button size="mini" type="danger" icon="el-icon-delete" @click="delBtn(slotProps.row.id)" circle></el-button>
      </template>
    </mn-pagination>


    <el-dialog title="文章基本信息" :close-on-click-modal="false" :visible.sync="watchFormVisible" center>
      <el-table :data="watchForm" :show-header="false" style="width: 100%">
        <el-table-column prop="key" label="属性" width="180"></el-table-column>
        <el-table-column label="值">
          <template v-slot="scope">
            <template v-if="scope.row.key === '文章图片'">
              <!-- <el-image style="width: auto; height: 100px" :src="'http://192.168.20.57:10800'+ '/images/' + scope.row.value + '/1'" fit="fit"></el-image> -->
              <el-image style="width: auto; height: 100px" :src="$getOSSPrefix(scope.row.value)" fit="fit"></el-image>
            </template>

            <template v-else-if="scope.row.key === '文章分类'">
              <el-tag v-for="(item,i) in scope.row.value" :key="i" style="margin-right: 3px;">{{ item }}</el-tag>
            </template>

            <template v-else-if="scope.row.key === '状态'">
              <template v-if="scope.row.value == 0">
                <el-tag type="warning">禁用</el-tag>
              </template>

              <template v-else-if="scope.row.value == 1">
                <el-tag type="success">启用</el-tag>
              </template>

              <template v-else>
                <el-tag type="danger">未添加文章</el-tag>
              </template>
            </template>

            <template v-else-if="scope.row.key === '创建时间'">
              {{ scope.row.value | formatTimestamp }}
            </template>

            <template v-else-if="scope.row.key === '更新时间'">
              {{ scope.row.value | formatTimestamp }}
            </template>

            <!-- <template v-else-if="scope.row.key === '详细内容'">
              <article v-html="scope.row.value"></article>
            </template> -->

            <template v-else>
              {{ scope.row.value }}
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 添加界面 -->
    <el-dialog title="发布文章(基本信息)" :close-on-click-modal="false" :visible.sync="addFormVisible" :before-close="handleAddClose" center>
      <el-form :model="addForm" status-icon label-width="180px" ref="addForm">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="addForm.title" auto-complete="off"></el-input>
        </el-form-item>

        <!--action="http://192.168.20.56:10800/file/upload"-->
        <!--图片上传-->
        <el-form-item label="文章图片" prop="picture">
          <MnUpload ref="addArticleImg"></MnUpload>
        </el-form-item>

        <el-form-item label="文章摘要" prop="summary">
          <el-input type="textarea" v-model="addForm.summary"></el-input>
        </el-form-item>

        <!--文章标签-->
        <el-form-item label="文章标签">
          <MnTag ref="addArticleTag"></MnTag>
        </el-form-item>

<!--        <el-form-item label="文章类型" prop="type">-->
<!--          <el-select v-model="addForm.type" multiple filterable allow-create default-first-option placeholder="请选择产品分类">-->
<!--            <el-option label="Blog" value="3f7o"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->

        <el-form-item label="文章类型" prop="type">
          <MnSelectorGroup ref="addSelector" url="/typeEntity/getOption/1/2000"></MnSelectorGroup>
        </el-form-item>

        <el-form-item label="文章作者" prop="author">
          <el-input v-model="addForm.author" auto-complete="off"></el-input>
        </el-form-item>

        <!--关键字(SEO)-->
        <el-form-item label="关键字(SEO)">
          <MnTag ref="addKeyWords"></MnTag>
        </el-form-item>

        <el-form-item label="描述(SEO)" prop="description">
          <el-input type="textarea" v-model="addForm.description"></el-input>
        </el-form-item>

        <el-form-item label="脚本(SEO)" prop="seoScript">
          <el-input type="textarea" v-model="addForm.seoScript"></el-input>
        </el-form-item>
<!--        <el-form-item label="访问路径(SEO)">-->
<!--          <el-input v-model="addForm.seoPath"></el-input>-->
<!--        </el-form-item>-->

        <el-form-item label="文章来源" prop="source">
          <el-input v-model="addForm.source" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="排序" prop="sorting">
          <el-input v-model="addForm.sorting" type="number" placeholder="请输入序号"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAddClose">返回</el-button>
        <el-button type="primary" @click="addBtn" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <!-- 修改界面 -->
    <el-dialog title="修改文章(基本信息)" :close-on-click-modal="false" :visible.sync="editFormVisible" :before-close="handleEditClose" center>
      <el-form :model="editForm" status-icon label-width="180px" ref="addForm">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="editForm.title" auto-complete="off"></el-input>
        </el-form-item>

        <!--action="http://192.168.20.56:10800/file/upload"-->
        <!--图片上传-->
        <el-form-item label="文章图片" prop="picture">
          <MnUpload ref="editArticleImg"></MnUpload>
        </el-form-item>

        <el-form-item label="文章摘要" prop="summary">
          <el-input type="textarea" v-model="editForm.summary"></el-input>
        </el-form-item>

        <!--文章标签-->
        <el-form-item label="文章标签">
          <MnTag ref="editArticleTag" key="editArticleTag"></MnTag>
        </el-form-item>

<!--        <el-form-item label="文章类型" prop="type">-->
<!--          <el-select v-model="editForm.type" multiple filterable allow-create default-first-option placeholder="请选择产品分类">-->
<!--            <el-option label="Blog" value="3f7o"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="文章类型" prop="type">
          <MnSelectorGroup ref="editSelector" url="/typeEntity/getOption/1/2000"></MnSelectorGroup>
        </el-form-item>

        <el-form-item label="文章作者" prop="author">
          <el-input v-model="editForm.author" auto-complete="off"></el-input>
        </el-form-item>

        <!--关键字(SEO)-->
        <el-form-item label="关键字(SEO)">
          <MnTag ref="editKeyWords" key="editKeyWords"></MnTag>
        </el-form-item>

        <el-form-item label="描述(SEO)" prop="description">
          <el-input type="textarea" v-model="editForm.description"></el-input>
        </el-form-item>

        <el-form-item label="访问路径(SEO)">
          <el-input v-model="editForm.seoPath"></el-input>
        </el-form-item>

        <el-form-item label="脚本(SEO)" prop="seoScript">
          <el-input type="textarea" v-model="editForm.seoScript"></el-input>
        </el-form-item>

        <el-form-item label="文章来源" prop="source">
          <el-input v-model="editForm.source" auto-complete="off"></el-input>
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

    <!-- 页面-->
    <el-drawer
      title="添加文章"
      size="100%"
      :visible.sync="drawerVisible"
      :wrapperClosable="false"
      :before-close="handleClose">
      <!-- <span>我来啦!</span> -->
      <div class="demo-drawer__content">
        <MnWangEditor ref="editor"></MnWangEditor>

        <div class="demo-drawer__footer" style="margin-top: 20px;">
          <el-button @click="handleClose" size="medium">返 回</el-button>
          <el-button type="primary" @click="uploadArticle" :visible.sync="uploadLoding">提 交</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import MnPagination from '@/components/table/MnPagination'
import MnUpload from '@/components/table/MnUpload.vue'
import MnTag from '@/components/table/MnTag.vue'
import MnWangEditor from '@/components/editor/MnWangEditor.vue'
import AddArticleRo from '@/utils/ro/AddArticleRo'
import EditArticleRo from '@/utils/ro/EditArticleRo'
import MnSelectorGroup from '@/components/selector/MnSelectorGroup.vue'
import options from 'vue-quill-editor/src/options'

export default {
  components: {
    MnPagination,
    MnUpload,
    MnTag,
    MnWangEditor,
    MnSelectorGroup
  },
  data() {
    return {
      url: '/article/page',
      searchComponent: () => import('./component/SearchComponent.vue'),
      listFormat: [
        {
          "columnType": "string",
          "columnProp": "id",
          "columnLabel": "id",
          "columnWidth": "90"
        },
        {
          "columnType": "string",
          "columnProp": "title",
          "columnLabel": "文章标题",
          "columnWidth": "300"
        },
        {
          "columnType": "image",
          "columnProp": "images",
          "columnLabel": "文章主图",
          "columnWidth": "130"
        },
        {
          "columnType": "string",
          "columnProp": "viewNum",
          "columnLabel": "浏览量",
          "columnWidth": "300"
        },
        {
          "columnType": "string",
          "columnProp": "sorting",
          "columnLabel": "排序",
          "columnWidth": "100"
        },
        {
          "columnType": "string",
          "columnProp": "status",
          "columnLabel": "状态",
          "columnWidth": "100"
        }
      ],
      // 添加功能
      addFormVisible: false,
      addLoading: false,
      addForm: {
        title: '',
        summary: '',
        type: '',
        author: '',
        description:'',
        seoPath: '',
        seoScript:'',
        source: '',
        sorting: ''
      },
      // 查看文章
      watchForm: [],
      watchFormVisible: false,
      // 修改的内容
      editFormVisible: false,
      editLoading: false,
      editForm: {
        id: '',
        title: '',
        summary: '',
        type: '',
        author: '',
        description:'',
        seoPath: '',
        seoScript: '',
        source: '',
        sorting: ''
      },
      // 状态
      statusLoading: false,
      //文章修改和上传
      nowArticle: '',
      drawerVisible: false,
      uploadLoding: false
    }
  },

  // --- 函数集
  methods: {
    // 添加功能
    onAdd(){
      this.addFormVisible = true
    },
    handleAddClose(){
      this.addForm = {
        title: '',
        summary: '',
        type: '',
        author: '',
        description:'',
        seoPath: '',
        source: '',
        sorting: '',
        seoScript: ''
      }
      this.addLoading = false;
      this.$refs.addArticleImg.clear()
      this.$refs.addArticleTag.init()
      this.$refs.addKeyWords.init()
      this.$refs.addSelector.init()
      this.addFormVisible = false
    },
    addBtn(){
      this.addLoading = true;
      let addArticleRo = new AddArticleRo(
        this.addForm.title,
        this.addForm.summary,
        this.$refs.addArticleTag.getData(),
        this.$refs.addSelector.getData(),
        this.$refs.addArticleImg.getFile(),
        this.addForm.author,
        this.$refs.addKeyWords.getData(),
        this.addForm.description,
        this.addForm.seoPath,
        this.addForm.seoScript,
        this.addForm.source,
        this.addForm.sorting
      );

      // 发送请求
      addArticleRo.request(res => {
        if(res.status === 200){
          this.handleAddClose()
          this.$refs.pagination.loadData()
        }
        this.addLoading = false;
      })
    },

    // 修改功能
    onEdit(id){
      this.$request.get(`/article/getById/${id}`).then(res => {
        let data = res.data
        this.editForm = {
          id: id,
          title: data.title,
          summary: data.summary,
          type: data.type,
          author: data.author,
          description: data.description,
          seoPath: data.seoPath,
          seoScript: data.seoScript,
          source: data.source,
          sorting: data.sorting
        };

        // 封装Options
        let options = []
        for(let i = 0; i < data.type.length; i++) {
          options.push(data.type[i].id)
        }

        this.$nextTick(() => {
          this.$refs.editSelector.setOption(options)
          this.$refs.editArticleImg.loadData(data.images)
          this.$refs.editKeyWords.loadData(data.keywords)
          this.$refs.editArticleTag.loadData(data.labels)
        });
      });
      this.editFormVisible = true
    },
    handleEditClose(){
      this.editForm = {
        title: '',
        summary: '',
        type: '',
        author: '',
        description:'',
        seoPath: '',
        source: '',
        sorting: ''
      }
      this.editLoading = false;
      this.$refs.editArticleImg.clear()
      this.$refs.editArticleTag.init()
      this.$refs.editKeyWords.init()
      this.$refs.editSelector.init()

      this.editFormVisible = false
    },
    editBtn(){
      this.editLoading = true;
      let editArticleRo = new EditArticleRo(
        this.editForm.id,
        this.editForm.title,
        this.editForm.summary,
        this.$refs.editArticleTag.getData(),
        this.$refs.editSelector.getData(),
        this.$refs.editArticleImg.getFile(),
        this.editForm.author,
        this.$refs.editKeyWords.getData(),
        this.editForm.description,
        this.editForm.seoPath,
        this.editForm.seoScript,
        this.editForm.source,
        this.editForm.sorting
      )

      editArticleRo.request(res => {
        if(res.status === 200){
          this.handleEditClose()
          this.$refs.pagination.loadData()
        }
        this.editLoading = false;
      })
    },

    // 删除功能
    delBtn(id){
      // 删除弹窗
      this.$confirm('删除后数据无法回复,确定要删除吗？','提示',{
        confirmButtonText: '确认',// 确认按钮文字更换
        cancelButtonText: '取消',// 取消按钮文字更换
        showClose: true,// 是否显示右上角关闭按钮
        type: 'warning'// 提示类型  success/info/warning/error
      }).then(async () => {
        // 确认操作
        this.$request.delete(`/article/deleteById/${id}`).then(r => {
          if(r.status === 200){
            this.$refs.pagination.loadData()
            this.$message({message: "删除成功", type: 'success'})
          }
        })
      }).catch(() => {
        // 取消操作
      })
    },

    // 查看文章
    watchBtn(id){
      this.$request.get(`/article/getById/${id}`).then(res => {
        let data = res.data

        // 处理类型的转换
        let types = []
        const type = data.type
        for(let i = 0;i < type.length;i++){
          types.push(type[i].name)
        }

        this.watchForm = [
          { key: 'ID', value: data.id, type: 'text'},
          { key: '文章分类', value: types, type: 'category' },
          { key: '文章标题', value: data.title, type: 'text'}, // 只存储图片文件名
          { key: '文章摘要', value: data.summary, type: 'text'},
          { key: '文章图片', value: data.images, type: 'image'},
          { key: '排序', value: data.sorting, type: 'text'},
          { key: '状态', value: data.status , type: 'status'},
          { key: '创建时间', value: data.created, type: 'time'},
          { key: '更新时间', value: data.updated, type: 'time'}
        ];

        this.watchFormVisible = true
      });
    },

    // 改变状态
    statusBtn(row){
      let status = row.status
      if(status === '未添加文章'){
        this.nowArticle = row.id
        this.drawerVisible = true
        return;
      }
      // 执行修改操作
      this.statusLoading = true
      this.$request.put(`/article/updateStatus/${row.id}`).then(res => {
        if(res.status === 200){
          this.$message.success("修改成功")
          this.$refs.pagination.loadData()
        }
        this.statusLoading = false
      })
    },

    // 添加文章内容相关方法
    handleClose(){
      this.$refs.editor.clear()
      this.$refs.pagination.loadData()
      this.drawerVisible = false
    },
    uploadArticle(){
      let text = this.$refs.editor.getContent()
      // 封装请求对象
      const formData = {
        id: this.nowArticle,
        content: text
      }
      // 发送请求
      this.$request.put(`/article/content`, formData,{
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res => {
        if(res.status === 200){
          this.$message.success("上传文章成功")
          this.handleClose()
        }
      })
    },
    editArticle(id){
      this.nowArticle = id
      this.$request.get(`/article/getById/${id}`).then(res => {
        if(res.status === 200){
          this.drawerVisible = true
          this.$nextTick(() => {
            this.$refs.editor.loadData(res.data.content)
          });
        }
      })
    }
  },

  // ====================== 生命周期钩子函数  ======================
  mounted() {

  },
  // ====================== 监听器 ======================
  watch: {

  }
}
</script>

<style lang="less" scoped>
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
.demo-drawer__footer{
  display: flex;
  justify-content: space-around;
  flex-direction: row;
}
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
