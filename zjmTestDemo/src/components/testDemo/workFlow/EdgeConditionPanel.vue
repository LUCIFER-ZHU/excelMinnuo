<template>
  <div class="edge-condition-panel" v-if="selectedEdge">
    <div class="panel-header">
      <h3>连线条件编辑</h3>
      <el-button type="text" size="small" @click="$emit('close')">关闭</el-button>
    </div>
    
    <div class="panel-content">
      <!-- 连线基本信息 -->
      <div class="info-section">
        <div class="info-item">
          <label>源节点:</label>
          <span>{{ selectedEdge.source }}</span>
        </div>
        <div class="info-item">
          <label>目标节点:</label>
          <span>{{ selectedEdge.target }}</span>
        </div>
      </div>
      
      <!-- 条件编辑表单 -->
      <div class="form-section">
        <div class="property-item">
          <label for="condition-type">条件类型:</label>
          <el-select id="condition-type" v-model="localCondition.type" @change="onDataChange">
            <el-option label="普通条件" value="normal" />
            <el-option label="分支条件" value="branch" />
          </el-select>
        </div>
        
        <div class="property-item">
          <label for="condition-field">字段名称:</label>
          <el-input id="condition-field" v-model="localCondition.field" placeholder="请输入字段名称" @input="onDataChange" />
        </div>
        
        <div class="property-item">
          <label for="condition-operator">操作符:</label>
          <el-select id="condition-operator" v-model="localCondition.operator" @change="onDataChange">
            <el-option label="等于" value="==" />
            <el-option label="不等于" value="!=" />
            <el-option label="大于" value=">" />
            <el-option label="大于等于" value=">=" />
            <el-option label="小于" value="<" />
            <el-option label="小于等于" value="<=" />
            <el-option label="包含" value="includes" />
            <el-option label="不包含" value="!includes" />
          </el-select>
        </div>
        
        <div class="property-item">
          <label for="condition-value">比较值:</label>
          <el-input id="condition-value" v-model="localCondition.value" placeholder="请输入比较值" @input="onDataChange" />
        </div>
        
        <div class="property-item">
          <label for="condition-description">条件描述:</label>
          <el-input type="textarea" id="condition-description" v-model="localCondition.description" placeholder="请输入条件描述" @input="onDataChange" />
        </div>
        
        <div class="property-item">
          <label for="condition-expression">条件表达式:</label>
          <el-input type="textarea" id="condition-expression" v-model="localCondition.expression" placeholder="请输入条件表达式" @input="onDataChange" />
        </div>
      </div>
      
      <!-- 快速操作 -->
      <div class="quick-actions">
        <el-button type="primary" size="small" @click="generateExpression">生成表达式</el-button>
        <el-button type="danger" size="small" @click="clearCondition">清空条件</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Edge } from '@vue-flow/core'
import type { EdgeCondition } from './types'
import { ElMessage } from 'element-plus'

/**
 * 选中的连线
 */
const props = defineProps<{
  selectedEdge: Edge<EdgeCondition> | null
}>()

/**
 * 定义事件
 */
const emit = defineEmits<{
  /**
   * 更新连线条件
   * @param edgeId 连线ID
   * @param condition 更新后的条件
   */
  'update': [edgeId: string, condition: EdgeCondition]
  /**
   * 关闭条件面板
   */
  'close': []
}>()

/**
 * 本地条件数据，用于表单编辑
 */
const localCondition = ref<EdgeCondition>({
  expression: '',
  description: '',
  type: 'normal',
  operator: '==',
  value: '',
  field: ''
})

/**
 * 监听选中连线变化，更新本地条件数据
 */
watch(
  () => props.selectedEdge,
  (newEdge) => {
    if (newEdge?.data) {
      localCondition.value = { ...newEdge.data }
    } else {
      // 如果连线没有条件数据，初始化一个默认的
      localCondition.value = {
        expression: '',
        description: '',
        type: 'normal',
        operator: '==',
        value: '',
        field: ''
      }
    }
  },
  { immediate: true, deep: true }
)

/**
 * 当本地条件数据变化时，通知父组件更新连线条件
 */
const onDataChange = () => {
  if (props.selectedEdge) {
    emit('update', props.selectedEdge.id, localCondition.value)
  }
}

/**
 * 生成条件表达式
 * 根据字段、操作符和值自动生成条件表达式
 */
const generateExpression = () => {
  const { field, operator, value } = localCondition.value
  
  if (!field || !operator) {
    ElMessage.warning('请先填写字段和操作符')
    return
  }
  
  let expression = ''
  
  // 根据不同的操作符生成对应的表达式
  switch (operator) {
    case '==':
      expression = `${field} == '${value}'`
      break
    case '!=':
      expression = `${field} != '${value}'`
      break
    case '>':
      expression = `${field} > ${value}`
      break
    case '>=':
      expression = `${field} >= ${value}`
      break
    case '<':
      expression = `${field} < ${value}`
      break
    case '<=':
      expression = `${field} <= ${value}`
      break
    case 'includes':
      expression = `${field}.includes('${value}')`
      break
    case '!includes':
      expression = `!${field}.includes('${value}')`
      break
    default:
      expression = ''
  }
  
  localCondition.value.expression = expression
  onDataChange()
  ElMessage.success('表达式生成成功')
}

/**
 * 清空条件
 */
const clearCondition = () => {
  localCondition.value = {
    expression: '',
    description: '',
    type: 'normal',
    operator: '==',
    value: '',
    field: ''
  }
  onDataChange()
  ElMessage.success('条件已清空')
}
</script>

<style scoped>
.edge-condition-panel {
  width: 300px;
  height: 100%;
  background-color: #fff;
  border-left: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
}

.panel-header {
  padding: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-header h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.info-section {
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}

.info-item {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.info-item label {
  font-weight: bold;
  width: 60px;
  margin-right: 8px;
}

.info-item span {
  color: #666;
}

.form-section {
  margin-bottom: 20px;
}

.property-item {
  margin-bottom: 16px;
}

.property-item label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

.quick-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
</style>