<template>
  <div class="workflow-selector-container">
    <!-- 顶部操作区域 -->
    <div class="header-section">
      <h2 class="page-title">工作流管理</h2>
      <el-button type="primary" :icon="Plus" @click="handleAddWorkflow">
        新增流程图
      </el-button>
    </div>

    <!-- 下拉框选择工作流 -->
    <div class="selector-section">
      <el-select
        v-model="selectedWorkflowId"
        placeholder="请选择流程图"
        size="large"
        style="width: 400px"
        clearable
        @change="handleWorkflowSelect"
      >
        <el-option
          v-for="item in workflowDataList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>

    <!-- 流程图展示区域 -->
    <div v-if="selectedWorkflowId && selectedWorkflowConfig" class="workflow-display-section">
      <div class="workflow-display-header">
        <h3>{{ selectedWorkflowName }}</h3>
        <el-tag type="info" size="small">预览模式</el-tag>
      </div>
      <div class="workflow-display-content">
        <dragDropApprovalWorkflow :initial-config="selectedWorkflowConfig" />
      </div>
    </div>

    <!-- 空状态提示 -->
    <div v-else-if="!selectedWorkflowId" class="empty-state">
      <el-empty description="请选择一个流程图进行预览" />
    </div>

    <!-- 流程图数据表格 -->
    <div class="table-section">
      <el-table
        :data="workflowDataList"
        style="width: 100%"
        stripe
        border
        :empty-text="workflowDataList.length === 0 ? '暂无流程图数据，请点击上方新增按钮创建' : '暂无数据'"
      >
        <el-table-column prop="name" label="流程图名称" min-width="200" />
        <el-table-column prop="createdAt" label="创建时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="更新时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.updatedAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              :icon="Edit"
              @click="handleEditWorkflow(row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              :icon="Delete"
              @click="handleDeleteWorkflow(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新增/编辑流程图模态框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="95%"
      top="5vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="handleDialogClose"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="120px"
        class="workflow-form"
      >
        <el-form-item label="流程图名称" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="请输入流程图名称"
            maxlength="50"
            show-word-limit
            clearable
          />
        </el-form-item>
        <el-form-item label="流程图配置" prop="config">
          <div class="workflow-designer-wrapper">
            <dragDropApprovalWorkflow
              ref="workflowDesignerRef"
              :initial-config="formData.config"
            />
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleDialogClose">取消</el-button>
          <el-button type="primary" :loading="submitting" @click="handleSubmit">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import dragDropApprovalWorkflow from './workFlow/dragDropApprovalWorkflow.vue'
import type { WorkflowData, WorkflowFormData } from '@/types/workflow'
import { FormState } from '@/types/workflow'
import {
  getWorkflowList,
  addWorkflow,
  updateWorkflow,
  deleteWorkflow as deleteWorkflowApi,
  isWorkflowNameDuplicate
} from '@/utils/workflowStorage'

/**
 * 当前选中的工作流ID
 */
const selectedWorkflowId = ref<string>('')

/**
 * 工作流数据列表
 */
const workflowDataList = ref<WorkflowData[]>([])

/**
 * 模态框显示状态
 */
const dialogVisible = ref<boolean>(false)

/**
 * 表单状态：新增或编辑
 */
const formState = ref<FormState>(FormState.ADD)

/**
 * 当前编辑的工作流ID（编辑模式下使用）
 */
const editingWorkflowId = ref<string>('')

/**
 * 表单数据
 */
const formData = reactive<WorkflowFormData>({
  name: '',
  config: null
})

/**
 * 表单引用
 */
const formRef = ref<FormInstance>()

/**
 * 工作流设计器引用
 */
const workflowDesignerRef = ref<InstanceType<typeof dragDropApprovalWorkflow>>()

/**
 * 提交状态
 */
const submitting = ref<boolean>(false)

/**
 * 表单验证规则
 */
const formRules: FormRules = {
  name: [
    { required: true, message: '请输入流程图名称', trigger: 'blur' },
    { min: 2, max: 50, message: '流程图名称长度在 2 到 50 个字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value && isWorkflowNameDuplicate(value, editingWorkflowId.value)) {
          callback(new Error('流程图名称已存在'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

/**
 * 模态框标题
 */
const dialogTitle = computed(() => {
  return formState.value === FormState.ADD ? '新增流程图' : '编辑流程图'
})

/**
 * 当前选中的工作流名称
 */
const selectedWorkflowName = computed(() => {
  const workflow = workflowDataList.value.find(item => item.id === selectedWorkflowId.value)
  return workflow?.name || ''
})

/**
 * 当前选中的工作流配置
 */
const selectedWorkflowConfig = computed(() => {
  const workflow = workflowDataList.value.find(item => item.id === selectedWorkflowId.value)
  return workflow?.config || null
})

/**
 * 格式化日期
 * @param dateString ISO 格式的日期字符串
 * @returns 格式化后的日期字符串
 */
const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * 加载工作流数据列表
 */
const loadWorkflowData = () => {
  workflowDataList.value = getWorkflowList()
  console.log('加载工作流数据列表:', workflowDataList.value)
}

/**
 * 处理工作流选择事件
 * @param workflowId 选中的工作流ID
 */
const handleWorkflowSelect = (workflowId: string) => {
  console.log('选择工作流:', workflowId)
  if (workflowId) {
    ElMessage.success(`已选择流程图：${selectedWorkflowName.value}`)
  }
}

/**
 * 处理新增流程图按钮点击事件
 */
const handleAddWorkflow = () => {
  formState.value = FormState.ADD
  editingWorkflowId.value = ''
  formData.name = ''
  formData.config = null
  dialogVisible.value = true
  console.log('打开新增流程图对话框')
}

/**
 * 处理编辑流程图按钮点击事件
 * @param workflow 要编辑的工作流数据
 */
const handleEditWorkflow = (workflow: WorkflowData) => {
  formState.value = FormState.EDIT
  editingWorkflowId.value = workflow.id
  formData.name = workflow.name
  formData.config = workflow.config
  dialogVisible.value = true
  console.log('打开编辑流程图对话框:', workflow)
}

/**
 * 处理删除流程图按钮点击事件
 * @param workflow 要删除的工作流数据
 */
const handleDeleteWorkflow = (workflow: WorkflowData) => {
  ElMessageBox.confirm(
    `确定要删除流程图"${workflow.name}"吗？删除后无法恢复。`,
    '删除确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      const success = deleteWorkflowApi(workflow.id)
      if (success) {
        ElMessage.success('删除成功')
        // 如果删除的是当前选中的工作流，清空选中状态
        if (selectedWorkflowId.value === workflow.id) {
          selectedWorkflowId.value = ''
        }
        // 重新加载数据
        loadWorkflowData()
      } else {
        ElMessage.error('删除失败')
      }
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })
}

/**
 * 处理表单提交事件
 */
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    // 验证表单
    const valid = await formRef.value.validate()
    if (!valid) {
      ElMessage.warning('请检查表单填写是否正确')
      return
    }

    submitting.value = true

    // 获取工作流设计器的最新配置
    if (workflowDesignerRef.value && typeof workflowDesignerRef.value.getWorkflowConfig === 'function') {
      try {
        formData.config = await workflowDesignerRef.value.getWorkflowConfig()
        console.log('获取到工作流配置:', formData.config)
      } catch (error) {
        console.error('获取工作流配置失败:', error)
        ElMessage.error('获取工作流配置失败，请重试')
        return
      }
    }

    let success = false
    if (formState.value === FormState.ADD) {
      // 新增流程图
      const newWorkflow = addWorkflow({
        name: formData.name,
        config: formData.config
      })
      success = !!newWorkflow
      if (success) {
        ElMessage.success('新增成功')
      } else {
        ElMessage.error('新增失败，请检查流程图名称是否重复')
      }
    } else {
      // 编辑流程图
      success = updateWorkflow(editingWorkflowId.value, {
        name: formData.name,
        config: formData.config
      })
      if (success) {
        ElMessage.success('更新成功')
        // 如果编辑的是当前选中的工作流，更新选中状态
        if (selectedWorkflowId.value === editingWorkflowId.value) {
          // 重新加载以获取最新数据
          loadWorkflowData()
        }
      } else {
        ElMessage.error('更新失败，请检查流程图名称是否重复')
      }
    }

    if (success) {
      // 重新加载数据
      loadWorkflowData()
      // 关闭对话框
      dialogVisible.value = false
    }
  } catch (error) {
    console.error('表单提交失败:', error)
    ElMessage.error('操作失败，请重试')
  } finally {
    submitting.value = false
  }
}

/**
 * 处理对话框关闭事件
 */
const handleDialogClose = () => {
  dialogVisible.value = false
  formRef.value?.resetFields()
  formData.name = ''
  formData.config = null
  editingWorkflowId.value = ''
  console.log('关闭对话框')
}

/**
 * 组件挂载时加载数据
 */
onMounted(() => {
  loadWorkflowData()
})
</script>

<style scoped>
.workflow-selector-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

/* 顶部操作区域 */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.page-title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #303133;
}

/* 选择器区域 */
.selector-section {
  margin-bottom: 24px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 流程图展示区域 */
.workflow-display-section {
  margin-bottom: 24px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.workflow-display-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e4e7ed;
}

.workflow-display-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.workflow-display-content {
  height: 600px;
  overflow: hidden;
  border-radius: 4px;
  background-color: #f9f9f9;
}

/* 空状态 */
.empty-state {
  margin-bottom: 24px;
  padding: 60px 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 表格区域 */
.table-section {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 表单样式 */
.workflow-form {
  padding: 20px 0;
}

.workflow-designer-wrapper {
  height: 600px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
}

/* 对话框底部按钮 */
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* 下拉框样式优化 */
:deep(.el-select) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

:deep(.el-select .el-input__wrapper) {
  border-radius: 6px;
  padding: 10px 15px;
}

:deep(.el-select .el-input__wrapper:hover) {
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.3);
}

:deep(.el-select .el-input__wrapper.is-focus) {
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.4);
}

/* 模态框样式优化 */
:deep(.el-dialog) {
  border-radius: 12px;
  overflow: hidden;
}

:deep(.el-dialog__header) {
  padding: 20px;
  border-bottom: 1px solid #e4e7ed;
}

:deep(.el-dialog__body) {
  padding: 20px;
}

:deep(.el-dialog__footer) {
  padding: 15px 20px;
  border-top: 1px solid #e4e7ed;
}

/* 表格样式优化 */
:deep(.el-table) {
  border-radius: 4px;
  overflow: hidden;
}

:deep(.el-table th) {
  background-color: #f5f7fa;
  color: #606266;
  font-weight: 600;
}

:deep(.el-table--border) {
  border: 1px solid #ebeef5;
}

:deep(.el-table--border::after) {
  display: none;
}
</style>
