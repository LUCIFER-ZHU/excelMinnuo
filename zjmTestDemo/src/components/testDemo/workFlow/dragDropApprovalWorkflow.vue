<template>
  <div class="workflow-container">
    <div class="workflow-header">
      <h2>审批工作流设计器</h2>
      <div class="header-buttons">
        <el-button type="primary" @click="saveToLocalStorage">保存</el-button>
        <el-button @click="loadFromLocalStorage">还原</el-button>
      </div>
    </div>
    <div class="workflow-content">
      <!-- 侧边栏 - 可拖拽节点 -->
      <Sidebar :node-types="nodeTypes" @dragstart="onDragStart" />

      <!-- 工作流画布 -->
      <div class="canvas">
        <VueFlow :nodes="nodes" :edges="edges" :fit-view-on-init="true" :default-viewport="{ zoom: 0.5 }"
          @node-drag-stop="onNodeDragStop" @dragover="onDragOver" @drop="onDrop" @connect="onConnect"
          @node-click="onNodeClick" @edge-click="onEdgeClick" @selection-change="onSelectionChange">
          <!-- 自定义节点模板 -->
          <template #node-custom="props">
            <CustomNode v-bind="props" @delete-node="deleteNode(props.id)"
              @update-node="updateNode(props.id, $event)" />
          </template>

          <!-- 控制面板 -->
          <Controls />
          <!-- 缩略图 -->
          <MiniMap pannable zoomable />
        </VueFlow>
      </div>

      <!-- 属性面板 -->
      <PropertiesPanel :selected-node="selectedNode" @update="onPropertiesUpdate" v-if="!selectedEdge" />
      
      <!-- 连线条件面板 -->
      <EdgeConditionPanel :selected-edge="selectedEdge" @update="onEdgeConditionUpdate" @close="onEdgeConditionClose" v-else />
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
  type NodeDragEvent,
  MarkerType
} from '@vue-flow/core'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import CustomNode from './CustomNode.vue'
import Sidebar from './Sidebar.vue'
import PropertiesPanel from './PropertiesPanel.vue'
import EdgeConditionPanel from './EdgeConditionPanel.vue'
import { ElMessage } from 'element-plus'
import type { NodeType, CustomNodeData, EdgeCondition } from './types'
import type { Edge, EdgeMouseEvent } from '@vue-flow/core'

import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import '@vue-flow/minimap/dist/style.css'
import '@vue-flow/controls/dist/style.css'



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
  removeNodes,
  screenToFlowCoordinate,
  toObject,
  fromObject
} = useVueFlow()

// 选中的节点
const selectedNode = ref<Node<CustomNodeData> | null>(null)

// 选中的连线
const selectedEdge = ref<Edge<EdgeCondition> | null>(null)

// localStorage存储键名
const storageKey = 'workflow-data'

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
    { 
      id: 'e1-2', 
      source: 'start-node', 
      target: 'task-node', 
      animated: true,
      style: { strokeDasharray: '0' }, // 设置实线样式
      markerEnd: { // 添加实心箭头标记
        type: MarkerType.ArrowClosed, // 使用 MarkerType 枚举设置实心箭头类型
        color: '#555' // 箭头颜色
      },
      data: { expression: '', description: '', type: 'normal' } as EdgeCondition,
      label: ''
    },
    { 
      id: 'e2-3', 
      source: 'task-node', 
      target: 'approval-node', 
      animated: true,
      style: { strokeDasharray: '0' }, // 设置实线样式
      markerEnd: { // 添加实心箭头标记
        type: MarkerType.ArrowClosed, // 使用 MarkerType 枚举设置实心箭头类型
        color: '#555' // 箭头颜色
      },
      data: { expression: '', description: '', type: 'normal' } as EdgeCondition,
      label: ''
    },
    { 
      id: 'e3-4', 
      source: 'approval-node', 
      target: 'end-node', 
      animated: true,
      style: { strokeDasharray: '0' }, // 设置实线样式
      markerEnd: { // 添加实心箭头标记
        type: MarkerType.ArrowClosed, // 使用 MarkerType 枚举设置实心箭头类型
        color: '#555' // 箭头颜色
      },
      data: { expression: '', description: '', type: 'normal' } as EdgeCondition,
      label: ''
    }
  ])
})

/**
 * 拖拽开始事件处理
 * @param event 拖拽事件
 * @param nodeType 节点类型
 */
const onDragStart = (event: DragEvent, nodeType: NodeType) => {
  console.log('拖拽开始:', nodeType.label, '(类型:', nodeType.type, ')')
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
  console.log('拖拽经过画布区域')
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
  console.log('拖拽放置:', nodeType.label, '(类型:', nodeType.type, ')')

  // 使用Vue Flow提供的screenToFlowCoordinate方法将屏幕坐标转换为流坐标
  // 该方法会自动考虑当前的缩放和平移状态
  const position = screenToFlowCoordinate({
    x: event.clientX,
    y: event.clientY
  })

  // 调整节点位置，使节点中心对准鼠标位置
  // 节点宽度为180px（来自CustomNode.vue的样式定义）
  // 节点高度约为50px（根据节点内容估算，留出足够的垂直空间）
  const adjustedPosition = {
    x: position.x - 90, // 减去节点宽度的一半
    y: position.y - 25  // 减去节点高度的一半
  }

  console.log('屏幕坐标转换为流坐标:', position)
  console.log('调整后的节点位置:', adjustedPosition)

  // 创建新节点
  const newNode: Node<CustomNodeData> = {
    id: `${nodeType.type}-${Date.now()}`,
    type: 'custom',
    position: adjustedPosition,
    data: {
      ...nodeType.data,
      type: nodeType.type
    }
  }

  console.log('创建新节点:', newNode.id, '最终位置:', newNode.position)
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
  console.log('创建连接:', params.source, '→', params.target)
  const newEdge = {
    ...params,
    id: `edge-${params.source}-${params.target}-${Date.now()}`,
    animated: true,
    style: { strokeDasharray: '0' }, // 设置实线样式
    markerEnd: { // 添加实心箭头标记
      type: MarkerType.ArrowClosed, // 使用 MarkerType 枚举设置实心箭头类型
      color: '#555' // 箭头颜色
    },
    data: { expression: '', description: '', type: 'normal' } as EdgeCondition,
    label: ''
  }

  addEdges(newEdge)
  console.log('新连接ID:', newEdge.id)
  ElMessage.success('已创建连接')
}

/**
 * 节点点击事件处理
 * @param event 节点点击事件
 */
const onNodeClick = (event: NodeMouseEvent) => {
  console.log('节点点击:', event.node.id, '数据:', event.node.data)
  selectedNode.value = findNode(event.node.id) as Node<CustomNodeData>
  selectedEdge.value = null // 清除连线选择
  console.log('选中节点:', selectedNode.value?.id)
}

/**
 * 连线点击事件处理
 * @param event 连线点击事件
 */
const onEdgeClick = (event: EdgeMouseEvent) => {
  console.log('连线点击:', event.edge.id, '数据:', event.edge.data)
  selectedEdge.value = event.edge as Edge<EdgeCondition>
  selectedNode.value = null // 清除节点选择
  console.log('选中连线:', selectedEdge.value?.id)
}

/**
 * 选择变化事件处理
 * @param event 选择变化事件
 */
const onSelectionChange = (event: { nodes: Node<CustomNodeData>[], edges: Edge<EdgeCondition>[] }) => {
  console.log('选择变化:', event.nodes.length, '个节点被选中', event.edges.length, '条连线被选中')
  
  // 如果有节点被选中，优先显示节点属性面板
  if (event.nodes.length > 0) {
    selectedNode.value = event.nodes[0]
    selectedEdge.value = null
    console.log('选中第一个节点:', selectedNode.value.id)
  } 
  // 如果没有节点被选中，但有连线被选中，显示连线条件面板
  else if (event.edges.length > 0) {
    selectedEdge.value = event.edges[0]
    selectedNode.value = null
    console.log('选中第一条连线:', selectedEdge.value.id)
  } 
  // 取消所有选择
  else {
    selectedNode.value = null
    selectedEdge.value = null
    console.log('取消选择所有节点和连线')
  }
}

/**
 * 删除节点
 * @param id 节点ID
 */
const deleteNode = (id: string) => {
  console.log('删除节点:', id)
  removeNodes([id])

  if (selectedNode.value && selectedNode.value.id === id) {
    selectedNode.value = null
    console.log('取消选中已删除的节点')
  }

  ElMessage.warning('已删除节点')
}

/**
 * 更新节点数据
 * @param id 节点ID
 * @param data 更新后的节点数据
 */
const updateNode = (id: string, data: CustomNodeData) => {
  console.log('更新节点数据:', id, '新数据:', data)
  const node = findNode(id) as Node<CustomNodeData>
  if (node) {
    node.data = { ...node.data, ...data }
    console.log('节点数据更新完成:', node.id, '当前数据:', node.data)

    if (selectedNode.value && selectedNode.value.id === id) {
      selectedNode.value = node
      console.log('更新选中节点数据')
    }
  }
}

/**
 * 处理属性面板的更新事件
 * @param nodeId 节点ID
 * @param data 更新后的节点数据
 */
const onPropertiesUpdate = (nodeId: string, data: CustomNodeData) => {
  console.log('属性面板更新节点数据:', nodeId, '新数据:', data)
  updateNode(nodeId, data)
}

/**
 * 处理连线条件面板的更新事件
 * @param edgeId 连线ID
 * @param condition 更新后的连线条件
 */
const onEdgeConditionUpdate = (edgeId: string, condition: EdgeCondition) => {
  console.log('连线条件面板更新连线条件:', edgeId, '新条件:', condition)
  updateEdgeCondition(edgeId, condition)
}

/**
 * 关闭连线条件面板
 */
const onEdgeConditionClose = () => {
  selectedEdge.value = null
  console.log('关闭连线条件面板')
}

/**
 * 更新连线条件
 * @param id 连线ID
 * @param condition 更新后的连线条件
 */
const updateEdgeCondition = (id: string, condition: EdgeCondition) => {
  console.log('更新连线条件:', id, '新条件:', condition)
  const edge = edges.value.find(edge => edge.id === id) as Edge<EdgeCondition>
  if (edge) {
    edge.data = { ...edge.data, ...condition }
    edge.label = condition.expression
    console.log('连线条件更新完成:', edge.id, '当前条件:', edge.data)
    
    if (selectedEdge.value && selectedEdge.value.id === id) {
      selectedEdge.value = edge
      console.log('更新选中连线条件')
    }
  }
}

/**
 * 保存工作流数据到localStorage
 */
const saveToLocalStorage = () => {
  try {
    // 使用Vue Flow的toObject方法获取完整的工作流数据
    const workflowData = toObject()

    console.log('准备保存工作流数据:', workflowData)

    // 保存到localStorage
    localStorage.setItem(storageKey, JSON.stringify(workflowData))

    console.log('工作流数据保存成功')
    ElMessage.success('工作流数据已成功保存到本地')
  } catch (error) {
    console.error('工作流数据保存失败:', error)
    ElMessage.error('工作流数据保存失败')
  }
}

/**
 * 从localStorage加载工作流数据
 */
const loadFromLocalStorage = () => {
  try {
    // 从localStorage获取数据
    const savedData = localStorage.getItem(storageKey)

    if (!savedData) {
      ElMessage.info('没有找到保存的工作流数据')
      return
    }

    const workflowData = JSON.parse(savedData)
    console.log('加载到的工作流数据:', workflowData)

    // 使用Vue Flow的fromObject方法恢复完整的工作流数据
    fromObject(workflowData)

    console.log('工作流数据加载成功')
    ElMessage.success('工作流数据已成功从本地加载')
  } catch (error) {
    console.error('工作流数据加载失败:', error)
    ElMessage.error('工作流数据加载失败')
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-buttons {
  display: flex;
  gap: 10px;
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

.canvas {
  flex: 1;
  height: 100%;
  position: relative;
}

.canvas :deep(.vue-flow__container) {
  width: 100%;
  height: 100%;
}

/* 自定义连线标签样式 */
.canvas :deep(.edge-label) {
  font-size: 12px;
  font-weight: 500;
  fill: #666;
  background-color: #fff;
  padding: 2px 6px;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  pointer-events: all;
  user-select: none;
}

/* 确保连线在标签下方 */
.canvas :deep(.edge-path) {
  position: relative;
}

/* 调整箭头标记的显示 */
.canvas :deep(.vue-flow__edge-path) {
  stroke: #b1b1b7;
  stroke-width: 1.5px;
  fill: none;
}

/* 选中时的样式 */
.canvas :deep(.vue-flow__edge.selected .edge-path path) {
  stroke: #555;
  stroke-width: 2px;
}
</style>
