import { createRouter, createWebHistory } from 'vue-router'
import {
  TestExcel,
  TestExcel2,
  Website,
  JsonEditor,
  ApprovalWorkflow,
} from '@/components/testDemo/index.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      path: '/4',
      component: ApprovalWorkflow,
    },
  ],
})

export default router
