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
<!--        <el-button size="mini" type="primary" icon="el-icon-tickets" @click="watchBtn(slotProps.row)" circle></el-button>-->
        <!--修改-->
        <el-button size="mini" icon="el-icon-edit" @click="editBtn(slotProps.row)" circle></el-button>
        <!--删除-->
        <el-button size="mini" type="danger" icon="el-icon-delete" @click="delBtn(slotProps.row.id)" circle></el-button>
      </template>
    </mn-pagination>

    <!-- 发布产品 -->
    <el-drawer
      :wrapperClosable="false"
      title="添加内容"
      :visible.sync="drawer"
      :destroy-on-close="true"
      :before-close="beforeAddClose" size="50%">
      <el-container>
        <el-main>
          <el-form :model="addFrom" status-icon ref="addForm">
            <el-form-item label="产品名称">
              <el-input v-model="addFrom.name" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="产品描述">
              <el-input type="textarea" v-model="addFrom.intro"></el-input>
            </el-form-item>

            <el-form-item label="产品分类">
              <MnSelectorGroup ref="addType" url="/typeEntity/getOption/1/1000"></MnSelectorGroup>
            </el-form-item>

            <!--图片上传-->
            <el-form-item label="产品图片">
              <MnUpload ref="addUpload"></MnUpload>
            </el-form-item>

            <el-form-item label="产品系列名">
              <el-input v-model="addFrom.seriesName" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="产品系列标题">
              <el-input v-model="addFrom.seriesTitle" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="产品系列描述">
              <el-input type="textarea" v-model="addFrom.seriesIntro"></el-input>
            </el-form-item>

            <el-form-item label="产品参数表"></el-form-item>
            <MnWangEditor ref="addEditor"></MnWangEditor>

            <br>

            <el-form-item label="关键字(SEO)">
              <MnTag ref="keywords"></MnTag>
            </el-form-item>

            <el-form-item label="描述(SEO)">
              <el-input type="textarea" v-model="addFrom.description"></el-input>
            </el-form-item>

            <el-form-item label="访问路径(SEO)">
              <el-input v-model="addFrom.seoPath"></el-input>
            </el-form-item>

            <el-form-item label="脚本(SEO)" prop="seoScript">
              <el-input type="textarea" v-model="addFrom.seoScript"></el-input>
            </el-form-item>

  <!--          <el-form-item label="产品说明书(PDF)">-->
  <!--            <AddUploadPic ref="paramComponent" @lastSelectedFile="handleParamUpdate"></AddUploadPic>-->
  <!--          </el-form-item>-->

            <el-form-item label="排序">
              <el-input v-model="addFrom.sorting" type="number" placeholder="请输入序号"></el-input>
            </el-form-item>

            <!-- 分割线 -->
            <el-divider content-position="left">产品型号</el-divider>
            <ProductModel ref="addProductModel"></ProductModel>

            <!-- 分割线 -->
            <el-divider content-position="left">产品亮点</el-divider>
            <ProductHeightLight ref="addHeightLight"></ProductHeightLight>

            <!-- 分割线 -->
            <el-divider content-position="left">FAQ</el-divider>
            <MnFAQ ref="addMnFAQ"></MnFAQ>
          </el-form>
        </el-main>

        <el-footer class="drawer-footer">
          <el-button type="primary" @click="handleAddSubmit" :loading="addLoading">提交</el-button>
          <el-button @click="beforeAddClose">返回</el-button>
        </el-footer>
      </el-container>
    </el-drawer>

    <!-- 修改内容 -->
    <el-drawer
      :wrapperClosable="false"
      title="修改内容"
      :visible.sync="editDrawer"
      :destroy-on-close="true"
      :before-close="beforeEditClose"
      size="50%">

      <el-container>
        <el-main>
          <el-form :model="editFrom" status-icon ref="addForm">
            <el-form-item label="产品名称">
              <el-input v-model="editFrom.name" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="产品描述">
              <el-input type="textarea" v-model="editFrom.intro"></el-input>
            </el-form-item>

            <el-form-item label="产品分类">
              <MnSelectorGroup ref="editType" url="/typeEntity/getOption/1/1000"></MnSelectorGroup>
            </el-form-item>

            <!--图片上传-->
            <el-form-item label="产品图片">
              <MnUpload ref="editUpload"></MnUpload>
            </el-form-item>

            <el-form-item label="产品系列名">
              <el-input v-model="editFrom.seriesName" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="产品系列标题">
              <el-input v-model="editFrom.seriesTitle" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="产品系列描述">
              <el-input type="textarea" v-model="editFrom.seriesIntro"></el-input>
            </el-form-item>

            <el-form-item label="产品参数表"></el-form-item>
            <MnWangEditor ref="editEditor"></MnWangEditor>

            <br>

            <el-form-item label="关键字(SEO)">
              <MnTag ref="editKeywords"></MnTag>
            </el-form-item>

            <el-form-item label="描述(SEO)">
              <el-input type="textarea" v-model="editFrom.description"></el-input>
            </el-form-item>

            <el-form-item label="访问路径(SEO)">
              <el-input v-model="editFrom.seoPath"></el-input>
            </el-form-item>

            <el-form-item label="脚本(SEO)" prop="seoScript">
              <el-input type="textarea" v-model="editFrom.seoScript"></el-input>
            </el-form-item>

            <!--          <el-form-item label="产品说明书(PDF)">-->
            <!--            <AddUploadPic ref="paramComponent" @lastSelectedFile="handleParamUpdate"></AddUploadPic>-->
            <!--          </el-form-item>-->

            <el-form-item label="排序">
              <el-input v-model="editFrom.sorting" type="number" placeholder="请输入序号"></el-input>
            </el-form-item>

            <!-- 分割线 -->
            <el-divider content-position="left">产品型号</el-divider>
            <ProductModel ref="editProductModel"></ProductModel>

            <!-- 分割线 -->
            <el-divider content-position="left">产品亮点</el-divider>
            <ProductHeightLight ref="editHeightLight"></ProductHeightLight>

            <!-- 分割线 -->
            <el-divider content-position="left">FAQ</el-divider>
            <MnFAQ ref="editMnFAQ"></MnFAQ>
          </el-form>
        </el-main>

        <el-footer class="drawer-footer">
          <el-button type="primary" @click="handleEditSubmit" :loading="editLoading">提交</el-button>
          <el-button @click="beforeEditClose">返回</el-button>
        </el-footer>
      </el-container>
    </el-drawer>
  </div>
</template>

<script>
  import MnPagination from '@/components/table/MnPagination'
  import MnSelectorGroup from '@/components/selector/MnSelectorGroup'
  import MnUpload from '@/components/table/MnUpload.vue'
  import MnWangEditor from '@/components/editor/MnWangEditor.vue'
  import MnTag from '@/components/table/MnTag.vue'
  import ProductModel from './component/ProductModel'
  import ProductHeightLight from './component/ProductHeightLight'
  import MnFAQ from '@/components/table/MnFAQ'
  import AddProductRo from '@/model/Ro/AddProductRo'
  import EditProductRo from '@/model/Ro/EditProductRo'

  export default {
    components: {
      MnPagination,
      MnSelectorGroup,
      MnUpload,
      MnWangEditor,
      MnTag,
      ProductModel,
      ProductHeightLight,
      MnFAQ
    },
    data() {
      return {
        url: '/product/page',
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
            "columnProp": "images",
            "columnLabel": "图片",
            "columnWidth": "130"
          },
          {
            "columnType": "string",
            "columnProp": "name",
            "columnLabel": "产品名称",
            "columnWidth": "300"
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
        addFrom: {
          name: '',
          intro: '',
          seriesName: '',
          seriesTitle: '',
          seriesIntro: '',
          description: '',
          seoPath: '',
          seoScript: '',
          sorting: ''
        },
        drawer: false,
        addLoading: false,
        // 修改相关
        editFrom: {
          id: '',
          name: '',
          intro: '',
          seriesName: '',
          seriesTitle: '',
          seriesIntro: '',
          description: '',
          seoPath: '',
          seoScript: '',
          sorting: ''
        },
        editDrawer: false,
        editLoading: false
      }
    },
    methods: {
      // 添加
      onAdd(){
        this.drawer = true
      },
      handleAddSubmit(){
        this.addLoading = true
        let picture = this.$refs.addUpload.getFile()
        let type = this.$refs.addType.getData()
        let content = this.$refs.addEditor.getContent()
        let keywords = this.$refs.keywords.getData()
        let hl = this.$refs.addHeightLight.getData()
        let pm = this.$refs.addProductModel.getData()
        let faq = this.$refs.addMnFAQ.getData()

        let addProduct = new AddProductRo(
          this.addFrom.name,
          this.addFrom.intro,
          type,picture,content,
          this.addFrom.seriesName,
          this.addFrom.seriesTitle,
          this.addFrom.seriesIntro,
          keywords,
          this.addFrom.description,
          this.addFrom.seoPath,
          this.addFrom.seoScript,
          this.addFrom.sorting,
          pm,hl,faq
        )

        // 请求发送
        addProduct.request((res,error) => {
          console.log(res)
          console.log(error)
          if(res !== undefined && res !== null && res.status == 200) {
            this.$message.success("添加成功")
            this.beforeAddClose();
          }else{
            this.$message.error("添加失败")
            this.addLoading = false
          }
        })
      },
      // 添加页面关闭之前
      beforeAddClose(){
        this.addFrom = {
          name: '',
          intro: '',
          seriesName: '',
          seriesTitle: '',
          seriesIntro: '',
          description: '',
          seoPath: '',
          sorting: ''
        }
        // 清除方法
        this.$refs.addUpload.clear()
        this.$refs.addType.init()
        this.$refs.keywords.init()
        this.$refs.addHeightLight.resetForm()
        this.$refs.addProductModel.resetForm()
        this.$refs.addMnFAQ.resetForm()
        this.$refs.pagination.loadData()
        this.drawer = false
        this.addLoading = false
      },
      watchBtn(row) {

      },
      //修改
      editBtn(row) {
        this.editFrom.id = row.id
        this.$request.get(`/product/getById/${row.id}`).then(res => {
          let reslut = res.data
          this.editFrom.name = reslut.name
          this.editFrom.intro = reslut.intro
          this.editFrom.seriesName = reslut.seriesName
          this.editFrom.seriesTitle = reslut.seriesTitle
          this.editFrom.seriesIntro = reslut.seriesIntro
          this.editFrom.description = reslut.description
          this.editFrom.seoPath = reslut.seoPath
          this.editFrom.seoScript = reslut.seoScript
          this.editFrom.sorting = reslut.sorting
          this.editDrawer = true
          // 回显封装数据
          let type = reslut.type
          let types = []
          if(type instanceof Array) {
            type.forEach((item) => {
              types.push(item.id)
            })
          }

          // 渲染数据
          this.$nextTick(() => {
            this.$refs.editUpload.loadData(reslut.images)
            this.$refs.editType.setOption(types)
            this.$refs.editEditor.loadData(reslut.content)
            this.$refs.editKeywords.loadData(reslut.keywords)
            this.$refs.editHeightLight.initData(reslut.hightLight)
            this.$refs.editProductModel.initData(reslut.modle)
            this.$refs.editMnFAQ.initData(reslut.faq)
          })
        })
      },
      handleEditSubmit(){
        this.editLoading = true
        // 获取数据
        let picture = this.$refs.editUpload.getFile()
        let type = this.$refs.editType.getData()
        let content = this.$refs.editEditor.getContent()
        let keywords = this.$refs.editKeywords.getData()
        let hl = this.$refs.editHeightLight.getData()
        let pm = this.$refs.editProductModel.getData()
        let faq = this.$refs.editMnFAQ.getData()

        // 封装请求对象
        let editProduct = new EditProductRo(
          this.editFrom.id,
          this.editFrom.name,
          this.editFrom.intro,
          type,picture,content,
          this.editFrom.seriesName,
          this.editFrom.seriesTitle,
          this.editFrom.seriesIntro,
          keywords,
          this.editFrom.description,
          this.editFrom.seoPath,
          this.editFrom.seoScript,
          this.editFrom.sorting,
          pm,hl,faq
        )
        //
        // // 发送请求
        editProduct.request((res,error) => {
          if(res !== undefined && res !== null && res.status == 200) {
            this.$message.success("修改成功")
            this.beforeEditClose();
          }else{
            this.$message.error("修改失败")
            this.editLoading = false
          }
        })
      },
      beforeEditClose(){
        this.editFrom = {
          id: '',
          name: '',
          intro: '',
          seriesName: '',
          seriesTitle: '',
          seriesIntro: '',
          description: '',
          seoPath: '',
          sorting: ''
        }
        // 清除组件中的内容
        this.$refs.editUpload.clear()
        this.$refs.editType.init()
        this.$refs.editKeywords.init()
        this.$refs.editHeightLight.resetForm()
        this.$refs.editProductModel.resetForm()
        this.$refs.editMnFAQ.resetForm()
        this.editLoading = false
        this.editDrawer = false
        this.$refs.pagination.loadData()
      },
      // 删除
      delBtn(id) {
        // 删除弹窗
        this.$confirm('删除后数据无法回复,确定要删除吗？','提示',{
          confirmButtonText: '确认',// 确认按钮文字更换
          cancelButtonText: '取消',// 取消按钮文字更换
          showClose: true,// 是否显示右上角关闭按钮
          type: 'warning'// 提示类型  success/info/warning/error
        }).then(async () => {
          // 确认操作
          this.$request.delete(`/product/delete/${id}`).then(r => {
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

<style lang="less">
/* 底部按钮区域样式 */
.drawer-footer {
  padding: 10px 20px;
  border-top: 1px solid #e4e4e4;
  text-align: right;
  background-color: #fff;
  position: sticky;
  bottom: 0;
  z-index: 1000; /* 提高按钮的 z-index */
}
</style>
