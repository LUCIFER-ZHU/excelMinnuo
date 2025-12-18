<template>
  <div class="workflow-container">
    <div class="workflow-header">
      <h2>审批工作流设计器</h2>
    </div>
    <div class="workflow-content">
      <!-- 侧边栏 - 可拖拽节点 -->
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

      <!-- 工作流画布 -->
      <div class="canvas">
        <VueFlow :nodes="nodes" :edges="edges" :fit-view-on-init="true" :default-viewport="{ zoom: 1.5 }"
          @node-drag-stop="onNodeDragStop" @dragover="onDragOver" @drop="onDrop" @connect="onConnect"
          @node-click="onNodeClick" @selection-change="onSelectionChange">
          <!-- 自定义节点模板 -->
          <template #node-custom="props">
            <CustomNode v-bind="props" @delete-node="deleteNode(props.id)"
              @update-node="updateNode(props.id, $event)" />
          </template>

          <!-- 控制面板 -->
          <Controls />
          <!-- 缩略图 -->
          <MiniMap />
        </VueFlow>
      </div>

      <!-- 属性面板 -->
      <div class="properties-panel" v-if="selectedNode && selectedNode.data">
        <h3>节点属性</h3>
        <div class="property-item">
          <label>节点名称:</label>
          <input v-model="selectedNode.data.label" @input="updateNodeData" />
        </div>
        <div class="property-item"
          v-if="selectedNode.data.type && selectedNode.data.type !== 'start' && selectedNode.data.type !== 'end'">
          <label>处理人:</label>
          <input v-model="selectedNode.data.assignee" @input="updateNodeData" />
        </div>
        <div class="property-item">
          <label>描述:</label>
          <textarea v-model="selectedNode.data.description" @input="updateNodeData"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  VueFlow,
  useVueFlow,
  type Node,
  type Connection,
  type NodeMouseEvent,
  type NodeDragEvent
} from '@vue-flow/core'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import CustomNode from './CustomNode.vue'
import { ElMessage, ElIcon } from 'element-plus'
import { VideoPlay, Document, CircleCheck, CircleClose } from '@element-plus/icons-vue'

import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import '@vue-flow/minimap/dist/style.css'
import '@vue-flow/controls/dist/style.css'

// 定义节点类型接口
interface NodeType {
  type: string
  label: string
  icon: string
  data: {
    label: string
    assignee?: string
    description?: string
    type: string
  }
}

// 定义节点数据接口
interface CustomNodeData {
  label: string
  assignee?: string
  description?: string
  type: string
}

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

// 节点类型列表
const nodeTypes = ref<NodeType[]>([
  {
    type: 'start',
    label: '开始节点',
    icon: 'VideoPlay',
    data: {
      label: '开始',
      description: '流程开始节点',
      type: 'start'
    }
  },
  {
    type: 'task',
    label: '任务节点',
    icon: 'Document',
    data: {
      label: '任务',
      assignee: '处理人',
      description: '普通任务节点',
      type: 'task'
    }
  },
  {
    type: 'approval',
    label: '审批节点',
    icon: 'CircleCheck',
    data: {
      label: '审批',
      assignee: '审批人',
      description: '需要审批的节点',
      type: 'approval'
    }
  },
  {
    type: 'end',
    label: '结束节点',
    icon: 'CircleClose',
    data: {
      label: '结束',
      description: '流程结束节点',
      type: 'end'
    }
  }
])

// 使用VueFlow组合式API
const {
  nodes,
  edges,
  addNodes,
  addEdges,
  findNode,
  removeNodes
} = useVueFlow()

// 选中的节点
const selectedNode = ref<Node<CustomNodeData> | null>(null)

// 初始化节点
onMounted(() => {
  // 添加初始节点
  const startNode: Node<CustomNodeData> = {
    id: 'start-node',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: {
      label: '开始',
      type: 'start',
      description: '流程开始节点'
    }
  }

  const taskNode: Node<CustomNodeData> = {
    id: 'task-node',
    type: 'custom',
    position: { x: 200, y: 0 },
    data: {
      label: '提交申请',
      type: 'task',
      assignee: '申请人',
      description: '提交审批申请'
    }
  }

  const approvalNode: Node<CustomNodeData> = {
    id: 'approval-node',
    type: 'custom',
    position: { x: 400, y: 0 },
    data: {
      label: '部门审批',
      type: 'approval',
      assignee: '部门经理',
      description: '部门经理审批'
    }
  }

  const endNode: Node<CustomNodeData> = {
    id: 'end-node',
    type: 'custom',
    position: { x: 600, y: 0 },
    data: {
      label: '结束',
      type: 'end',
      description: '流程结束'
    }
  }

  addNodes([startNode, taskNode, approvalNode, endNode])

  // 添加边
  addEdges([
    { id: 'e1-2', source: 'start-node', target: 'task-node', animated: true },
    { id: 'e2-3', source: 'task-node', target: 'approval-node', animated: true },
    { id: 'e3-4', source: 'approval-node', target: 'end-node', animated: true }
  ])
})

/**
 * 拖拽开始事件处理
 * @param event 拖拽事件
 * @param nodeType 节点类型
 */
const onDragStart = (event: DragEvent, nodeType: NodeType) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', JSON.stringify(nodeType))
    event.dataTransfer.effectAllowed = 'copy'
  }
}

/**
 * 拖拽经过事件处理
 * @param event 拖拽事件
 */
const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'copy'
  }
}

/**
 * 拖拽放置事件处理
 * @param event 拖拽事件
 */
const onDrop = (event: DragEvent) => {
  event.preventDefault()

  const type = event.dataTransfer?.getData('application/vueflow')
  if (!type) return

  const nodeType: NodeType = JSON.parse(type)

  if (!event.currentTarget) return

  const reactFlowBounds = (event.currentTarget as HTMLElement).getBoundingClientRect()

  // 创建新节点
  const newNode: Node<CustomNodeData> = {
    id: `${nodeType.type}-${Date.now()}`,
    type: 'custom',
    position: {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top
    },
    data: {
      ...nodeType.data,
      type: nodeType.type
    }
  }

  addNodes([newNode])

  ElMessage.success(`已添加${nodeType.label}`)
}

/**
 * 节点拖拽停止事件处理
 * @param event 节点拖拽事件
 */
const onNodeDragStop = (event: NodeDragEvent) => {
  console.log('节点拖拽停止:', event.node.id, '新位置:', event.node.position)
}

/**
 * 连接事件处理
 * @param params 连接参数
 */
const onConnect = (params: Connection) => {
  const newEdge = {
    ...params,
    id: `edge-${params.source}-${params.target}-${Date.now()}`,
    animated: true
  }

  addEdges(newEdge)

  ElMessage.success('已创建连接')
}

/**
 * 节点点击事件处理
 * @param event 节点点击事件
 */
const onNodeClick = (event: NodeMouseEvent) => {
  selectedNode.value = findNode(event.node.id) as Node<CustomNodeData>
}

/**
 * 选择变化事件处理
 * @param event 选择变化事件
 */
const onSelectionChange = (event: { nodes: Node<CustomNodeData>[] }) => {
  if (event.nodes.length > 0) {
    selectedNode.value = event.nodes[0]
  } else {
    selectedNode.value = null
  }
}

/**
 * 删除节点
 * @param id 节点ID
 */
const deleteNode = (id: string) => {
  removeNodes([id])

  if (selectedNode.value && selectedNode.value.id === id) {
    selectedNode.value = null
  }

  ElMessage.warning('已删除节点')
}

/**
 * 更新节点数据
 * @param id 节点ID
 * @param data 更新后的节点数据
 */
const updateNode = (id: string, data: CustomNodeData) => {
  const node = findNode(id) as Node<CustomNodeData>
  if (node) {
    node.data = { ...node.data, ...data }

    if (selectedNode.value && selectedNode.value.id === id) {
      selectedNode.value = node
    }
  }
}

/**
 * 更新节点属性面板数据
 */
const updateNodeData = () => {
  if (selectedNode.value && selectedNode.value.data) {
    const node = findNode(selectedNode.value.id) as Node<CustomNodeData>
    if (node && selectedNode.value.data.label && selectedNode.value.data.type) {
      node.data = {
        label: selectedNode.value.data.label,
        type: selectedNode.value.data.type,
        assignee: selectedNode.value.data.assignee,
        description: selectedNode.value.data.description
      }
    }
  }
}
</script>

<style scoped>
.workflow-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.workflow-header {
  padding: 16px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.workflow-header h2 {
  margin: 0;
  color: #333;
}

.workflow-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

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

.node-start {
  color: #52c41a;
  border-left: 4px solid #52c41a;
}

.node-task {
  color: #1890ff;
  border-left: 4px solid #1890ff;
}

.node-approval {
  color: #faad14;
  border-left: 4px solid #faad14;
}

.node-end {
  color: #f5222d;
  border-left: 4px solid #f5222d;
}

.canvas {
  flex: 1;
  height: 100%;
  position: relative;
}

.canvas :deep(.vue-flow__container) {
  width: 100%;
  height: 100%;
}

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
