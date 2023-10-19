import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from "@/components/HelloWorld.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HelloWorld
  },
  {
    path: '/doi',
    name: 'doi',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './components/DoiSearch.vue')
  },
  {
    path: '/table',
    name: 'tablePagination',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './components/TablePagination.vue')
  },
    { path: '/:pathMatch(.*)*', name: 'error', component: Error },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
