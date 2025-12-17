<template>
  <div class="custom-node" :class="getNodeClass">
    <div class="node-header">
      <i :class="getIconClass"></i>
      <span class="node-label">{{ data.label }}</span>
      <button class="delete-btn" @click="onDelete">
        <i class="el-icon-close"></i>
      </button>
    </div>
    <div class="node-content" v-if="data.assignee || data.description">
      <div v-if="data.assignee" class="node-assignee">
        <i class="el-icon-user"></i>
        <span>{{ data.assignee }}</span>
      </div>
      <div v-if="data.description" class="node-description">
        {{ data.description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { NodeProps } from '@vue-flow/core'

// 定义节点数据结构
interface CustomNodeData {
  label: string
  assignee?: string
  description?: string
  type: string
}

// 定义组件属性
interface Props extends NodeProps<CustomNodeData> { }

const props = defineProps<Props>()

// 定义事件
const emit = defineEmits<{
  'delete-node': [id: string]
  'update-node': [data: CustomNodeData]
}>()

/**
 * 获取节点类型对应的CSS类
 */
const getNodeClass = computed(() => {
  return `node-${props.data.type}`
})

/**
 * 获取节点类型对应的图标
 */
const getIconClass = computed(() => {
  switch (props.data.type) {
    case 'start':
      return 'el-icon-video-play'
    case 'task':
      return 'el-icon-tickets'
    case 'approval':
      return 'el-icon-circle-check'
    case 'end':
      return 'el-icon-circle-close'
    default:
      return 'el-icon-tickets'
  }
})

/**
 * 删除节点
 */
const onDelete = () => {
  emit('delete-node', props.id)
}
</script>

<style scoped>
.custom-node {
  width: 180px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: all 0.2s;
}

.custom-node:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.node-header {
  padding: 12px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  position: relative;
}

.node-start {
  border-color: #52c41a;
  border-left: 4px solid #52c41a;
}

.node-task {
  border-color: #1890ff;
  border-left: 4px solid #1890ff;
}

.node-approval {
  border-color: #faad14;
  border-left: 4px solid #faad14;
}

.node-end {
  border-color: #f5222d;
  border-left: 4px solid #f5222d;
}

.node-label {
  margin-left: 8px;
  font-weight: 600;
  color: #333;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.delete-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
}

.delete-btn:hover {
  background: #f5f5f5;
  color: #ff4d4f;
}

.node-content {
  padding: 12px;
  font-size: 13px;
  color: #666;
}

.node-assignee {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.node-assignee i {
  margin-right: 4px;
  color: #1890ff;
}

.node-description {
  font-size: 12px;
  line-height: 1.4;
  color: #888;
}
</style>
