/**
 * 工作流数据管理类型定义
 * @description 定义工作流数据在 LocalStorage 中的存储结构
 */

/**
 * 工作流数据接口
 * @description 单个工作流的数据结构
 */
export interface WorkflowData {
  /** 唯一标识符 */
  id: string
  /** 流程图名称 */
  name: string
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
  /** 工作流配置数据（Vue Flow 的 toObject() 返回的数据） */
  config: any
}

/**
 * 工作流数据列表类型
 * @description 工作流数据数组类型
 */
export type WorkflowDataList = WorkflowData[]

/**
 * LocalStorage 存储键名常量
 */
export const WORKFLOW_STORAGE_KEY = 'workflowDataList' as const

/**
 * 表单状态枚举
 * @description 表单的两种状态：新增和编辑
 */
export enum FormState {
  /** 新增状态 */
  ADD = 'add',
  /** 编辑状态 */
  EDIT = 'edit'
}

/**
 * 表单数据接口
 * @description 新增/编辑工作流时的表单数据结构
 */
export interface WorkflowFormData {
  /** 流程图名称 */
  name: string
  /** 工作流配置（可选，编辑时需要） */
  config?: any
}
