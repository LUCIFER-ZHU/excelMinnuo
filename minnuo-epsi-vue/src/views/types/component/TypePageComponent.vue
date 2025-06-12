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
export default {

}
</script>

<style scoped lang="less">

</style>
