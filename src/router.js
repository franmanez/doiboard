import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import PrefixReferencedDois from "@/views/PrefixReferencedDois.vue";
import PrefixReferencedOrcids from "@/views/PrefixReferencedOrcids.vue";
import MembersList from "@/views/MembersList.vue";
import PrefixDois from "@/views/PrefixDois.vue";
import ChatGPT from "@/views/ChatGPT.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/doi',
    name: 'doi',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/DoiView.vue')
  },
  {
    path: '/prefix/info',
    name: 'prefixInfo',
    component: () => import(/* webpackChunkName: "about" */ './views/PrefixInfo.vue')
  },
  {
    path: '/prefix/dois',
    name: 'prefixDois',
    component: PrefixDois
  },
  {
    path: '/prefix/referenced/dois',
    name: 'prefixReferencedDois',
    component: PrefixReferencedDois
  },
  {
    path: '/prefix/referenced/orcids',
    name: 'prefixReferencedOrcids',
    component: PrefixReferencedOrcids
  },
  {
    path: '/members',
    name: 'members',
    component: MembersList
  },
  {
    path: '/table',
    name: 'tablePagination',
    component: () => import(/* webpackChunkName: "about" */ './samples/SamplePage.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "about" */ './samples/ParentComponent.vue')
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatGPT
  },

  { path: '/:pathMatch(.*)*', name: 'error', component: Error },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
