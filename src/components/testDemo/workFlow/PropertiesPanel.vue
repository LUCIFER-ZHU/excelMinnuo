<template>
  <div class="properties-panel" v-if="selectedNode">
    <h3>节点属性</h3>
    <div class="property-item">
      <label>节点名称:</label>
      <input v-model="localNodeData.label" @input="onDataChange" />
    </div>
    <div class="property-item"
      v-if="localNodeData.type && localNodeData.type !== 'start' && localNodeData.type !== 'end'">
      <label>处理人:</label>
      <input v-model="localNodeData.assignee" @input="onDataChange" />
    </div>
    <div class="property-item">
      <label>描述:</label>
      <textarea v-model="localNodeData.description" @input="onDataChange"></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Node } from '@vue-flow/core'
import type { CustomNodeData } from './types'

// 定义组件的 props
interface Props {
  selectedNode: Node<CustomNodeData> | null
}

const props = defineProps<Props>()

// 定义组件的事件
const emit = defineEmits<{
  update: [nodeId: string, data: CustomNodeData]
}>()

// 本地节点数据副本，避免直接修改 props
const localNodeData = ref<CustomNodeData>({
  label: '',
  type: '',
  assignee: '',
  description: ''
})

// 监听选中节点的变化，更新本地数据
watch(() => props.selectedNode, (newNode) => {
  if (newNode && newNode.data) {
    localNodeData.value = { ...newNode.data }
  }
}, { immediate: true })

/**
 * 节点数据变化时的处理函数
 */
const onDataChange = () => {
  if (props.selectedNode && localNodeData.value.label && localNodeData.value.type) {
    console.log('更新节点属性面板数据:', props.selectedNode.id, '新属性:', {
      label: localNodeData.value.label,
      assignee: localNodeData.value.assignee,
      description: localNodeData.value.description
    })
    
    emit('update', props.selectedNode.id, localNodeData.value)
  }
}
</script>

<style scoped>
.properties-panel {
  width: 250px;
  background-color: #f9f9f9;
  border-left: 1px solid #ddd;
  padding: 16px;
  overflow-y: auto;
}

.properties-panel h3 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #333;
}

.property-item {
  margin-bottom: 16px;
}

.property-item label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
  color: #555;
}

.property-item input,
.property-item textarea {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.property-item textarea {
  height: 80px;
  resize: vertical;
}
</style>