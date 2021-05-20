import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/editor',
    name: 'Editor',
    component: () => import('@/views/Editor.vue')
  },
  {
    path: '/wall/:id',
    name: 'Wall',
    component: () => import('@/views/Wall.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
