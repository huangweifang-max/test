import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Daohang from '../views/Daohang.vue'
import Ym from '../views/second.vue'
import bak from '../views/bak.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'daohang',
    component: Daohang
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/echars',
    name: 'ymian',
    component: Ym
  },
  {
    path: '/bak',
    name: 'bak',
    component: bak
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
