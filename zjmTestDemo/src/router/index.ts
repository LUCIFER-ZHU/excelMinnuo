import { createRouter, createWebHistory } from 'vue-router'
import { TestExcel } from '@/components/testDemo/index.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: TestExcel,
    },
  ],
})

export default router
