/**
 * 工作流数据存储工具函数
 * @description 提供工作流数据的 LocalStorage 读写操作
 */

import type { WorkflowData, WorkflowDataList } from '@/types/workflow'
import { WORKFLOW_STORAGE_KEY } from '@/types/workflow'

/**
 * 从 LocalStorage 读取工作流数据列表
 * @returns 工作流数据列表，如果读取失败或没有数据则返回空数组
 */
export const getWorkflowList = (): WorkflowDataList => {
  try {
    const data = localStorage.getItem(WORKFLOW_STORAGE_KEY)
    if (!data) {
      console.log('LocalStorage 中没有工作流数据')
      return []
    }
    const workflowList: WorkflowDataList = JSON.parse(data)
    console.log('成功读取工作流数据列表:', workflowList)
    return workflowList
  } catch (error) {
    console.error('读取工作流数据失败:', error)
    return []
  }
}

/**
 * 保存工作流数据列表到 LocalStorage
 * @param workflowList 要保存的工作流数据列表
 * @returns 保存是否成功
 */
export const saveWorkflowList = (workflowList: WorkflowDataList): boolean => {
  try {
    const data = JSON.stringify(workflowList)
    localStorage.setItem(WORKFLOW_STORAGE_KEY, data)
    console.log('成功保存工作流数据列表:', workflowList)
    return true
  } catch (error) {
    console.error('保存工作流数据失败:', error)
    return false
  }
}

/**
 * 添加新的工作流数据
 * @param workflow 要添加的工作流数据（不需要 id、createdAt、updatedAt）
 * @returns 添加成功的工作流数据（包含生成的 id 和时间戳），失败返回 null
 */
export const addWorkflow = (workflow: Omit<WorkflowData, 'id' | 'createdAt' | 'updatedAt'>): WorkflowData | null => {
  try {
    const workflowList = getWorkflowList()
    
    // 检查名称是否重复
    const isDuplicate = workflowList.some(item => item.name === workflow.name)
    if (isDuplicate) {
      console.warn('工作流名称已存在:', workflow.name)
      return null
    }
    
    // 生成唯一ID
    const id = `workflow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const now = new Date().toISOString()
    
    const newWorkflow: WorkflowData = {
      ...workflow,
      id,
      createdAt: now,
      updatedAt: now
    }
    
    workflowList.push(newWorkflow)
    const success = saveWorkflowList(workflowList)
    
    if (success) {
      console.log('成功添加工作流:', newWorkflow)
      return newWorkflow
    }
    return null
  } catch (error) {
    console.error('添加工作流失败:', error)
    return null
  }
}

/**
 * 更新工作流数据
 * @param id 要更新的工作流 ID
 * @param updates 更新的数据（不包含 id、createdAt）
 * @returns 更新是否成功
 */
export const updateWorkflow = (id: string, updates: Partial<Omit<WorkflowData, 'id' | 'createdAt'>>): boolean => {
  try {
    const workflowList = getWorkflowList()
    const index = workflowList.findIndex(item => item.id === id)
    
    if (index === -1) {
      console.warn('未找到要更新的工作流:', id)
      return false
    }
    
    // 如果更新了名称，检查新名称是否重复
    if (updates.name && updates.name !== workflowList[index].name) {
      const isDuplicate = workflowList.some(
        item => item.id !== id && item.name === updates.name
      )
      if (isDuplicate) {
        console.warn('工作流名称已存在:', updates.name)
        return false
      }
    }
    
    // 更新数据
    workflowList[index] = {
      ...workflowList[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    const success = saveWorkflowList(workflowList)
    
    if (success) {
      console.log('成功更新工作流:', id, workflowList[index])
      return true
    }
    return false
  } catch (error) {
    console.error('更新工作流失败:', error)
    return false
  }
}

/**
 * 删除工作流数据
 * @param id 要删除的工作流 ID
 * @returns 删除是否成功
 */
export const deleteWorkflow = (id: string): boolean => {
  try {
    const workflowList = getWorkflowList()
    const index = workflowList.findIndex(item => item.id === id)
    
    if (index === -1) {
      console.warn('未找到要删除的工作流:', id)
      return false
    }
    
    const deletedWorkflow = workflowList.splice(index, 1)[0]
    const success = saveWorkflowList(workflowList)
    
    if (success) {
      console.log('成功删除工作流:', deletedWorkflow)
      return true
    }
    return false
  } catch (error) {
    console.error('删除工作流失败:', error)
    return false
  }
}

/**
 * 根据 ID 查找工作流数据
 * @param id 工作流 ID
 * @returns 找到的工作流数据，未找到返回 null
 */
export const getWorkflowById = (id: string): WorkflowData | null => {
  try {
    const workflowList = getWorkflowList()
    const workflow = workflowList.find(item => item.id === id)
    return workflow || null
  } catch (error) {
    console.error('查找工作流失败:', error)
    return null
  }
}

/**
 * 检查工作流名称是否重复
 * @param name 要检查的名称
 * @param excludeId 排除的工作流 ID（用于编辑时检查）
 * @returns 名称是否重复
 */
export const isWorkflowNameDuplicate = (name: string, excludeId?: string): boolean => {
  try {
    const workflowList = getWorkflowList()
    return workflowList.some(item => item.name === name && item.id !== excludeId)
  } catch (error) {
    console.error('检查工作流名称重复失败:', error)
    return false
  }
}
