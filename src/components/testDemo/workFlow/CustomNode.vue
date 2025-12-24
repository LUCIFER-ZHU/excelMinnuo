<template>
  <div class="custom-node" :class="getNodeClass">
    <!-- 开始节点只有输出连接桩 -->
    <Handle v-if="data.type === 'start'" type="source" id="right" :position="Position.Right" />
    
    <!-- 任务节点和审批节点既有输入又有输出连接桩 -->
    <Handle v-if="data.type === 'task' || data.type === 'approval'" type="target" id="left" :position="Position.Left" />
    <Handle v-if="data.type === 'task' || data.type === 'approval'" type="source" id="right" :position="Position.Right" />
    
    <!-- 结束节点只有输入连接桩 -->
    <Handle v-else-if="data.type === 'end'" type="target" id="left" :position="Position.Left" />
    
    <div class="node-header">
      <el-icon :size="16" class="node-icon">
        <component :is="getIconComponent" />
      </el-icon>
      <span class="node-label">{{ data.label }}</span>
      <button class="delete-btn" @click="onDelete">
        <el-icon :size="14" class="delete-icon">
          <Close />
        </el-icon>
      </button>
    </div>
    <div class="node-content" v-if="data.assignee || data.description">
      <div v-if="data.assignee" class="node-assignee">
        <el-icon :size="14" class="assignee-icon">
          <User />
        </el-icon>
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
import { Handle, Position } from '@vue-flow/core'
import type { NodeProps } from '@vue-flow/core'
import { ElIcon } from 'element-plus'
import { VideoPlay, Document, CircleCheck, CircleClose, Close, User } from '@element-plus/icons-vue'

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
 * 获取节点类型对应的图标组件
 */
const getIconComponent = computed(() => {
  switch (props.data.type) {
    case 'start':
      return VideoPlay
    case 'task':
      return Document
    case 'approval':
      return CircleCheck
    case 'end':
      return CircleClose
    default:
      return Document
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
}

/* 节点类型特定的hover边框颜色 */
.custom-node.node-start:hover {
  border-color: #73d13d;
}

.custom-node.node-task:hover {
  border-color: #40a9ff;
}

.custom-node.node-approval:hover {
  border-color: #ffc53d;
}

.custom-node.node-end:hover {
  border-color: #ff4d4f;
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
  border-left: 3px solid #52c41a;
}

.node-task {
  border-color: #1890ff;
  border-left: 3px solid #1890ff;
}

.node-approval {
  border-color: #faad14;
  border-left: 3px solid #faad14;
}

.node-end {
  border-color: #f5222d;
  border-left: 3px solid #f5222d;
}

.node-icon {
  margin-right: 8px;
}

.node-label {
  margin-left: 0;
  font-weight: 600;
  color: #333;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.delete-icon {
  font-size: 14px;
}

.assignee-icon {
  margin-right: 4px;
  color: #1890ff;
  font-size: 14px;
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

/* Vue Flow Handle 样式 */
:deep(.vue-flow__handle) {
  width: 12px;
  height: 12px;
  background: #555;
  border: 2px solid white;
  border-radius: 50%;
}
</style>
