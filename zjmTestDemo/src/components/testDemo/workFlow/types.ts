// 定义节点类型接口
export interface NodeType {
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
export interface CustomNodeData {
  label: string
  assignee?: string
  description?: string
  type: string
}

// 定义连线条件接口
export interface EdgeCondition {
  /** 条件表达式，用于工作流引擎评估 */
  expression: string;
  /** 条件描述，用于显示给用户 */
  description: string;
  /** 条件类型，如普通条件、分支条件等 */
  type: string;
  /** 操作符，如等于、大于、小于等 */
  operator?: string;
  /** 比较值 */
  value?: any;
  /** 字段名称 */
  field?: string;
}