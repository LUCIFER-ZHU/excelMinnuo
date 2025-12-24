import { createRouter, createWebHistory } from 'vue-router'
import {
  TestExcel,
  TestExcel2,
  Website,
  JsonEditor,
  DragDropApprovalWorkflow
} from '../components/testDemo/index'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      component: TestExcel,
    },
    {
      path: '/1',
      component: TestExcel2,
    },
    {
      path: '/2',
      component: Website,
    },
    {
      path: '/3',
      component: JsonEditor,
    },
    {
      path: '/5',
      component: DragDropApprovalWorkflow,
    },
  ],
})

export default router
