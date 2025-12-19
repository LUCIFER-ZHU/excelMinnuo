<template>
  <div class="sidebar">
    <h3>节点类型</h3>
    <div v-for="nodeType in nodeTypes" :key="nodeType.type" class="draggable-node" :class="`node-${nodeType.type}`"
      :draggable="true" @dragstart="onDragStart($event, nodeType)">
      <el-icon :size="16" class="node-icon">
        <component :is="getIconComponent(nodeType.icon)" />
      </el-icon>
      {{ nodeType.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { VideoPlay, Document, CircleCheck, CircleClose } from '@element-plus/icons-vue'
import type { NodeType } from './types'

// 定义组件的 props
interface Props {
  nodeTypes: NodeType[]
}

const { nodeTypes } = defineProps<Props>()

// 定义组件的事件
const emit = defineEmits<{
  dragstart: [event: DragEvent, nodeType: NodeType]
}>()

/**
 * 根据图标名称获取对应的图标组件
 * @param iconName 图标名称
 * @returns 图标组件
 */
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'VideoPlay':
      return VideoPlay
    case 'Document':
      return Document
    case 'CircleCheck':
      return CircleCheck
    case 'CircleClose':
      return CircleClose
    default:
      return Document
  }
}

/**
 * 拖拽开始事件处理
 * @param event 拖拽事件
 * @param nodeType 节点类型
 */
const onDragStart = (event: DragEvent, nodeType: NodeType) => {
  console.log('拖拽开始:', nodeType.label, '(类型:', nodeType.type, ')')
  emit('dragstart', event, nodeType)
}
</script>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #f9f9f9;
  border-right: 1px solid #ddd;
  padding: 16px;
  overflow-y: auto;
}

.sidebar h3 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #333;
}

.draggable-node {
  padding: 10px;
  margin-bottom: 10px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: grab;
  display: flex;
  align-items: center;
  transition: all 0.2s;
}

.draggable-node:hover {
  background-color: #e6f7ff;
  border-color: #1890ff;
}

.draggable-node:active {
  cursor: grabbing;
}

.node-icon {
  margin-right: 8px;
}
</style>